<!-- header:start -->

# GitHub Reusable Workflow: Build Go release archives

<div align="center">
  <img src="../logo.svg" width="60px" align="center" alt="Build Go release archives" />
</div>

---

<!-- header:end -->
<!-- overview:start -->

## Overview

Package Go binaries with the caller's GoReleaser v2 configuration, without publishing.

Call after the project's required checks. Empty tag builds snapshot archives for CI;
a planned semantic-version tag builds release archives at the current caller commit.
Existing tags must resolve to that commit. Only a local tag is created, using read
permissions. Source tags, releases and registries are never written by this workflow.

Keep platform targets, archives and checksums in the project's .goreleaser.yml.
artifact-paths selects the exact files handed to release.yml; include the checksums.
Paths are relative to working-directory. Custom paths are trusted caller configuration.
The immutable artifact ID belongs to this run and commit, is bound to the planned
tag, and is retained seven days. A failed build returns no successful artifact ID.
Snapshot artifacts cannot be published through release.yml.

Use the same working-directory in preparation, validation and publication. See
[release](release.md) for the artifact handoff. Pin callers to a reviewed commit SHA.

### Permissions

- **`contents`**: `read`

<!-- overview:end -->
<!-- usage:start -->

## Usage

```yaml
name: Build Go release archives
on:
  push:
    branches:
      - main
permissions: {}
jobs:
  build-release:
    uses: hoverkraft-tech/ci-github-go/.github/workflows/build-release.yml@2db38ba3c9d23770c04b71866551231470cd2994 # feat/reusable-go-release-workflows
    permissions:
      contents: read
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

      # Files to retain relative to working-directory, one glob per line. Include release archives and checksums only.
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

### Workflow Call Inputs

| **Input**                | **Description**                                                                                                | **Required** | **Type**   | **Default**                                                                                                                   |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- | ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **`working-directory`**  | Go project containing the GoReleaser v2 configuration.                                                         | **false**    | **string** | `.`                                                                                                                           |
| **`go-version`**         | Go version for packaging; empty uses project detection.                                                        | **false**    | **string** | -                                                                                                                             |
| **`tag`**                | Planned semantic-version tag, optionally prefixed with v. Empty builds snapshots.                              | **false**    | **string** | -                                                                                                                             |
| **`goreleaser-version`** | GoReleaser v2 version constraint.                                                                              | **false**    | **string** | `~&gt; v2`                                                                                                                    |
| **`artifact-paths`**     | Files to retain relative to working-directory, one glob per line. Include release archives and checksums only. | **false**    | **string** | <!-- textlint-disable --><pre lang="text">dist/\*.tar.gz&#13;dist/\*.zip&#13;dist/checksums.txt</pre><!-- textlint-enable --> |

<!-- inputs:end -->
<!-- outputs:start -->

## Outputs

| **Output**        | **Description**                                                           |
| ----------------- | ------------------------------------------------------------------------- |
| **`artifact-id`** | Immutable artifact ID of the packaged archives and checksums in this run. |

<!-- outputs:end -->
