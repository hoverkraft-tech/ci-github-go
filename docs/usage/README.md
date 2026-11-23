# Using Go CI

## Reusable workflow

```yaml
name: CI
on: [push, pull_request]
permissions: {}
jobs:
  go:
    uses: hoverkraft-tech/ci-github-go/.github/workflows/continuous-integration.yml@main
    permissions:
      contents: read
      id-token: write
    with:
      working-directory: .
      go-versions: '["1.26", "1.27"]'
```

An empty versions input uses project detection once. The last matrix entry is
the primary version: lint, audit and build or package checks run there, and only
that version publishes coverage. Tests run on every entry with fail-fast disabled.
Duplicate, malformed and non-string versions are rejected. `runs-on` is a JSON
array of Linux labels and applies to every job, including configuration.

`checks: false` disables every check. Set `lint` or `test` to the string
`"false"`, `"null"` or an empty string to disable that check. A command string or
JSON object with `command` replaces its default. Commands are trusted Bash
programs and run unchanged with failure propagation; do not populate them from
untrusted pull request text. Unknown options fail before any project execution.

Dependency review runs only on pull requests. Disable it with
`dependency-review: false` when unavailable for the caller repository.
`audit: false` disables vulnerability scanning. Audit results depend on the
current vulnerability database and require network access.

## Standalone actions

Check out your project with `persist-credentials: false`, call
`actions/setup-go`, then `actions/lint`, `actions/test`, `actions/audit`, or the
build/distribution action. Use the same reviewed repository SHA for each action.
Lint and test actions do not install the project again. Use
`install-dependencies: "false"` only when the caller manages dependencies.
Working directories must resolve inside the checkout.

## Go projects

Each job targets one module. The setup action uses `go.mod` (including a
`toolchain` directive) unless `go-version` is supplied. Pin a supported
toolchain in the project. Explicit matrix versions should use major/minor
strings to receive their latest patch releases.

Setup downloads and verifies modules and runs `go mod tidy -diff` without
repairing metadata. `GOWORK=off` isolates the module, and `GOTOOLCHAIN=local`
prevents a matrix entry silently switching compilers. Use a caller matrix
over `working-directory` for repositories containing several modules.

Default lint checks gofmt, module tidiness and golangci-lint v2. Put project
rules in `.golangci.yml`; the default is the standard linter set. The
pinned linter must support the chosen Go version. Tests use gotestsum with
`-race`, `-count=1`, a five-minute package timeout and atomic coverage.
Set `test: '{"race":false}'` when the runner cannot use the race detector.
Audit uses the official govulncheck, including standard-library advisories.

Build checks all packages by default. To retain a binary:

```yaml
with:
  build: '{"command":"go build -mod=readonly -trimpath -o dist/server ./cmd/server","artifact":"dist"}'
```

`build-artifact-id` identifies that upload. Artifact paths are directories
inside the checkout. Each invocation uses a unique artifact name.
Build output is not published as a release.

## Reports and permissions

Tests retain JUnit and supported coverage files for seven days, including after
command failures. Lint retains parsed SARIF/Checkstyle reports. Only report files
are uploaded, with unique names for parallel calls; a job producing no reports
returns an empty `report-artifact-id`. Summaries and annotations work without PR
write permissions. Individual PR comments are not created.

Use the common
[ci-reports workflow](https://github.com/hoverkraft-tech/ci-github-common/blob/main/.github/workflows/ci-reports.yml)
for consolidated comments after standalone producer jobs; set `report-group` to
the outer calling job ID when required. Python Cobertura reports use the common
parser. Go coverage uses native `go tool cover` summaries and retains
`coverage.out`; the common parser does not parse that native format.

`test: '{"coverage":"codecov"}'` enables OIDC upload. The default filenames are
`coverage.out` for Go and `cobertura.xml` for Python. A custom command must produce
the applicable file. `coverage` controls publication, not collection, and an
empty value still retains JUnit results. The reusable workflow declares
`id-token: write` for Codecov and callers must grant it, including for default
GitHub reports. Standalone GitHub reporting requires only read permissions.
No repository-specific bot secrets are required by the public actions or workflow.
