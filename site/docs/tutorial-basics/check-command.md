---
sidebar_position: 3
---

# Learn the `check` command
Check your stack for end-of-life (EOL) statuses. Run `geol check init` to create a `.geol.yaml` and then `geol check` to view component statuses and warnings.

## Create your check `yaml` file

```shell
geol check init
```


## Example output

After `geol check`, you'll see a table listing components and their statuses, for example:

```text
Software       │ Version │ EOL Date    │ Status │   Days │ Is Latest │ Latest
───────────────┼─────────┼─────────────┼────────┼────────┼───────────┼--------
maven          │ 3.6     │ 2021-03-30  │ EOL    │ -1756  │ false     │ 3.9
quarkus        │ 3.12    │ 2024-07-31  │ EOL    │ -537   │ false     │ 3.30
traefik        │ 2.11    │ 2026-02-01  │ WARN   │ 12     │ false     │ 3.6
ubuntu         │ 25.10   │ 2026-07-01  │ OK     │ 162    │ true      │ 25.10
postgresql     │ 14      │ 2026-11-12  │ OK     │ 296    │ false     │ 18
java temurin   │ 21      │ 2029-12-31  │ OK     │ 1441   │ false     │ 25
opensearch     │ 2       │             │ OK     │ -      │ false     │ 3
```

