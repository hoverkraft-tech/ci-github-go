# ADR 0002: Separate consumer packaging from publication

- Status: Accepted
- Date: 2026-11-25

## Context

next-ip needs the same GoReleaser packaging in PR validation and releases. Its
release job must publish the validated archives without rebuilding them with a
write token. The existing build action checks compilation but does not package
platform archives or manage planned release versions.

## Decision

Provide `build-release.yml` for read-only packaging and `release.yml` for
publication. Consumers retain their release planning, no-change gates and required
validation in their own workflow. GoReleaser owns project targets and archive layout;
ci-github-publish owns release configuration, notes, assets and optional summaries.

A unique artifact ID carries archives and checksums between jobs. Before publication,
verify its run, source commit, planned tag and expiry. Snapshot artifacts cannot be
published. Existing local tags must resolve to the source commit; never move them.
Only the publication job receives write permissions and optional environment approval.

## Consequences

Consumers can validate snapshots without publishing and retry publication with the
same retained artifact. Deleted or expired artifacts require packaging again.
Required application checks remain the caller's responsibility, expressed by `needs`.
No consumer-specific credentials or registry policy enter the public workflow.
