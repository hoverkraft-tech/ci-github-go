<!-- header:start -->

# ![Icon](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItcGFja2FnZSIgY29sb3I9ImJsdWUiPjxsaW5lIHgxPSIxNi41IiB5MT0iOS40IiB4Mj0iNy41IiB5Mj0iNC4yMSI+PC9saW5lPjxwYXRoIGQ9Ik0yMSAxNlY4YTIgMiAwIDAgMC0xLTEuNzNsLTctNGEyIDIgMCAwIDAtMiAwbC03IDRBMiAyIDAgMCAwIDMgOHY4YTIgMiAwIDAgMCAxIDEuNzNsNyA0YTIgMiAwIDAgMCAyIDBsNy00QTIgMiAwIDAgMCAyMSAxNnoiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPSIzLjI3IDYuOTYgMTIgMTIuMDEgMjAuNzMgNi45NiI+PC9wb2x5bGluZT48bGluZSB4MT0iMTIiIHkxPSIyMi4wOCIgeDI9IjEyIiB5Mj0iMTIiPjwvbGluZT48L3N2Zz4=) GitHub Action: Setup Go

<div align="center">
  <img src="../../.github/logo.svg" width="60px" align="center" alt="Setup Go" />
</div>

---

<!-- header:end -->

<!-- jscpd:ignore-start -->
<!-- Generated repository badges repeat across references. -->

<!-- badges:start -->

[![Marketplace](https://img.shields.io/badge/Marketplace-setup--go-blue?logo=github-actions)](https://github.com/marketplace/actions/setup-go)
[![Release](https://img.shields.io/github/v/release/hoverkraft-tech/ci-github-go)](https://github.com/hoverkraft-tech/ci-github-go/releases)
[![License](https://img.shields.io/github/license/hoverkraft-tech/ci-github-go)](http://choosealicense.com/licenses/mit/)
[![Stars](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-go?style=social)](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-go?style=social)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/hoverkraft-tech/ci-github-go/blob/main/CONTRIBUTING.md)

<!-- badges:end -->

<!-- jscpd:ignore-end -->

<!-- overview:start -->

## Overview

Install the project toolchain, cache modules and verify dependencies.

Each invocation targets one module with a committed `go.mod` and `go.sum`
when dependencies require it. Explicit `go-version` takes precedence;
otherwise setup uses `go.mod`, including its `toolchain` directive.
Pin a supported toolchain in the project. Explicit major/minor versions receive
their latest patch releases.

Setup runs `go mod download`, `go mod verify` and `go mod tidy -diff`.
Metadata drift fails without rewriting files. `GOWORK=off` isolates the module
and `GOTOOLCHAIN=local` prevents a matrix entry silently switching compilers.
Use a caller matrix over `working-directory` for repositories with several modules.
Set `install-dependencies: "false"` for runtime-only jobs or caller-managed dependencies;
`go.mod` is still required. Working directories must stay inside the checkout.

### Standalone setup

Check out the project before setup. Use a Linux runner supporting Node.js 24
actions and pin all actions from this repository to the same reviewed commit.
Later lint, test and audit actions reuse this environment.

```yaml
steps:
  - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1
    with:
      persist-credentials: false
  - uses: hoverkraft-tech/ci-github-go/actions/setup-go@main
    with:
      working-directory: .
```

<!-- jscpd:ignore-start -->
<!-- Shared setup and reporting guidance for standalone actions. -->

See the [continuous integration workflow](../../.github/workflows/continuous-integration.md) for orchestration and version matrices.

<!-- jscpd:ignore-end -->

<!-- overview:end -->

<!-- jscpd:ignore-start -->
<!-- Generated API reference repeats action and workflow metadata. -->

<!-- usage:start -->

## Usage

```yaml
- uses: hoverkraft-tech/ci-github-go/actions/setup-go@6a83ad7eda6b780f04c65007c9f48f0a7170ad01 # fix/enforce-lint-checks
  with:
    # Go module directory inside the checkout.
    # Default: `.`
    working-directory: .

    # Explicit Go version. Empty reads the go directive in this module's go.mod.
    go-version: ""

    # Download and verify module dependencies. Disable for tooling-only jobs.
    # Default: `true`
    install-dependencies: "true"
```

<!-- usage:end -->

<!-- inputs:start -->

## Inputs

| **Input**                  | **Description**                                                            | **Required** | **Default** |
| -------------------------- | -------------------------------------------------------------------------- | ------------ | ----------- |
| **`working-directory`**    | Go module directory inside the checkout.                                   | **false**    | `.`         |
| **`go-version`**           | Explicit Go version. Empty reads the go directive in this module's go.mod. | **false**    | -           |
| **`install-dependencies`** | Download and verify module dependencies. Disable for tooling-only jobs.    | **false**    | `true`      |

<!-- inputs:end -->

<!-- secrets:start -->
<!-- secrets:end -->

<!-- outputs:start -->

## Outputs

| **Output**       | **Description**       |
| ---------------- | --------------------- |
| **`go-version`** | Installed Go version. |

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
