const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const YAML = require("yaml");

function step(workflow, job, id) {
  return YAML.parse(
    fs.readFileSync(`.github/workflows/${workflow}.yml`, "utf8"),
  ).jobs[job].steps.find((entry) => entry.id === id);
}
const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;
const verify = new AsyncFunction(
  "github",
  "context",
  "process",
  step("release", "verify", "verify").with.script,
);
const context = {
  repo: { owner: "example", repo: "app" },
  runId: 42,
  sha: "abc123",
  eventName: "workflow_dispatch",
};
const artifact = {
  name: "go-release-v1.2.3-42-1-unique",
  expired: false,
  workflow_run: { id: 42, head_sha: "abc123" },
};
function check(data = artifact, overrides = {}, event = context.eventName) {
  return verify(
    { rest: { actions: { getArtifact: async () => ({ data }) } } },
    { ...context, eventName: event },
    { env: { TAG: "v1.2.3", ARTIFACT_ID: "123", ...overrides } },
  );
}

test("release accepts this run's artifact, including a previous attempt", async () => {
  await check();
});

test("release rejects mismatched artifacts and untrusted publication contexts", async () => {
  for (const invalid of [
    { ...artifact, expired: true },
    { ...artifact, workflow_run: { id: 41, head_sha: context.sha } },
    { ...artifact, workflow_run: { id: context.runId, head_sha: "other" } },
    { ...artifact, name: "go-release-snapshot-42-1-unique" },
    { ...artifact, name: "go-release-v1.2.4-42-1-unique" },
  ])
    await assert.rejects(
      () => check(invalid),
      /Expected an available release artifact/,
    );
  for (const id of ["", "0", "1,2", "1e3", "9007199254740992"]) {
    await assert.rejects(
      () => check(artifact, { ARTIFACT_ID: id }),
      /positive integer/,
    );
  }
  await assert.rejects(
    () => check(artifact, { TAG: "../tag" }),
    /semantic version/,
  );
  await assert.rejects(
    () => check(artifact, {}, "pull_request_target"),
    /cannot publish/,
  );
});

function preparation(id, args) {
  return new AsyncFunction(
    ...args,
    step("prepare-package-release", "prepare", id).with.script,
  );
}

test("preparation allows trusted default-branch runs and manual tag retries", async () => {
  const event = preparation("event", ["context"]);
  const payload = { repository: { default_branch: "main" } };
  for (const [eventName, ref] of [
    ["workflow_dispatch", "refs/heads/main"],
    ["schedule", "refs/heads/main"],
    ["workflow_dispatch", "refs/tags/v1.2.3"],
  ])
    await event({ eventName, ref, payload });
  for (const [eventName, ref] of [
    ["pull_request", "refs/heads/main"],
    ["workflow_dispatch", "refs/heads/feature"],
    ["schedule", "refs/tags/v1.2.3"],
  ])
    await assert.rejects(
      () => event({ eventName, ref, payload }),
      /Release preparation requires/,
    );
});

test("preparation preserves the planned identity and recognizes tag recovery", async () => {
  const identity = preparation("identity", ["context", "process", "core"]);
  const run = async (ref, tag, changes) => {
    const outputs = {};
    await identity(
      { ref },
      { env: { TAG: tag, HAS_CHANGES: changes } },
      {
        setOutput: (key, value) => {
          outputs[key] = value;
        },
      },
    );
    return outputs;
  };
  assert.deepEqual(await run("refs/heads/main", "v1.2.3", "false"), {
    "has-changes": false,
    tag: "v1.2.3",
  });
  assert.deepEqual(await run("refs/heads/main", "v1.2.3-rc.1", "true"), {
    "has-changes": true,
    tag: "v1.2.3-rc.1",
  });
  assert.deepEqual(await run("refs/tags/v1.2.3", "", ""), {
    "has-changes": true,
    tag: "v1.2.3",
  });
  await assert.rejects(
    () => run("refs/tags/invalid", "", ""),
    /semantic versions/,
  );
});

test("preparation skips no-change and published releases without suppressing invalid verification", async () => {
  const result = preparation("result", ["process", "core"]);
  const run = async (changes, releases) => {
    const outputs = {};
    await result(
      {
        env: {
          HAS_CHANGES: changes,
          TAG: "v1.2.3",
          RELEASES: JSON.stringify(releases),
        },
      },
      {
        setOutput: (key, value) => {
          outputs[key] = value;
        },
        info() {},
      },
    );
    return outputs;
  };
  assert.deepEqual(await run("false", undefined), {
    status: "no-changes",
    tag: "",
  });
  assert.deepEqual(await run("true", [{ tag: "v1.2.3", published: false }]), {
    status: "ready",
    tag: "v1.2.3",
  });
  assert.deepEqual(await run("true", [{ tag: "v1.2.3", published: true }]), {
    status: "released",
    tag: "",
  });
  for (const invalid of [
    [],
    [{ tag: "v1.2.4", published: false }],
    [{ tag: "v1.2.3" }],
  ]) {
    await assert.rejects(
      () => run("true", invalid),
      /verified publication state/,
    );
  }
});
