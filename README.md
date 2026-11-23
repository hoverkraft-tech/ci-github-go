# CI GitHub Go

<img src=".github/logo.svg" width="120" alt="CI GitHub Go logo" />

Opinionated GitHub Actions and reusable workflows for Go projects,
following the conventions of [ci-github-nodejs](https://github.com/hoverkraft-tech/ci-github-nodejs)
and [ci-github-php](https://github.com/hoverkraft-tech/ci-github-php).

## Prerequisites

A Go module with committed `go.mod` and `go.sum` when dependencies require it.
The default tests need a Linux runner with CGO and a C compiler.
Use GitHub.com and a Linux Actions runner supporting Node.js 24 actions and
same-repository `$/` references.

## Quick start

```yaml
name: CI
on: [push, pull_request]
permissions: {}
jobs:
  go:
    uses: hoverkraft-tech/ci-github-go/.github/workflows/continuous-integration.yml@main
    permissions:
      contents: read
      id-token: write
```

The workflow detects the project's runtime. Pin the workflow to a reviewed
commit SHA in production. The reusable workflow declares OIDC permission for
optional Codecov uploads, so callers must grant `id-token: write`; standalone
actions with GitHub reporting require only `contents: read`.

## Actions

| Action                                 | Purpose                                      |
| -------------------------------------- | -------------------------------------------- |
| [setup-go](actions/setup-go/README.md) | Install the project runtime and dependencies |
| [lint](actions/lint/README.md)         | Check style and static analysis              |
| [test](actions/test/README.md)         | Run tests and retain native reports          |
| [audit](actions/audit/README.md)       | Check dependency vulnerabilities             |
| [build](actions/build/README.md)       | Compile packages or project binaries         |

## Documentation

- [Workflow reference](.github/workflows/continuous-integration.md)
- [Contributing](CONTRIBUTING.md)
- [Documentation index](docs/README.md)

## License

[MIT](LICENSE)
