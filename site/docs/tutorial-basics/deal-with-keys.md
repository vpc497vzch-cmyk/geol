---
sidebar_position: 1
---

# Know `endoflife.date` keys with geol

There are a lot of keys used by endoflife.date; they map products to metadata such as versions, release dates and end-of-life dates.

## Products

A product is defined by the endoflife.date API; `geol` uses that API and does not define products itself (for example: Windows, Ubuntu, iPhone...).

```shell
geol list products    # lists available products
geol help product     # show commands for a specific product
```
To choose how many release cycles to display, use `extended` with the `-n` flag. For example:
```shell
geol product extended <product-name> -n20
```
This shows the most recent 20 release cycles (each with its release date), always listing the latest version for each cycle first.

## Categories

A category groups related products (for example: libraries, runtimes).
```shell
geol list categories
```

## Tags

A tag is a short keyword used to label and filter products.
```shell
geol list tags
```