<!-- header:start -->

# GitHub Reusable Workflow: Publish Go release

<div align="center">
  <img src="../logo.svg" width="60px" align="center" alt="Publish Go release" />
</div>

---

<!-- header:end -->
<!-- overview:start -->

## Overview

Publish the exact Go archives retained by continuous-integration.yml after successful validation.

Call prepare-package-release.yml first. Continue only when its status is ready.
Enable packaging in continuous-integration.yml with the prepared tag, then pass
package-artifact-id and that tag here. Use the same release-config throughout.
Preparation handles no-change runs and already-published releases. A manual tag
retry verifies the existing tag before packaging. Source tags are never overwritten.

Publication verifies the artifact run, commit, tag and availability before creating
a release. It does not rebuild. Grant actions read, contents write and pull-requests
read to the calling job, and require successful validation through needs.
Pull request publication is rejected. Optional environment protection applies to
publication. No repository bot credentials are needed.

changelog-summary accepts the complete ci-github-publish JSON configuration;
use the secret for credentials. Empty disables summarization. Publication-only
reruns reuse the same artifact ID; expired or deleted artifacts fail. A full rerun
produces a new ID. The shared release action owns release notes and asset recovery.

### Permissions

- **`actions`**: `read`
- **`contents`**: `write`
- **`pull-requests`**: `read`

<!-- overview:end -->
<!-- usage:start -->

## Usage

```yaml
name: Publish Go release
on:
  push:
    branches:
      - main
permissions: {}
jobs:
  release:
    uses: hoverkraft-tech/ci-github-go/.github/workflows/release.yml@86f7d46b31948da93b2bcf78478e3180b908a6b6 # feat/reusable-go-release-workflows
    permissions:
      actions: read
      contents: write
      pull-requests: read
    secrets:
      # Optional complete JSON summary configuration including credentials. Overrides the input.
      changelog-summary: ""
    with:
      # Prepared semantic-version tag used for packaging.
      # This input is required.
      tag: ""

      # Immutable package-artifact-id from continuous-integration.yml in this run and commit. The caller must require successful validation.
      # This input is required.
      artifact-id: ""

      # Project directory matching preparation and packaging.
      # Default: `.`
      working-directory: .

      # Partial YAML or JSON release configuration forwarded unchanged to ci-github-publish/actions/release/create. Use the same configuration when planning.
      release-config: ""

      # Optional complete JSON summary configuration. Use the secret when it contains credentials; a nonempty secret overrides this input.
      changelog-summary: ""

      # Optional GitHub environment protecting publication.
      environment: ""
```

<!-- usage:end -->
<!-- inputs:start -->

## Inputs

### Workflow Call Inputs

| **Input**               | **Description**                                                                                                                                       | **Required** | **Type**   | **Default** |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ---------- | ----------- |
| **`tag`**               | Prepared semantic-version tag used for packaging.                                                                                                     | **true**     | **string** | -           |
| **`artifact-id`**       | Immutable package-artifact-id from continuous-integration.yml in this run and commit. The caller must require successful validation.                  | **true**     | **string** | -           |
| **`working-directory`** | Project directory matching preparation and packaging.                                                                                                 | **false**    | **string** | `.`         |
| **`release-config`**    | Partial YAML or JSON release configuration forwarded unchanged to ci-github-publish/actions/release/create. Use the same configuration when planning. | **false**    | **string** | -           |
| **`changelog-summary`** | Optional complete JSON summary configuration. Use the secret when it contains credentials; a nonempty secret overrides this input.                    | **false**    | **string** | -           |
| **`environment`**       | Optional GitHub environment protecting publication.                                                                                                   | **false**    | **string** | -           |

<!-- inputs:end -->
<!-- outputs:start -->
<!-- outputs:end -->
