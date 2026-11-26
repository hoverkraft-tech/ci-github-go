const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync, execFileSync } = require("node:child_process");
const test = require("node:test");
const YAML = require("yaml");
const { createWorkspace } = require("../../tests/action-test-helpers.cjs");
const action = YAML.parse(
  fs.readFileSync(path.join(__dirname, "action.yml"), "utf8"),
);
const packageStep = (id) => action.runs.steps.find((entry) => entry.id === id);
const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;
const context = { runId: 42, sha: "abc123" };

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
    spawnSync("bash", ["-euo", "pipefail", "-c", packageStep("tag").run], {
      cwd: directory,
      encoding: "utf8",
      timeout: 10000,
      env: {
        ...process.env,
        GIT_CONFIG_GLOBAL: "/dev/null",
        RELEASE_TAG: value,
        GITHUB_SHA: commit,
      },
    });
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
    packageStep("artifact").with.script,
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
