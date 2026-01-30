---
sidebar_position: 3
---

# Learn the `check` command
Quickly check your stack for end-of-life (EOL) statuses.

## Initialize a check file

Run the command to create a template `.geol.yaml` in the current directory:

```shell
geol check init
```

Edit the generated `.geol.yaml` to list the products you want to monitor.

Minimal example `.geol.yaml` (created by `geol check init`):

```yaml
stack:
  - name: Go
    version: "1.25"
    id_eol: go
```

## Statuses and warnings

Run the check to view statuses and warnings:

```shell
geol check

# Example output (what `geol check` prints):
# Software       │ Version │ EOL Date    │ Status │   Days │ Is Latest │ Latest
# ───────────────┼─────────┼─────────────┼────────┼────────┼───────────┼--------
# maven          │ 3.6     │ 2021-03-30  │ EOL    │ -1756  │ false     │ 3.9
# quarkus        │ 3.12    │ 2024-07-31  │ EOL    │ -537   │ false     │ 3.30
# traefik        │ 2.11    │ 2026-02-01  │ WARN   │ 12     │ false     │ 3.6
# ubuntu         │ 25.10   │ 2026-07-01  │ OK     │ 162    │ true      │ 25.10
# postgresql     │ 14      │ 2026-11-12  │ OK     │ 296    │ false     │ 18
# java temurin   │ 21      │ 2029-12-31  │ OK     │ 1441   │ false     │ 25
# opensearch     │ 2       │             │ OK     │ -      │ false     │ 3
```

> **Legend** — fields shown in the example output
>
> **Output fields**
> - Software: product name (e.g. `ubuntu`).
> - Version: the reported or configured version.
> - EOL Date: known end-of-life date (empty if unknown).
> - Status: `OK`, `WARN`, `EOL`, or `UNKNOWN`.
> - Days: days until EOL (positive) or since EOL (negative); `-` if unknown.
> - Is Latest: whether this version is the latest known release.
> - Latest: the latest known version for the product.
>
> **Status meanings**
> - OK — supported and not close to EOL.
> - WARN — approaching EOL (less than 30 days).
> - EOL — past its end-of-life date; update recommended.
> - UNKNOWN — no EOL date available for this version.