<!-- header:start -->

# GitHub Reusable Workflow: Go Continuous Integration

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
    with:
      working-directory: .
      go-versions: '["1.26", "1.27"]'
```

An empty versions input uses project detection once. The highest configured version is
the primary version: lint, audit and build checks run there, and only
that version contributes coverage. Tests run on every entry with fail-fast disabled.
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

Every runtime retains validated JUnit test results. Lint and coverage run once
on the highest configured version; the default command disables instrumentation
on other versions. Custom commands receive CI_REPORTS_DIR and CI_TEST_COVERAGE.
Go coverage remains a native profile with its statement-weighted measurement.
Line-oriented publication formats are prepared only for selected destinations.

Call common ci-reports.yml once after all jobs with job-results: toJSON(needs).
No report plans or artifact IDs need forwarding. Producer calls require actions:
read and contents: read. The reporting caller grants actions: read, contents: read,
pull-requests: write, code-quality: write, id-token: write and security-events: write.
Lint and tests default to annotations; coverage uses GitHub when available and
a comment or summary otherwise. Select destinations once using lint-reporters,
test-results-reporters and test-coverage-reporters.

### Permissions

- **`actions`**: `read`
- **`contents`**: `read`

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
    uses: hoverkraft-tech/ci-github-go/.github/workflows/continuous-integration.yml@b529d39b7c3b358eb6f3ed52fadd5b6ae5438ece # feat/native-github-coverage
    permissions:
      actions: read
      contents: read
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

      # JSON array of Go versions. Every version retains test results; the highest configured version runs lint, audit, build and coverage. Empty uses project detection once.
      go-versions: ""

      # true for defaults, a Bash command or JSON options (command, lint-results). false, null or empty disables lint.
      # Default: `true`
      lint: "true"

      # true for defaults, a Bash command or JSON options (command, race, coverage, test-results, test-coverage). Paths are relative to CI_REPORTS_DIR. false, null or empty disables tests.
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

| **Input**                   | **Description**                                                                                                                                                                      | **Required** | **Type**    | **Default**         |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ | ----------- | ------------------- |
| **`runs-on`**               | JSON array of Linux runner labels for all jobs.                                                                                                                                      | **false**    | **string**  | `["ubuntu-latest"]` |
| **`checks`**                | Enable all checks, including build.                                                                                                                                                  | **false**    | **boolean** | `true`              |
| **`working-directory`**     | One project directory inside the checkout. Use a caller matrix for multiple projects.                                                                                                | **false**    | **string**  | `.`                 |
| **`go-versions`**           | JSON array of Go versions. Every version retains test results; the highest configured version runs lint, audit, build and coverage. Empty uses project detection once.               | **false**    | **string**  | -                   |
| **`lint`**                  | true for defaults, a Bash command or JSON options (command, lint-results). false, null or empty disables lint.                                                                       | **false**    | **string**  | `true`              |
| **`test`**                  | true for defaults, a Bash command or JSON options (command, race, coverage, test-results, test-coverage). Paths are relative to CI_REPORTS_DIR. false, null or empty disables tests. | **false**    | **string**  | `true`              |
| **`audit`**                 | Check production dependencies for known vulnerabilities.                                                                                                                             | **false**    | **boolean** | `true`              |
| **`dependency-review`**     | Review dependency changes on pull requests. Requires GitHub dependency review availability.                                                                                          | **false**    | **boolean** | `true`              |
| **`build`**                 | true for go build, a trusted Bash command, or a JSON object with command and artifact (one project-relative directory). false, null or empty disables build.                         | **false**    | **string**  | `true`              |
| **`golangci-lint-version`** | Pinned golangci-lint v2 release used by the lint action.                                                                                                                             | **false**    | **string**  | `v2.15.0`           |

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
