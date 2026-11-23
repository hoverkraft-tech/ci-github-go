<!-- header:start -->

# ![Icon](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItcGFja2FnZSIgY29sb3I9ImJsdWUiPjxsaW5lIHgxPSIxNi41IiB5MT0iOS40IiB4Mj0iNy41IiB5Mj0iNC4yMSI+PC9saW5lPjxwYXRoIGQ9Ik0yMSAxNlY4YTIgMiAwIDAgMC0xLTEuNzNsLTctNGEyIDIgMCAwIDAtMiAwbC03IDRBMiAyIDAgMCAwIDMgOHY4YTIgMiAwIDAgMCAxIDEuNzNsNyA0YTIgMiAwIDAgMCAyIDBsNy00QTIgMiAwIDAgMCAyMSAxNnoiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPSIzLjI3IDYuOTYgMTIgMTIuMDEgMjAuNzMgNi45NiI+PC9wb2x5bGluZT48bGluZSB4MT0iMTIiIHkxPSIyMi4wOCIgeDI9IjEyIiB5Mj0iMTIiPjwvbGluZT48L3N2Zz4=) GitHub Action: Test Go

<!-- header:end -->
<!-- badges:start -->

[![Marketplace](https://img.shields.io/badge/Marketplace-test--go-blue?logo=github-actions)](https://github.com/marketplace/actions/test-go)
[![Release](https://img.shields.io/github/v/release/hoverkraft-tech/ci-github-go)](https://github.com/hoverkraft-tech/ci-github-go/releases)
[![Stars](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-go?style=social)](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-go?style=social)

<!-- badges:end -->
<!-- overview:start -->

## Overview

Run Go tests with gotestsum, JUnit output and atomic coverage.

Defaults enable `-race`, `-count=1` and a five-minute package timeout.
The race detector requires CGO and a C compiler on a supported Linux runner;
set `race: "false"` when unavailable. A trusted Bash `command` replaces defaults
and must produce JUnit for test reporting and `coverage.out` for coverage.
GitHub coverage uses native `go tool cover` summaries and retains `coverage.out`;
the common report parser handles JUnit, not the native Go coverage format.

Run [setup-go](../setup-go/README.md) first with the same `working-directory`.
This action reuses the installed environment. Use the same reviewed commit SHA
for both actions. Do not populate command inputs from untrusted pull request text.

```yaml
- uses: hoverkraft-tech/ci-github-go/actions/test@main
  with:
    working-directory: .
```

### Reports

Native reports are retained for seven days, including after command failures.
Only report files are uploaded, with unique names for parallel calls. When no
reports are produced, `report-artifact-id` is empty. GitHub summaries and
annotations need only `contents: read`; individual PR comments are not created.
Use the common [ci-reports workflow](https://github.com/hoverkraft-tech/ci-github-common/blob/main/.github/workflows/ci-reports.yml)
for consolidated comments and set `report-group` to the outer calling job ID.

`coverage: "github"` is the default. Set `coverage: "codecov"` and grant the
job `id-token: write` for OIDC upload of `coverage.out`. An empty coverage
value disables publication while retaining JUnit; collection is controlled by
the command. Custom commands must produce the applicable report files.

See the [continuous integration workflow](../../.github/workflows/continuous-integration.md) for orchestration and version matrices.

<!-- overview:end -->
<!-- usage:start -->

## Usage

```yaml
- uses: hoverkraft-tech/ci-github-go/actions/test@4972baa1144765ad7e861d58860b311b4806091b # main
  with:
    # Go module directory.
    # Default: `.`
    working-directory: .

    # Trusted Bash command replacing the default test command. Generate junit.xml and coverage.out for reporting.
    command: ""

    # Enable the race detector for the default command. Requires CGO and a C compiler.
    # Default: `true`
    race: "true"

    # Publication only: `github` (native go tool cover summary), `codecov`, or empty. Collection is controlled by the test command.
    # Default: `github`
    coverage: github

    # Outer calling job ID for consolidated ci-reports. Defaults to the current job ID. No individual PR comments are posted.
    report-group: ""
```

<!-- usage:end -->
<!-- inputs:start -->

## Inputs

| **Input**               | **Description**                                                                                                               | **Required** | **Default** |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- |
| **`working-directory`** | Go module directory.                                                                                                          | **false**    | `.`         |
| **`command`**           | Trusted Bash command replacing the default test command. Generate junit.xml and coverage.out for reporting.                   | **false**    | -           |
| **`race`**              | Enable the race detector for the default command. Requires CGO and a C compiler.                                              | **false**    | `true`      |
| **`coverage`**          | Publication only: `github` (native go tool cover summary), `codecov`, or empty. Collection is controlled by the test command. | **false**    | `github`    |
| **`report-group`**      | Outer calling job ID for consolidated ci-reports. Defaults to the current job ID. No individual PR comments are posted.       | **false**    | -           |

<!-- inputs:end -->
<!-- secrets:start -->
<!-- secrets:end -->
<!-- outputs:start -->

## Outputs

| **Output**               | **Description**                                                 |
| ------------------------ | --------------------------------------------------------------- |
| **`report-artifact-id`** | Native report artifact ID. Empty when no reports were produced. |

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
