# Get Started

This guide walks you through installing **LocIO**, running your first counts, and using a few common CLI patterns.

## What's in a name?

**LocIO** combines:
- **Loc** → Lines Of Code (industry-standard abbreviation)
- **IO** → input/output or interface/system (common tech suffix)

So **LocIO** ≈ "lines-of-code I/O / system" — a tool that handles the input/output of counting your code.

---

## 1. Install LocIO
You can either run LocIO via `npx` (**recommended**) or install it globally.

### Run with npx (no global install)

```bash
npx locio@latest
```

This will download and run the latest LocIO release without adding anything permanent to your global PATH.

### Install globally with npm

```bash
npm install -g locio
```

After installation, verify it worked:

```bash
locio --help
locio --version
```

---

## 2. Your first count

From any project directory, run:

```bash
locio
```

This:

- Scans the **current directory** recursively
- Shows an **interactive home page** when run without arguments
- Lets you explore basic stats quickly

To analyze a specific directory:

```bash
locio /path/to/directory
```

---

## 3. Focus on specific file types

Use `--include-ext` to limit the scan to certain extensions. Dots are optional (`ts` and `.ts` both work):

```bash
# Only TypeScript files
locio --include-ext ts --stats

# TypeScript and JavaScript
locio --include-ext ts,tsx,js --stats
```

You can combine this with `--stats` to get a detailed breakdown by extension and directory.

---

## 4. Exclude noise (logs, dependencies, etc.)

For real projects, you usually want to exclude logs and dependency folders:

```bash
locio . \
  --exclude ".*\\.log$" \
  --exclude-dir node_modules \
  --stats
```

- `--exclude` filters by **full file path** using a regular expression
- `--exclude-dir` skips entire **directories** whose path matches the pattern

---

## 5. Control file size and binary files

Skip large or binary files to keep counts meaningful:

```bash
locio --max-size 5MB --no-binary --stats
```

This:

- Ignores files larger than **5MB**
- Skips **binary files** (when `--no-binary` is used)

---

## 6. Export results

Use structured formats to pipe results into other tools. You can either redirect output yourself or use `--export` to let LocIO write the report file for you.

```bash
# JSON
locio --stats --export json             # writes LocIO-report.json

# CSV
locio --stats --export csv              # writes LocIO-report.csv

# TSV
locio --stats --export tsv              # writes LocIO-report.tsv

# Markdown
locio --stats --export markdown         # writes LocIO-report.md

# HTML
locio --stats --export html             # writes LocIO-report.html

# Multiple formats at once
locio --stats --export json,html,markdown

# Custom output directory
locio --stats --export json --export-path ./reports
```

These files can be loaded into dashboards, spreadsheets, or analysis scripts.

---

## 7. Common workflows

### Analyze a TypeScript project

```bash
locio . --include-ext ts --stats
```

### Analyze a TypeScript/JavaScript monorepo

```bash
locio . \
  --include-ext ts,tsx,js \
  --exclude-dir node_modules,dist,build \
  --stats
```

### Generate a JSON report for CI

```bash
locio . --stats --export json    # writes LocIO-report.json
```

### Analyze comments in your codebase

```bash
# Count comments separately (automatically enabled when using --stats)
locio . --stats

# Show code vs comments ratio
locio . --code-vs-comments --stats
```

### Remove comments from code files

```bash
# Remove comments from all supported files
locio . --rm-comments

# Remove comments only from TypeScript files
locio . --rm-comments ts

# Remove comments from multiple file types
locio . --rm-comments js,ts,py
```

**Note**: The `--rm-comments` flag automatically ignores documentation and config files (`.md`, `.json`, `.yaml`, `.csv`, `.html`, etc.) to prevent accidental modification.

### Watch for changes

```bash
# Automatically rescan when files change
locio . --watch
```

---

## Links

- **[Usage](/usage)** – Complete list of flags and options
- **[GitHub Repository](https://github.com/kiron0/locio)** – Source code, issues, and contributions

_"LocIO: Count your code, not your worries."_
