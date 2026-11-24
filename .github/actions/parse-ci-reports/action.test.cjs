const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const {
  createWorkspace,
  loadActionStep,
} = require("../../../tests/action-test-helpers.cjs");

const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;

test("report artifacts contain only parsed reports and use unique names", async (t) => {
  const directory = createWorkspace(t);
  const report = path.join(directory, "junit.xml");
  fs.writeFileSync(report, "<testsuites/>");
  fs.writeFileSync(
    path.join(directory, "unrelated-secret.txt"),
    "not a report",
  );
  const prepare = new AsyncFunction(
    "core",
    "process",
    "require",
    loadActionStep(path.join(__dirname, "action.yml"), "prepare").with.script,
  );
  async function outputs(files, group = "outer-job", nativeCoverage = false) {
    const result = {};
    await prepare(
      {
        setOutput: (key, value) => {
          result[key] = value;
        },
      },
      {
        env: {
          DIRECTORY: directory,
          REPORT_FILES: JSON.stringify(files),
          REPORT_GROUP: group,
          NATIVE_COVERAGE: String(nativeCoverage),
          GITHUB_RUN_ATTEMPT: "2",
        },
      },
      require,
    );
    return result;
  }
  assert.deepEqual(await outputs([]), {});
  const first = await outputs([report]);
  assert.equal(first.files, report);
  assert.match(first.name, /^ci-reports-2-outer-job-/);
  assert.notEqual(first.name, (await outputs([report])).name);
  await assert.rejects(() => outputs([report], "../bad-group"), /report-group/);
  const coverage = path.join(directory, "coverage.out");
  fs.writeFileSync(coverage, "mode: atomic\n");
  const retained = await outputs([report], "outer-job", true);
  assert.equal(retained.files, report);
  assert.equal(retained["coverage-file"], coverage);
  assert.match(retained["coverage-name"], /^go-coverage-2-outer-job-/);
  assert.equal(
    retained.name.replace("ci-reports-", "go-coverage-"),
    retained["coverage-name"],
  );
  const coverageOnly = await outputs([], "outer-job", true);
  assert.equal(coverageOnly.files, undefined);
  assert.equal(coverageOnly["coverage-file"], coverage);
  await assert.rejects(() => outputs([], "../bad-group", true), /report-group/);
  assert.equal((await outputs([report])).files, report);
});
