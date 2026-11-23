<!-- header:start -->

# ![Icon](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItcGFja2FnZSIgY29sb3I9ImJsdWUiPjxsaW5lIHgxPSIxNi41IiB5MT0iOS40IiB4Mj0iNy41IiB5Mj0iNC4yMSI+PC9saW5lPjxwYXRoIGQ9Ik0yMSAxNlY4YTIgMiAwIDAgMC0xLTEuNzNsLTctNGEyIDIgMCAwIDAtMiAwbC03IDRBMiAyIDAgMCAwIDMgOHY4YTIgMiAwIDAgMCAxIDEuNzNsNyA0YTIgMiAwIDAgMCAyIDBsNy00QTIgMiAwIDAgMCAyMSAxNnoiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPSIzLjI3IDYuOTYgMTIgMTIuMDEgMjAuNzMgNi45NiI+PC9wb2x5bGluZT48bGluZSB4MT0iMTIiIHkxPSIyMi4wOCIgeDI9IjEyIiB5Mj0iMTIiPjwvbGluZT48L3N2Zz4=) GitHub Action: Lint Go

<div align="center">
  <img src="../../.github/logo.svg" width="60px" align="center" alt="Lint Go" />
</div>

---

<!-- header:end -->
<!-- badges:start -->

[![Marketplace](https://img.shields.io/badge/Marketplace-lint--go-blue?logo=github-actions)](https://github.com/marketplace/actions/lint-go)
[![Release](https://img.shields.io/github/v/release/hoverkraft-tech/ci-github-go)](https://github.com/hoverkraft-tech/ci-github-go/releases)
[![License](https://img.shields.io/github/license/hoverkraft-tech/ci-github-go)](http://choosealicense.com/licenses/mit/)
[![Stars](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-go?style=social)](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-go?style=social)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/hoverkraft-tech/ci-github-go/blob/main/CONTRIBUTING.md)

<!-- badges:end -->
<!-- overview:start -->

## Overview

Check gofmt, module tidiness and golangci-lint v2 diagnostics.

Put project rules in `.golangci.yml`; the default is the standard linter set.
The pinned golangci-lint release must support the selected Go version.
Use `command` to replace defaults with a trusted Bash program.
Custom commands should emit SARIF or Checkstyle for annotations.

Run [setup-go](../setup-go/README.md) first with the same `working-directory`.

Native reports survive command failures and are retained for seven days.
See the [continuous integration workflow](../../.github/workflows/continuous-integration.md#reports-and-permissions) for consolidated reporting and permissions.

<!-- overview:end -->
<!-- usage:start -->

## Usage

```yaml
- uses: hoverkraft-tech/ci-github-go/actions/lint@c78fc5df69258300e08b5017e1a7768cab4f2a03 # fix/enforce-lint-checks
  with:
    # Go module directory.
    # Default: `.`
    working-directory: .

    # Pinned golangci-lint v2 release.
    # Default: `v2.15.0`
    golangci-lint-version: v2.15.0

    # Trusted Bash command replacing the default formatting and lint checks. Project configuration remains authoritative.
    command: ""

    # Outer calling job ID for consolidated ci-reports. Defaults to the current job ID. No individual PR comments are posted.
    report-group: ""
```

<!-- usage:end -->
<!-- inputs:start -->

## Inputs

| **Input**                   | **Description**                                                                                                         | **Required** | **Default** |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- |
| **`working-directory`**     | Go module directory.                                                                                                    | **false**    | `.`         |
| **`golangci-lint-version`** | Pinned golangci-lint v2 release.                                                                                        | **false**    | `v2.15.0`   |
| **`command`**               | Trusted Bash command replacing the default formatting and lint checks. Project configuration remains authoritative.     | **false**    | -           |
| **`report-group`**          | Outer calling job ID for consolidated ci-reports. Defaults to the current job ID. No individual PR comments are posted. | **false**    | -           |

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
