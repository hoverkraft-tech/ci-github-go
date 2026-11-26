<!-- header:start -->

# ![Icon](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItcGFja2FnZSIgY29sb3I9ImJsdWUiPjxsaW5lIHgxPSIxNi41IiB5MT0iOS40IiB4Mj0iNy41IiB5Mj0iNC4yMSI+PC9saW5lPjxwYXRoIGQ9Ik0yMSAxNlY4YTIgMiAwIDAgMC0xLTEuNzNsLTctNGEyIDIgMCAwIDAtMiAwbC03IDRBMiAyIDAgMCAwIDMgOHY4YTIgMiAwIDAgMCAxIDEuNzNsNyA0YTIgMiAwIDAgMCAyIDBsNy00QTIgMiAwIDAgMCAyMSAxNnoiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPSIzLjI3IDYuOTYgMTIgMTIuMDEgMjAuNzMgNi45NiI+PC9wb2x5bGluZT48bGluZSB4MT0iMTIiIHkxPSIyMi4wOCIgeDI9IjEyIiB5Mj0iMTIiPjwvbGluZT48L3N2Zz4=) GitHub Action: Go - Package

<div align="center">
  <img src="../../.github/logo.svg" width="60px" align="center" alt="Go - Package" />
</div>

---

<!-- header:end -->
<!-- overview:start -->

## Overview

Package GoReleaser archives and checksums without publishing.

Package Go binaries using the project GoReleaser v2 configuration without publishing.
Check out the full Git history before calling this action. An empty tag produces
snapshot archives; a planned tag packages the current commit and rejects tag conflicts.
Only a local tag is created. The uploaded archives and checksums retain their run,
commit and tag identity for release.yml. Call after all required validation.
Requires a Linux runner with a supported Go toolchain. See the
[release workflow](../../.github/workflows/release.md) for the complete release flow.

<!-- overview:end -->
<!-- usage:start -->

## Usage

```yaml
- uses: hoverkraft-tech/ci-github-go/actions/package@86f7d46b31948da93b2bcf78478e3180b908a6b6 # feat/reusable-go-release-workflows
  with:
    # Go project containing the GoReleaser v2 configuration.
    # Default: `.`
    working-directory: .

    # Go version for packaging; empty uses project detection.
    go-version: ""

    # Planned semantic-version tag, optionally prefixed with v. Empty builds snapshots.
    tag: ""

    # GoReleaser v2 version constraint.
    # Default: `~> v2`
    goreleaser-version: ~> v2

    # Archive and checksum globs relative to working-directory, one per line.
    # Default: `dist/*.tar.gz
    # dist/*.zip
    # dist/checksums.txt
    # `
    artifact-paths: |
      dist/*.tar.gz
      dist/*.zip
      dist/checksums.txt
```

<!-- usage:end -->
<!-- inputs:start -->

## Inputs

| **Input**                | **Description**                                                                   | **Required** | **Default**                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| **`working-directory`**  | Go project containing the GoReleaser v2 configuration.                            | **false**    | `.`                                                                                                                           |
| **`go-version`**         | Go version for packaging; empty uses project detection.                           | **false**    | -                                                                                                                             |
| **`tag`**                | Planned semantic-version tag, optionally prefixed with v. Empty builds snapshots. | **false**    | -                                                                                                                             |
| **`goreleaser-version`** | GoReleaser v2 version constraint.                                                 | **false**    | `~&gt; v2`                                                                                                                    |
| **`artifact-paths`**     | Archive and checksum globs relative to working-directory, one per line.           | **false**    | <!-- textlint-disable --><pre lang="text">dist/\*.tar.gz&#13;dist/\*.zip&#13;dist/checksums.txt</pre><!-- textlint-enable --> |

<!-- inputs:end -->
<!-- outputs:start -->

## Outputs

| **Output**        | **Description**                                                                   |
| ----------------- | --------------------------------------------------------------------------------- |
| **`artifact-id`** | Immutable artifact ID containing archives and checksums from this run and commit. |

<!-- outputs:end -->
