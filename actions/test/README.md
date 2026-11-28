<!-- header:start -->

# ![Icon](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItcGFja2FnZSIgY29sb3I9ImJsdWUiPjxsaW5lIHgxPSIxNi41IiB5MT0iOS40IiB4Mj0iNy41IiB5Mj0iNC4yMSI+PC9saW5lPjxwYXRoIGQ9Ik0yMSAxNlY4YTIgMiAwIDAgMC0xLTEuNzNsLTctNGEyIDIgMCAwIDAtMiAwbC03IDRBMiAyIDAgMCAwIDMgOHY4YTIgMiAwIDAgMCAxIDEuNzNsNyA0YTIgMiAwIDAgMCAyIDBsNy00QTIgMiAwIDAgMCAyMSAxNnoiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPSIzLjI3IDYuOTYgMTIgMTIuMDEgMjAuNzMgNi45NiI+PC9wb2x5bGluZT48bGluZSB4MT0iMTIiIHkxPSIyMi4wOCIgeDI9IjEyIiB5Mj0iMTIiPjwvbGluZT48L3N2Zz4=) GitHub Action: Test Go

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

Run Go tests with detailed JUnit results on every runtime and optional native coverage.

Run setup-go first. Defaults write junit.xml and coverage.out into a fresh
CI_REPORTS_DIR. Coverage instrumentation is disabled when coverage is false.
Custom commands receive CI_REPORTS_DIR and CI_TEST_COVERAGE.

Required outputs are registered before execution and validated after success or
failure. The Go profile retains native statement counts. Select publication once
in common ci-reports after all jobs; no report outputs need forwarding.
Producer jobs require actions: read and contents: read.

<!-- overview:end -->

<!-- jscpd:ignore-start -->
<!-- Generated API reference repeats action and workflow metadata. -->

<!-- usage:start -->

## Usage

```yaml
- uses: hoverkraft-tech/ci-github-go/actions/test@b529d39b7c3b358eb6f3ed52fadd5b6ae5438ece # feat/native-github-coverage
  with:
    # Go module directory.
    # Default: `.`
    working-directory: .

    # Trusted Bash replacement for the default checks. Write declared native reports under CI_REPORTS_DIR; test commands must honor CI_TEST_COVERAGE.
    command: ""

    # Enable the race detector for the default command. Requires CGO and a C compiler.
    # Default: `true`
    race: "true"

    # Collect native Go coverage. The default command disables instrumentation when false.
    # Default: `true`
    coverage: "true"

    # Required native report paths relative to CI_REPORTS_DIR, one per line.
    # Default: `junit.xml`
    test-results: junit.xml

    # Required native Go coverage profile paths relative to CI_REPORTS_DIR when coverage is enabled.
    # Default: `coverage.out`
    test-coverage: coverage.out
```

<!-- usage:end -->

<!-- inputs:start -->

## Inputs

| **Input**               | **Description**                                                                                                                                 | **Required** | **Default**    |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------------- |
| **`working-directory`** | Go module directory.                                                                                                                            | **false**    | `.`            |
| **`command`**           | Trusted Bash replacement for the default checks. Write declared native reports under CI_REPORTS_DIR; test commands must honor CI_TEST_COVERAGE. | **false**    | -              |
| **`race`**              | Enable the race detector for the default command. Requires CGO and a C compiler.                                                                | **false**    | `true`         |
| **`coverage`**          | Collect native Go coverage. The default command disables instrumentation when false.                                                            | **false**    | `true`         |
| **`test-results`**      | Required native report paths relative to CI_REPORTS_DIR, one per line.                                                                          | **false**    | `junit.xml`    |
| **`test-coverage`**     | Required native Go coverage profile paths relative to CI_REPORTS_DIR when coverage is enabled.                                                  | **false**    | `coverage.out` |

<!-- inputs:end -->

<!-- secrets:start -->
<!-- secrets:end -->

<!-- outputs:start -->

## Outputs

| **Output**               | **Description**                                                       |
| ------------------------ | --------------------------------------------------------------------- |
| **`report-artifact-id`** | Native report bundle, including available diagnostics after failures. |

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
