---
sidebar_position: 1
---

# `asciidoc` Toolchain

AsciiDoc lets you write human-readable documentation and convert it to HTML, PDF, or slides using tools like Asciidoctor.
Here are two common commands to convert an AsciiDoc report to HTML (with a table of contents) and to PDF:

```bash
asciidoctor -a toc -a toclevels=4 geol-report.adoc  # convert geol-report.adoc to HTML with a table of contents
asciidoctor-pdf -a toc -a toclevels=4 geol-report.adoc  # convert geol-report.adoc to PDF
```