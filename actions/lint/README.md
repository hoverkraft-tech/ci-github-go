<!-- header:start -->

# ![Icon](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItcGFja2FnZSIgY29sb3I9ImJsdWUiPjxsaW5lIHgxPSIxNi41IiB5MT0iOS40IiB4Mj0iNy41IiB5Mj0iNC4yMSI+PC9saW5lPjxwYXRoIGQ9Ik0yMSAxNlY4YTIgMiAwIDAgMC0xLTEuNzNsLTctNGEyIDIgMCAwIDAtMiAwbC03IDRBMiAyIDAgMCAwIDMgOHY4YTIgMiAwIDAgMCAxIDEuNzNsNyA0YTIgMiAwIDAgMCAyIDBsNy00QTIgMiAwIDAgMCAyMSAxNnoiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPSIzLjI3IDYuOTYgMTIgMTIuMDEgMjAuNzMgNi45NiI+PC9wb2x5bGluZT48bGluZSB4MT0iMTIiIHkxPSIyMi4wOCIgeDI9IjEyIiB5Mj0iMTIiPjwvbGluZT48L3N2Zz4=) GitHub Action: Lint Go

<!-- header:end -->
<!-- badges:start -->

[![Marketplace](https://img.shields.io/badge/Marketplace-lint--go-blue?logo=github-actions)](https://github.com/marketplace/actions/lint-go)
[![Release](https://img.shields.io/github/v/release/hoverkraft-tech/ci-github-go)](https://github.com/hoverkraft-tech/ci-github-go/releases)
[![Stars](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-go?style=social)](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-go?style=social)

<!-- badges:end -->
<!-- overview:start -->

## Overview

Check gofmt, module tidiness and golangci-lint v2 diagnostics.

Put project rules in `.golangci.yml`; the default is the standard linter set.
The pinned golangci-lint release must support the selected Go version.
Use `command` to replace defaults with a trusted Bash program.
Custom commands should emit SARIF or Checkstyle for annotations.

Run [setup-go](../setup-go/README.md) first with the same `working-directory`.
This action reuses the installed environment. Use the same reviewed commit SHA
for both actions. Do not populate command inputs from untrusted pull request text.

```yaml
- uses: hoverkraft-tech/ci-github-go/actions/lint@main
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

See the [continuous integration workflow](../../.github/workflows/continuous-integration.md) for orchestration and version matrices.

<!-- overview:end -->
<!-- usage:start -->

## Usage

```yaml
- uses: hoverkraft-tech/ci-github-go/actions/lint@4972baa1144765ad7e861d58860b311b4806091b # main
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
<!-- contributing:end -->
<!-- security:start -->
<!-- security:end -->
<!-- license:start -->
<!-- license:end -->
<!-- generated:start -->

---

This documentation was automatically generated by [CI Dokumentor](https://github.com/hoverkraft-tech/ci-dokumentor).

<!-- generated:end -->
