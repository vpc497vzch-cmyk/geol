---
sidebar_position: 1
---

# Tutorial Intro

Let's discover **geol in less than 5 minutes**.

## Getting Started

Get started by **installing with <code>brew</code>**.

Note: Homebrew often provides more up-to-date packages than other sources, so installing via `brew` will typically give you a newer version.

 

### What you'll need

- <code>brew</code> installed on your machine. See the official <a href="https://brew.sh/" target="_blank" rel="noreferrer noopener">Homebrew website</a> for installation instructions.

```bash
brew install --cask opt-nc/homebrew-tap/geol
```
Note: If the `brew` installation fails, it may be because Homebrew's `curl` is not installed and your system is using the distribution `curl` (apt).

```bash
➜  ~ brew install --cask opt-nc/homebrew-tap/geol    # attempts to install the 'geol' cask via Homebrew
# Output (example error):
Error: Download failed on Cask 'geol' with message: Download failed:
Homebrew-installed `curl` is not installed
for: https://github.com/opt-nc/geol/releases/download/v0.3.0/geol_Linux_x86_64.tar.gz  # the archive couldn't be downloaded because the expected Homebrew-provided curl is missing

# Suggested solution: install curl via Homebrew, then retry
brew install curl    # install 'curl' via Homebrew
brew install --cask opt-nc/homebrew-tap/geol    # retry installing the 'geol' cask
```


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

If your installed `geol` version is out of date, you can update it (Homebrew) with:

```bash
# Update Homebrew and upgrade the geol cask
brew update && brew upgrade --cask geol    
```

## Know a bit more about `geol`

```bash
geol about
```

## Get help

```bash
geol help
man geol
```

