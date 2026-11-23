<!-- header:start -->

# GitHub Reusable Workflow: Go Continuous Integration

<!-- header:end -->
<!-- badges:start -->

[![Release](https://img.shields.io/github/v/release/hoverkraft-tech/ci-github-go)](https://github.com/hoverkraft-tech/ci-github-go/releases)
[![Stars](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-go?style=social)](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-go?style=social)

<!-- badges:end -->
<!-- overview:start -->

## Overview

Run opinionated language checks with project-owned configuration.
See the [usage guide](../../docs/usage/README.md).

### Permissions

- **`contents`**: `read`
- **`id-token`**: `write`

<!-- overview:end -->
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
    uses: hoverkraft-tech/ci-github-go/.github/workflows/continuous-integration.yml@ff229dbaa59bd8c6272fdbbd0fae8285a4d6c960 # main
    permissions:
      contents: read
      id-token: write
    with:
      # JSON array of Linux runner labels for all jobs.
      # Default: `["ubuntu-latest"]`
      runs-on: '["ubuntu-latest"]'

      # Enable all checks, including build or distribution checks.
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
| **`checks`**                | Enable all checks, including build or distribution checks.                                                                                                                                                                                                            | **false**    | **boolean** | `true`              |
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
<!-- examples:start -->
<!-- examples:end -->
<!-- contributing:start -->
<!-- contributing:end -->
<!-- security:start -->
<!-- security:end -->
<!-- license:start -->
<!-- license:end -->
<!-- generated:start -->

---

This documentation was automatically generated by [CI Dokumentor](https://github.com/hoverkraft-tech/ci-dokumentor).

<!-- generated:end -->
