# Get Started

This guide walks you through installing **Locio**, running your first counts, and using a few common CLI patterns.

## What's in a name?

**Locio** combines:
- **loc** → Lines Of Code (industry-standard abbreviation)
- **io** → input/output or interface/system (common tech suffix)

So **locio** ≈ "lines-of-code I/O / system" — a tool that handles the input/output of counting your code.

---

## 1. Install Locio
You can either run Locio via `npx` (**recommended**) or install it globally.

### Run with npx (no global install)

```bash
npx locio@latest
```

This will download and run the latest Locio release without adding anything permanent to your global PATH.

### Install globally with npm

```bash
npm install -g locio
```

After installation, verify it worked:

```bash
locio --help
locio --version
```

You can also use the shorter alias:

```bash
lc --help
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

Use `--include-ext` to limit the scan to certain extensions. Dots are optional (`rs` and `.rs` both work):

```bash
# Only Rust files
locio --include-ext rs --stats

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

Use structured formats to pipe results into other tools. You can either redirect output yourself or use `--export` to let Locio write the report file for you.

```bash
# JSON
locio --stats --export json             # writes locio-report.json

# CSV
locio --stats --export csv              # writes locio-report.csv

# TSV
locio --stats --export tsv              # writes locio-report.tsv
```

These files can be loaded into dashboards, spreadsheets, or analysis scripts.

---

## 7. Common workflows

### Analyze a Rust project

```bash
locio . --include-ext rs --stats
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
locio . --stats --export json    # writes locio-report.json
```

---

## Links

- **[Usage](/usage)** – Complete list of flags and options
- **[GitHub Repository](https://github.com/kiron0/locio)** – Source code, issues, and contributions

_"Locio: Count your code, not your worries."_
