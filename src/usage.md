# CLI Usage

The **Locio CLI** (`locio` or `lc`) lets you quickly count files and lines of code in directories with powerful filters and rich statistics.

This page provides an overview of the most common commands and flags.

## Basic usage

- Installation, first run, and common workflows are covered in **[Get Started](/get-started)**.
- This page focuses on the **full list of flags and options** and how they behave.

---

## Detailed Options Reference

Below is a complete list of all Locio CLI arguments and what they do.

### Positional Argument

- **`directory`**
  - **Type**: path (default: `.`)
  - **Description**: Root directory to scan. If omitted, Locio scans the current working directory.
  - **Examples**:
    - `locio` (current directory)
    - `locio ./src`
    - `locio /path/to/project`

---

### Mode Flags

- **`-f`, `--files-only`**
  - **Description**: Count only files, ignoring line counts.
  - **Use when**: You just need file counts per directory/extension.
  - **Example**: `locio --files-only`

- **`-l`, `--lines-only`**
  - **Description**: Count only lines, ignoring file counts.
  - **Use when**: You only care about total lines of code.
  - **Example**: `locio --lines-only`

> If both are omitted, Locio reports **both files and lines**.

---

### Include / Exclude by Pattern, Extension, Directory, Name

- **`-e`, `--exclude <PATTERN>`**
  - **Type**: repeatable (regex)
  - **Description**: Exclude files whose **full path** matches the given regular expression.
  - **Examples**:
    - `locio --exclude ".*\\.log$"`
    - `locio --exclude ".*\\.test\\.(js|ts)$"`

- **`--exclude-ext <EXTENSIONS>`**
  - **Type**: comma-separated list
  - **Description**: Exclude files with the given extensions. Dots are optional (`rs` and `.rs` are both accepted).
  - **Examples**:
    - `locio --exclude-ext log,tmp`
    - `locio --exclude-ext .png,.jpg`

- **`--include-ext <EXTENSIONS>`**
  - **Type**: comma-separated list
  - **Description**: Include **only** files with the given extensions.
  - **Examples**:
    - `locio --include-ext rs`
    - `locio --include-ext ts,tsx,js`

- **`--exclude-dir <PATTERN>`**
  - **Type**: repeatable (regex)
  - **Description**: Exclude directories whose path matches the regular expression (e.g. `node_modules`, `dist`).
  - **Examples**:
    - `locio --exclude-dir node_modules`
    - `locio --exclude-dir dist --exclude-dir build`

- **`--include-dir <PATTERN>`**
  - **Type**: repeatable (regex)
  - **Description**: Only scan directories whose path matches the regular expression. All other directories are skipped.
  - **Examples**:
    - `locio --include-dir src`
    - `locio --include-dir packages/core`

- **`--exclude-name <PATTERN>`**
  - **Type**: repeatable (regex)
  - **Description**: Exclude files by **file name** regular expression (not full path). Useful for things like `README`, `LICENSE`, etc.
  - **Examples**:
    - `locio --exclude-name README.md`
    - `locio --exclude-name "*.spec.ts"`

- **`--include-name <PATTERN>`**
  - **Type**: repeatable (regex)
  - **Description**: Only include files whose **name** matches the regular expression.
  - **Examples**:
    - `locio --include-name "*.ts"`
    - `locio --include-name "index.*"`

---

### Size and Depth Control

- **`--max-size <SIZE>`**
  - **Type**: single value
  - **Description**: Skip files larger than the given size.
  - **Examples**:
    - `locio --max-size 5MB`
    - `locio --max-size 100K`

- **`--min-size <SIZE>`**
  - **Type**: single value
  - **Description**: Skip files smaller than the given size.
  - **Examples**:
    - `locio --min-size 1K`
    - `locio --min-size 10KB`

- **`--max-depth <DEPTH>`**
  - **Type**: integer
  - **Description**: Limit how deep Locio will traverse from the root directory. `1` means only the root directory itself.
  - **Examples**:
    - `locio --max-depth 1`
    - `locio --max-depth 3`

---

### Hidden, Empty, Binary, and Symlinks

- **`--no-hidden`**
  - **Description**: Exclude hidden files and directories (e.g. `.git`, `.env`).
  - **Example**: `locio --no-hidden`

- **`--no-empty`**
  - **Description**: Exclude empty files from counts.
  - **Example**: `locio --no-empty`

- **`--follow-links`**
  - **Description**: Follow symbolic links when traversing directories.
  - **Example**: `locio --follow-links`

- **`--no-binary`**
  - **Description**: Skip files detected as binary (e.g. images, compiled artifacts).
  - **Example**: `locio --no-binary`

- **`--include-blank`**
  - **Description**: Count blank/empty lines as part of the total line count.
  - **Example**: `locio --include-blank`

---

### Output and statistics

- **`--stats`**
  - **Description**: Show detailed statistics (extensions, directories, etc.) instead of just simple totals.
  - **Examples**:
    - `locio --stats`
    - `locio --include-ext rs,ts --stats`

- **`-p`, `--progress`**
  - **Description**: Show progress information while scanning (useful for large projects).
  - **Example**: `locio --progress`

- **`--export <FORMAT>`**
  - **Type**: `human` | `json` | `csv` | `tsv` (optional, defaults to `human` if omitted)
  - **Description**: Write the report to a file named `locio-report.{ext}` in the given format instead of only printing to stdout.
  - **Details**:
    - `--export` or `--export human` → `locio-report.txt`
    - `--export json` → `locio-report.json`
    - `--export csv` → `locio-report.csv`
    - `--export tsv` → `locio-report.tsv`
  - **Examples**:
    - `locio --stats --export`
    - `locio --stats --export json`

---

### Matching Behavior and Noise Control

- **`-i`, `--ignore-case`**
  - **Description**: Make pattern matching for include/exclude options case-insensitive.
  - **Example**: `locio --exclude ".*\\.LOG$" --ignore-case`

- **`-q`, `--quiet`**
  - **Description**: Reduce or suppress non-essential output (useful in scripts/CI).
  - **Example**: `locio --quiet --stats --export json`

---

### Version

- **`-v`, `--version`**
  - **Description**: Show version information and exit.
  - **Example**: `locio --version`

---

## Links

- **[Get Started](/get-started)** – Install Locio and run your first counts
- **[GitHub Repository](https://github.com/kiron0/locio)** – Source code, issues, and contributions

_"Locio: Count your code, not your worries."_
