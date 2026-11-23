<!-- header:start -->

# GitHub Reusable Workflow: Go Continuous Integration

<div align="center">
  <img src="../logo.svg" width="60px" align="center" alt="Go Continuous Integration" />
</div>

---

<!-- header:end -->

<!-- jscpd:ignore-start -->
<!-- Generated repository badges repeat across references. -->

<!-- badges:start -->

[![Release](https://img.shields.io/github/v/release/hoverkraft-tech/ci-github-go)](https://github.com/hoverkraft-tech/ci-github-go/releases)
[![License](https://img.shields.io/github/license/hoverkraft-tech/ci-github-go)](http://choosealicense.com/licenses/mit/)
[![Stars](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-go?style=social)](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-go?style=social)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/hoverkraft-tech/ci-github-go/blob/main/CONTRIBUTING.md)

<!-- badges:end -->

<!-- jscpd:ignore-end -->

<!-- overview:start -->

## Overview

Run opinionated checks with project-owned configuration.

### Quick start

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
the primary version: lint, audit and build checks run there, and only
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

### Go projects

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

### Reports and permissions

Tests retain JUnit and supported coverage files for seven days, including after
command failures. Lint retains parsed SARIF/Checkstyle reports. Only report files
are uploaded, with unique names for parallel calls; a job producing no reports
returns an empty `report-artifact-id`. Summaries and annotations work without PR
write permissions. Individual PR comments are not created.

Use the common
[ci-reports workflow](https://github.com/hoverkraft-tech/ci-github-common/blob/main/.github/workflows/ci-reports.yml)
for consolidated comments after standalone producer jobs; set `report-group` to
the outer calling job ID when required. Go coverage uses native `go tool cover` summaries and retains
`coverage.out`; the common parser handles JUnit, not native Go coverage.

`test: '{"coverage":"codecov"}'` enables OIDC upload. The expected coverage file is
`coverage.out`. A custom command must produce
the applicable file. `coverage` controls publication, not collection, and an
empty value still retains JUnit results. The reusable workflow declares
`id-token: write` for Codecov and callers must grant it, including for default
GitHub reports. Standalone GitHub reporting requires only read permissions.
No repository-specific bot secrets are required by the public actions or workflow.

See [setup-go](../../actions/setup-go/README.md), [lint](../../actions/lint/README.md),
[test](../../actions/test/README.md) and [audit](../../actions/audit/README.md)
for standalone action usage. Pin the workflow to a reviewed commit SHA in production.

### Permissions

- **`contents`**: `read`
- **`id-token`**: `write`

<!-- overview:end -->

<!-- jscpd:ignore-start -->
<!-- Generated API reference repeats action and workflow metadata. -->

<!-- usage:start -->

## Usage

```yaml
name: Go Continuous Integration
on:
  push:
    branches:
      - main
permissions: {}
jobs:
  continuous-integration:
    uses: hoverkraft-tech/ci-github-go/.github/workflows/continuous-integration.yml@6a83ad7eda6b780f04c65007c9f48f0a7170ad01 # fix/enforce-lint-checks
    permissions:
      contents: read
      id-token: write
    with:
      # JSON array of Linux runner labels for all jobs.
      # Default: `["ubuntu-latest"]`
      runs-on: '["ubuntu-latest"]'

      # Enable all checks, including build.
      # Default: `true`
      checks: true

      # One project directory inside the checkout. Use a caller matrix for multiple projects.
      # Default: `.`
      working-directory: .

      # JSON array of Go versions. The last entry runs lint, audit and build and publishes coverage. Empty runs project detection once. An empty entry uses the project version.
      go-versions: ""

      # true for default checks, a trusted Bash command, or a JSON object with command. false, null or empty disables lint.
      # Default: `true`
      lint: "true"

      # true for default tests, a trusted Bash command, or a JSON object with command, coverage (`github`, `codecov` or empty), and race (boolean). false, null or empty disables tests. Coverage publication runs only on the last version; the command controls collection.
      # Default: `true`
      test: "true"

      # Check production dependencies for known vulnerabilities.
      # Default: `true`
      audit: true

      # Review dependency changes on pull requests. Requires GitHub dependency review availability.
      # Default: `true`
      dependency-review: true

      # true for go build, a trusted Bash command, or a JSON object with command and artifact (one project-relative directory). false, null or empty disables build.
      # Default: `true`
      build: "true"

      # Pinned golangci-lint v2 release used by the lint action.
      # Default: `v2.15.0`
      golangci-lint-version: v2.15.0
```

<!-- usage:end -->

<!-- inputs:start -->

## Inputs

### Workflow Call Inputs

| **Input**                   | **Description**                                                                                                                                                                                                                                                       | **Required** | **Type**    | **Default**         |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- | ------------------- |
| **`runs-on`**               | JSON array of Linux runner labels for all jobs.                                                                                                                                                                                                                       | **false**    | **string**  | `["ubuntu-latest"]` |
| **`checks`**                | Enable all checks, including build.                                                                                                                                                                                                                                   | **false**    | **boolean** | `true`              |
| **`working-directory`**     | One project directory inside the checkout. Use a caller matrix for multiple projects.                                                                                                                                                                                 | **false**    | **string**  | `.`                 |
| **`go-versions`**           | JSON array of Go versions. The last entry runs lint, audit and build and publishes coverage. Empty runs project detection once. An empty entry uses the project version.                                                                                              | **false**    | **string**  | -                   |
| **`lint`**                  | true for default checks, a trusted Bash command, or a JSON object with command. false, null or empty disables lint.                                                                                                                                                   | **false**    | **string**  | `true`              |
| **`test`**                  | true for default tests, a trusted Bash command, or a JSON object with command, coverage (`github`, `codecov` or empty), and race (boolean). false, null or empty disables tests. Coverage publication runs only on the last version; the command controls collection. | **false**    | **string**  | `true`              |
| **`audit`**                 | Check production dependencies for known vulnerabilities.                                                                                                                                                                                                              | **false**    | **boolean** | `true`              |
| **`dependency-review`**     | Review dependency changes on pull requests. Requires GitHub dependency review availability.                                                                                                                                                                           | **false**    | **boolean** | `true`              |
| **`build`**                 | true for go build, a trusted Bash command, or a JSON object with command and artifact (one project-relative directory). false, null or empty disables build.                                                                                                          | **false**    | **string**  | `true`              |
| **`golangci-lint-version`** | Pinned golangci-lint v2 release used by the lint action.                                                                                                                                                                                                              | **false**    | **string**  | `v2.15.0`           |

<!-- inputs:end -->

<!-- secrets:start -->
<!-- secrets:end -->

<!-- outputs:start -->

## Outputs

| **Output**              | **Description**                                      |
| ----------------------- | ---------------------------------------------------- |
| **`build-artifact-id`** | Build artifact ID when build.artifact is configured. |

<!-- outputs:end -->

<!-- jscpd:ignore-end -->

<!-- examples:start -->
<!-- examples:end -->

<!-- jscpd:ignore-start -->
<!-- Generated repository and tool boilerplate repeats across references. -->

<!-- contributing:start -->

## Contributing

Contributions are welcome! Please see the [contributing guidelines](https://github.com/hoverkraft-tech/ci-github-go/blob/main/CONTRIBUTING.md) for more details.

<!-- contributing:end -->

<!-- security:start -->
<!-- security:end -->

<!-- license:start -->

## License

This project is licensed under the MIT License.

SPDX-License-Identifier: MIT

Copyright © 2026 hoverkraft-tech

For more details, see the [license](http://choosealicense.com/licenses/mit/).

<!-- license:end -->

<!-- generated:start -->

---

This documentation was automatically generated by [CI Dokumentor](https://github.com/hoverkraft-tech/ci-dokumentor).

<!-- generated:end -->

<!-- jscpd:ignore-end -->
