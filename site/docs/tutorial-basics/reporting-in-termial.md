---
sidebar_position: 2
---

# Reporting products with `geol`

`geol` fetches metadata for each product (versions, release dates, and end-of-life dates) and lets you generate summaries, version lists, or exportable reports.

## Get a product overview

Common commands:

```shell
geol product describe <product-name>   # detailed summary for a product
geol export                            # exports products info into a DuckDB database
```