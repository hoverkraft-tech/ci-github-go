FROM mcr.microsoft.com/devcontainers/base:2-trixie@sha256:41ff7ce12ec45f2704f27a6e091831186ad922ec8112e6339425bfefdf5a70f9

COPY --from=golangci/golangci-lint:v2.15.0@sha256:fbfcfd12a6f8d7f1b97b3362ca80fc2a244d46863148c73cb88e7793af96c481 /usr/bin/golangci-lint /usr/local/bin/golangci-lint

HEALTHCHECK --interval=5m --timeout=10s --start-period=30s --retries=3 CMD ["golangci-lint", "version"]
USER vscode
