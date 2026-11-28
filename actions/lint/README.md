<!-- header:start -->

# ![Icon](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItcGFja2FnZSIgY29sb3I9ImJsdWUiPjxsaW5lIHgxPSIxNi41IiB5MT0iOS40IiB4Mj0iNy41IiB5Mj0iNC4yMSI+PC9saW5lPjxwYXRoIGQ9Ik0yMSAxNlY4YTIgMiAwIDAgMC0xLTEuNzNsLTctNGEyIDIgMCAwIDAtMiAwbC03IDRBMiAyIDAgMCAwIDMgOHY4YTIgMiAwIDAgMCAxIDEuNzNsNyA0YTIgMiAwIDAgMCAyIDBsNy00QTIgMiAwIDAgMCAyMSAxNnoiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPSIzLjI3IDYuOTYgMTIgMTIuMDEgMjAuNzMgNi45NiI+PC9wb2x5bGluZT48bGluZSB4MT0iMTIiIHkxPSIyMi4wOCIgeDI9IjEyIiB5Mj0iMTIiPjwvbGluZT48L3N2Zz4=) GitHub Action: Lint Go

<!-- header:end -->

<!-- jscpd:ignore-start -->
<!-- Generated repository badges repeat across references. -->

<!-- badges:start -->

[![Marketplace](https://img.shields.io/badge/Marketplace-lint--go-blue?logo=github-actions)](https://github.com/marketplace/actions/lint-go)
[![Release](https://img.shields.io/github/v/release/hoverkraft-tech/ci-github-go)](https://github.com/hoverkraft-tech/ci-github-go/releases)
[![License](https://img.shields.io/github/license/hoverkraft-tech/ci-github-go)](http://choosealicense.com/licenses/mit/)
[![Stars](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-go?style=social)](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-go?style=social)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/hoverkraft-tech/ci-github-go/blob/main/CONTRIBUTING.md)

<!-- badges:end -->

<!-- jscpd:ignore-end -->

<!-- overview:start -->

## Overview

Check gofmt, module tidiness and golangci-lint v2 diagnostics.

Run setup-go first. Project rules belong in .golangci.yml. All default checks
execute even after a failure; SARIF is written into a fresh CI_REPORTS_DIR.
Custom commands must write the declared native reports under CI_REPORTS_DIR.
Reports are registered before execution and validated afterward, including after
failure. Call common ci-reports once after all jobs for annotations and summaries.
Producer jobs require actions: read and contents: read.

<!-- overview:end -->

<!-- jscpd:ignore-start -->
<!-- Generated API reference repeats action and workflow metadata. -->

<!-- usage:start -->

## Usage

```yaml
- uses: hoverkraft-tech/ci-github-go/actions/lint@b529d39b7c3b358eb6f3ed52fadd5b6ae5438ece # feat/native-github-coverage
  with:
    # Go module directory.
    # Default: `.`
    working-directory: .

    # Pinned golangci-lint v2 release.
    # Default: `v2.15.0`
    golangci-lint-version: v2.15.0

    # Trusted Bash replacement for the default checks. Write declared native reports under CI_REPORTS_DIR; test commands must honor CI_TEST_COVERAGE.
    command: ""

    # Required native report paths relative to CI_REPORTS_DIR, one per line.
    # Default: `golangci-lint.sarif`
    lint-results: golangci-lint.sarif
```

<!-- usage:end -->

<!-- inputs:start -->

## Inputs

| **Input**                   | **Description**                                                                                                                                 | **Required** | **Default**           |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------------- |
| **`working-directory`**     | Go module directory.                                                                                                                            | **false**    | `.`                   |
| **`golangci-lint-version`** | Pinned golangci-lint v2 release.                                                                                                                | **false**    | `v2.15.0`             |
| **`command`**               | Trusted Bash replacement for the default checks. Write declared native reports under CI_REPORTS_DIR; test commands must honor CI_TEST_COVERAGE. | **false**    | -                     |
| **`lint-results`**          | Required native report paths relative to CI_REPORTS_DIR, one per line.                                                                          | **false**    | `golangci-lint.sarif` |

<!-- inputs:end -->

<!-- secrets:start -->
<!-- secrets:end -->

<!-- outputs:start -->

## Outputs

| **Output**               | **Description**            |
| ------------------------ | -------------------------- |
| **`report-artifact-id`** | Native lint report bundle. |

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
