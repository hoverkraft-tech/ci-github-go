const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync, execFileSync } = require("node:child_process");
const test = require("node:test");
const YAML = require("yaml");
const { createWorkspace } = require("./action-test-helpers.cjs");

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

test("packaging keeps existing tags intact and fails on a conflicting commit", (t) => {
  const directory = createWorkspace(t);
  const git = (...args) =>
    execFileSync("git", args, {
      cwd: directory,
      encoding: "utf8",
      env: { ...process.env, GIT_CONFIG_GLOBAL: "/dev/null" },
    }).trim();
  git("init", "--quiet");
  git(
    "-c",
    "user.name=Test",
    "-c",
    "user.email=test@example.com",
    "-c",
    "commit.gpgsign=false",
    "commit",
    "--allow-empty",
    "-m",
    "fixture",
  );
  const sha = git("rev-parse", "HEAD");
  const tag = (value, commit = sha) =>
    spawnSync(
      "bash",
      ["-euo", "pipefail", "-c", step("build-release", "build", "tag").run],
      {
        cwd: directory,
        encoding: "utf8",
        timeout: 10000,
        env: {
          ...process.env,
          GIT_CONFIG_GLOBAL: "/dev/null",
          RELEASE_TAG: value,
          GITHUB_SHA: commit,
        },
      },
    );
  assert.equal(tag("").status, 0);
  assert.equal(git("tag", "--list"), "");
  for (let attempt = 0; attempt < 2; attempt++)
    assert.equal(tag("v1.2.3").status, 0);
  assert.equal(git("rev-parse", "v1.2.3"), sha);
  assert.notEqual(tag("v1.2.3", "different").status, 0);
  assert.equal(git("rev-parse", "v1.2.3"), sha);
  assert.notEqual(tag("-invalid").status, 0);
});

test("artifact paths stay inside the project and names bind archives to tag and run", async () => {
  const configure = new AsyncFunction(
    "require",
    "core",
    "context",
    "process",
    step("build-release", "build", "artifact").with.script,
  );
  const outputs = {};
  const run = (files) =>
    configure(
      require,
      {
        setOutput: (key, value) => {
          outputs[key] = value;
        },
      },
      context,
      {
        env: {
          GITHUB_WORKSPACE: "/workspace",
          DIRECTORY: "project",
          PATHS: files,
          TAG: "v1.2.3",
          GITHUB_RUN_ATTEMPT: "2",
        },
      },
    );
  await run("dist/*.tar.gz\ndist/checksums.txt");
  assert.equal(
    outputs.paths,
    ["dist/*.tar.gz", "dist/checksums.txt"]
      .map((file) => path.join("/workspace/project", file))
      .join("\n"),
  );
  assert.match(outputs.name, /^go-release-v1\.2\.3-42-2-/);
  for (const value of ["", "../secret", "/etc/passwd"])
    await assert.rejects(() => run(value));
});
