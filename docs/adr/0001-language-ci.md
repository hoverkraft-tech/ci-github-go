# 0001: Go CI tooling and repository boundaries

Status: Accepted
Date: 2026-11-23

## Context

Create a distinct sibling of ci-github-nodejs and ci-github-php, preserving
standalone actions, reusable CI, common reports, generated references and shared
repository maintenance. Language-specific package managers require different
installation and packaging behavior.

## Decision

Use official setup-go, Go modules, golangci-lint v2, gotestsum and govulncheck.
Keep native coverage instead of adding an unmaintained format converter.
Each invocation validates one module with workspace mode disabled. This
makes module boundaries and runtime matrices explicit.

Use `$/` for same-commit action/workflow references. Default to no PR comment
writes and retain reports after failures. Keep package publication out of this
initial CI scope: Go module tags and Python registry uploads require distinct
consumer release policies. The repository itself uses the existing shared
Actions release automation.

## Alternatives and consequences

A single repository for both languages would couple their releases and break the
requested sibling structure. Broad package-manager auto-detection would add
untested branches; this repository instead has one documented default toolchain
and explicit command overrides. Linux-only execution keeps Bash and consumer
venv behavior predictable. Users needing other platforms can compose their own
workflows around native ecosystem actions.

Version matrices, lockfile checks, report retention and consumer installation
need distinct tests. Local boundary tests provide fast feedback; actual artifact
transport remains a GitHub integration check. Tool pins live in manifests and
lockfiles and are maintained automatically, not copied into this decision record.

## Supporting sources

Reviewed on the decision date; these links explain the decision, not current
validation results.

- [Go module metadata and tidy](https://go.dev/ref/mod)
- [Official Go setup action](https://github.com/actions/setup-go)
- [golangci-lint action](https://github.com/golangci/golangci-lint-action)
- [gotestsum](https://github.com/gotestyourself/gotestsum)
- [govulncheck](https://pkg.go.dev/golang.org/x/vuln/cmd/govulncheck)
- [GitHub workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)
