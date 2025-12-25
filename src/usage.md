# CLI Usage

The **LocIO CLI** (`locio`) lets you quickly count files and lines of code in directories with powerful filters and rich statistics.

This page provides an overview of the most common commands and flags.

## Basic usage

- Installation, first run, and common workflows are covered in **[Get Started](/get-started)**.
- This page focuses on the **full list of flags and options** and how they behave.

---

## Detailed Options Reference

Below is a complete list of all LocIO CLI arguments and what they do.

### Positional Argument

- **`directory`**
  - **Type**: path (default: `.`)
  - **Description**: Root directory to scan. If omitted, LocIO scans the current working directory.
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

> If both are omitted, LocIO reports **both files and lines**.

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
  - **Description**: Exclude files with the given extensions. Dots are optional (`ts` and `.ts` are both accepted).
  - **Examples**:
    - `locio --exclude-ext log,tmp`
    - `locio --exclude-ext .png,.jpg`

- **`--include-ext <EXTENSIONS>`**
  - **Type**: comma-separated list
  - **Description**: Include **only** files with the given extensions.
  - **Examples**:
    - `locio --include-ext ts`
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
  - **Description**: Limit how deep LocIO will traverse from the root directory. `1` means only the root directory itself.
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

---

### Output and statistics

- **`--stats`**
  - **Description**: Show detailed statistics (extensions, directories, etc.) instead of just simple totals.
  - **Examples**:
    - `locio --stats`
    - `locio --include-ext ts,tsx --stats`

- **`--no-progress`**
  - **Description**: Disable progress indicator. Progress is enabled by default.
  - **Example**: `locio --no-progress`

- **`--export <FORMAT>`**
  - **Type**: `human` | `json` | `csv` | `tsv` | `markdown` | `html` (optional, defaults to `human` if omitted)
  - **Description**: Write the report to a file named `LocIO-report.{ext}` in the given format instead of only printing to stdout.
  - **Details**:
    - `--export` or `--export human` → `LocIO-report.txt`
    - `--export json` → `LocIO-report.json` (includes blank_lines in summary and by_extension stats)
    - `--export csv` → `LocIO-report.csv` (includes Blank Lines column)
    - `--export tsv` → `LocIO-report.tsv` (includes Blank Lines column)
    - `--export markdown` or `--export md` → `LocIO-report.md` (includes Blank Lines in summary and tables)
    - `--export html` → `LocIO-report.html` (includes Blank Lines card and column in statistics)
    - Multiple formats: `--export json,html,markdown` → creates all three files
  - **Note**: All export formats include blank lines in the breakdown. The formula is: **Total Lines = Code Lines + Comment Lines + Blank Lines**
  - **Examples**:
    - `locio --stats --export`
    - `locio --stats --export json`
    - `locio --stats --export json,html,markdown`

- **`--export-path <DIR>`**
  - **Type**: directory path
  - **Description**: Specify output directory for exported reports. Files will use default naming (LocIO-report.{ext}). Directories will be created automatically if they don't exist.
  - **Examples**:
    - `locio --stats --export json --export-path ./reports`
    - `locio --stats --export json,html --export-path ./output`

---

### Matching Behavior and Noise Control

- **`-i`, `--ignore-case`**
  - **Description**: Make pattern matching for include/exclude options case-insensitive.
  - **Example**: `locio --exclude ".*\\.LOG$" --ignore-case`

- **`-q`, `--quiet`**
  - **Description**: Reduce or suppress non-essential output (useful in scripts/CI).
  - **Example**: `locio --quiet --stats --export json`

---

### Comment Analysis

- **`--no-comments`**
  - **Description**: Disable comment counting. Comment analysis is enabled by default and provides breakdown of code lines, comment lines (full-line and inline), and blank lines.
  - **Example**: `locio --no-comments`

- **`--comments`** (deprecated)
  - **Description**: This flag is now the default behavior. Use `--no-comments` to disable comment analysis.
  - **Note**: Comment analysis is automatically enabled by default, showing:
    - **Code Lines**: Lines containing actual code
    - **Comment Lines**: Lines containing comments (full-line and inline)
    - **Blank Lines**: Empty lines (always included in totals)

  **Important**: Blank lines are **always included** in the total line count and shown in all output formats. The formula is: **Total Lines = Code Lines + Comment Lines + Blank Lines**

- **`--code-vs-comments`**
  - **Description**: Show code vs comments ratio. Automatically enables `--comments`.
  - **Example**: `locio --code-vs-comments`

- **`--rm-comments [EXTENSIONS]`**
  - **Type**: optional comma-separated extensions
  - **Description**: Remove comments from files (modifies files in place). Optionally specify file extensions to limit processing (e.g., `js,ts,py`). If no extensions specified, all supported files are processed.
  - **Important**:
    - This **modifies files permanently** - use with caution!
    - Certain file types are automatically ignored: `.md`, `.json`, `.yaml`, `.csv`, `.html`, `.log`, `.lock`, etc.
    - When `--rm-comments` is used, normal reporting is skipped and only comment removal messages are shown.
  - **Examples**:
    - `locio --rm-comments` (removes comments from all supported files)
    - `locio --rm-comments ts,js` (removes comments only from TypeScript and JavaScript files)
    - `locio src --rm-comments py` (removes comments from Python files in src directory)

---

### Top Files and Directories

- **`--top-files <N>`**
  - **Type**: integer
  - **Description**: Show top N largest files by size in the statistics output.
  - **Example**: `locio --stats --top-files 10`

- **`--top-dirs <N>`**
  - **Type**: integer
  - **Description**: Show top N directories with most files in the statistics output.
  - **Example**: `locio --stats --top-dirs 5`

---

### Watch Mode

- **`-w`, `--watch`**
  - **Description**: Watch directory for changes and automatically rescan when files are modified, added, or deleted. Press `Ctrl+C` to stop.
  - **Example**: `locio --watch`

---

### Version

- **`-v`, `--version`**
  - **Description**: Show version information and exit.
  - **Example**: `locio --version`

---

## Links

- **[Get Started](/get-started)** – Install LocIO and run your first counts
- **[GitHub Repository](https://github.com/kiron0/locio)** – Source code, issues, and contributions

_"LocIO: Count your code, not your worries."_
