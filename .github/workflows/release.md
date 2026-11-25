<!-- header:start -->

# GitHub Reusable Workflow: Publish Go release

<div align="center">
  <img src="../logo.svg" width="60px" align="center" alt="Publish Go release" />
</div>

---

<!-- header:end -->
<!-- overview:start -->

## Overview

Publish the exact Go archives retained by build-release.yml after successful validation.

Plan the tag with ci-github-publish/actions/release/plan, skip unchanged releases,
and pass that tag to build-release.yml after all required CI checks. Then call this
workflow with its artifact-id and the same tag and release-config. Publication
verifies the artifact's run, commit, tag and availability before creating a release.
No checkout, compilation or GoReleaser execution happens during publication.

Grant actions read, contents write and pull-requests read to the calling job.
Use only trusted release triggers and require successful validation through needs.
Pull request events are rejected. Optional environment protection applies only
to the publication job. No repository bot credentials are needed.

changelog-summary accepts the complete ci-github-publish JSON configuration;
use the secret for credentials. An empty value disables summarization.
Publication-only reruns reuse the same artifact ID; expired/deleted artifacts fail.
Full reruns produce a new ID. The shared release action owns release creation,
summary failures and asset recovery. Pin callers to a reviewed commit SHA.

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
    uses: hoverkraft-tech/ci-github-go/.github/workflows/release.yml@2db38ba3c9d23770c04b71866551231470cd2994 # feat/reusable-go-release-workflows
    permissions:
      actions: read
      contents: write
      pull-requests: read
    secrets:
      # Optional complete JSON summary configuration including credentials. Overrides the input.
      changelog-summary: ""
    with:
      # Planned semantic-version tag used by build-release.yml.
      # This input is required.
      tag: ""

      # Immutable build-release.yml artifact ID from this run and commit. The caller must require successful validation.
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
| **`tag`**               | Planned semantic-version tag used by build-release.yml.                                                                                               | **true**     | **string** | -           |
| **`artifact-id`**       | Immutable build-release.yml artifact ID from this run and commit. The caller must require successful validation.                                      | **true**     | **string** | -           |
| **`working-directory`** | Project directory matching preparation and packaging.                                                                                                 | **false**    | **string** | `.`         |
| **`release-config`**    | Partial YAML or JSON release configuration forwarded unchanged to ci-github-publish/actions/release/create. Use the same configuration when planning. | **false**    | **string** | -           |
| **`changelog-summary`** | Optional complete JSON summary configuration. Use the secret when it contains credentials; a nonempty secret overrides this input.                    | **false**    | **string** | -           |
| **`environment`**       | Optional GitHub environment protecting publication.                                                                                                   | **false**    | **string** | -           |

<!-- inputs:end -->
<!-- outputs:start -->
<!-- outputs:end -->
