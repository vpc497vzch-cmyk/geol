---
sidebar_position: 1
---

# Know `endoflife.date` keys

There are a lot of keys used by endoflife.date; they map products to metadata such as versions, release dates and end-of-life dates.

## Products

A product is an item managed by geol (for example: Windows, Ubuntu).
```shell
geol list products
```
To display all available commands for a product, run:
```shell
geol help product
```
To choose how many versions to show, use `extended` and the `-n` flag. For example:
```shell
geol product extended name -n20
```
which displays the last 20 versions.

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