<!-- header:start -->

# ![Icon](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItcGFja2FnZSIgY29sb3I9ImJsdWUiPjxsaW5lIHgxPSIxNi41IiB5MT0iOS40IiB4Mj0iNy41IiB5Mj0iNC4yMSI+PC9saW5lPjxwYXRoIGQ9Ik0yMSAxNlY4YTIgMiAwIDAgMC0xLTEuNzNsLTctNGEyIDIgMCAwIDAtMiAwbC03IDRBMiAyIDAgMCAwIDMgOHY4YTIgMiAwIDAgMCAxIDEuNzNsNyA0YTIgMiAwIDAgMCAyIDBsNy00QTIgMiAwIDAgMCAyMSAxNnoiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPSIzLjI3IDYuOTYgMTIgMTIuMDEgMjAuNzMgNi45NiI+PC9wb2x5bGluZT48bGluZSB4MT0iMTIiIHkxPSIyMi4wOCIgeDI9IjEyIiB5Mj0iMTIiPjwvbGluZT48L3N2Zz4=) GitHub Action: Test Go

<div align="center">
  <img src="../../.github/logo.svg" width="60px" align="center" alt="Test Go" />
</div>

---

<!-- header:end -->

<!-- jscpd:ignore-start -->
<!-- Generated repository badges repeat across references. -->

<!-- badges:start -->

[![Marketplace](https://img.shields.io/badge/Marketplace-test--go-blue?logo=github-actions)](https://github.com/marketplace/actions/test-go)
[![Release](https://img.shields.io/github/v/release/hoverkraft-tech/ci-github-go)](https://github.com/hoverkraft-tech/ci-github-go/releases)
[![License](https://img.shields.io/github/license/hoverkraft-tech/ci-github-go)](http://choosealicense.com/licenses/mit/)
[![Stars](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-go?style=social)](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-go?style=social)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/hoverkraft-tech/ci-github-go/blob/main/CONTRIBUTING.md)

<!-- badges:end -->

<!-- jscpd:ignore-end -->

<!-- overview:start -->

## Overview

Run Go tests with gotestsum, JUnit output and atomic coverage.

Defaults enable `-race`, `-count=1` and a five-minute package timeout.
The race detector requires CGO and a C compiler on a supported Linux runner;
set `race: "false"` when unavailable. A trusted Bash `command` replaces defaults
and must produce JUnit for test reporting and `coverage.out` for coverage.
GitHub coverage uses native `go tool cover` summaries and retains `coverage.out`;
the common report parser handles JUnit, not the native Go coverage format.
Native coverage is retained in a separate `go-coverage-*` artifact, so consolidated
CI reports receive only supported files. Coverage details remain in the test job summary.

<!-- jscpd:ignore-start -->
<!-- Shared setup and reporting guidance for standalone actions. -->

Run [setup-go](../setup-go/README.md) first with the same `working-directory`.

<!-- jscpd:ignore-end -->

`coverage: "github"` is the default. Set `coverage: "codecov"` and grant the
job `id-token: write` for OIDC upload of `coverage.out`. An empty coverage
value disables publication while retaining JUnit; collection is controlled by
the command. Custom commands must produce the applicable report files.

<!-- jscpd:ignore-start -->
<!-- Shared setup and reporting guidance for standalone actions. -->

Native reports survive command failures and are retained for seven days.
See the [continuous integration workflow](../../.github/workflows/continuous-integration.md#reports-and-permissions) for consolidated reporting and permissions.

<!-- jscpd:ignore-end -->

<!-- overview:end -->

<!-- jscpd:ignore-start -->
<!-- Generated API reference repeats action and workflow metadata. -->

<!-- usage:start -->

## Usage

```yaml
- uses: hoverkraft-tech/ci-github-go/actions/test@6c27a4d0727d6e7eb9be4dd0bfa3a8891b0df732 # fix/consolidated-go-coverage
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

| **Output**                 | **Description**                                                                 |
| -------------------------- | ------------------------------------------------------------------------------- |
| **`report-artifact-id`**   | Native report artifact ID. Empty when no reports were produced.                 |
| **`coverage-artifact-id`** | Native coverage.out artifact ID for GitHub coverage, or empty when unavailable. |

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

Copyright © 2026 hoverkraft

For more details, see the [license](http://choosealicense.com/licenses/mit/).

<!-- license:end -->

<!-- generated:start -->

---

This documentation was automatically generated by [CI Dokumentor](https://github.com/hoverkraft-tech/ci-dokumentor).

<!-- generated:end -->

<!-- jscpd:ignore-end -->
