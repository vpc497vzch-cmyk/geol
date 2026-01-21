---
sidebar_position: 1
---

# Tutorial Intro

Let's discover **geol in less than 5 minutes**.

## Getting Started

Get started by **installing with <code>brew</code>**.

Note: Homebrew often provides more up-to-date packages than other sources, so installing via `brew` will typically give you a newer version.

Or try immediately with docker or Killercoda playground : eol 

- ...
- ...

### What you'll need

- <code>brew</code> installed on your machine. See the official <a href="https://brew.sh/" target="_blank" rel="noreferrer noopener">Homebrew website</a> for installation instructions.

```bash
brew install --cask opt-nc/homebrew-tap/geol
```
Note: If the `brew` installation fails, it may be because Homebrew's `curl` is not installed and your system is using the distribution `curl` (apt).

Or install with:

```bash
# Go
go install github.com/opt-nc/geol@latest

# Shell script
curl -fsSL https://raw.githubusercontent.com/opt-nc/geol/main/install.sh | bash
```

You can type this command into Command Prompt, Terminal, or any other integrated terminal of your code editor.

## Get `geol` version

```bash
geol version
```

## Know a bit more about `geol`

```bash
geol about
```

## Get help

To get help, run:

```bash
geol help    #help either
man geol     #man page
```

## Update

```shell
brew update && brew upgrade --cask geol version
```