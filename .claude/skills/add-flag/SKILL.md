---
name: add-flag
description: Add a new feature flag to flags.json via a series of prompts (key, title, description), then lint the file. Use when the user asks to add/create a new flag in this repo.
---

# Add a flag

Walk the user through adding a new entry to `flags.json`, then validate the file.

## Steps

1. **Ask for the flag key.** Use `AskUserQuestion` (or a plain question if that tool
   isn't available) to get a short kebab-case name describing what the flag toggles,
   e.g. `payment-settings-v2`.
   - If the user's answer already starts with `enable-`, use it as-is.
   - Otherwise prefix it with `enable-`.
   - Normalize to kebab-case (lowercase, spaces/underscores → hyphens). Reject
     anything that doesn't match `^[a-z0-9]+(-[a-z0-9]+)*$` after normalization
     and re-ask.
   - Check the key doesn't already exist in `flags.json`. If it does, tell the
     user and ask for a different name.

2. **Ask for the title.** A short human-readable name for the flag (e.g. "Enable
   Payment Settings V2"). Suggest a title-cased version of the key as a default.

3. **Ask for the description.** What the flag does, when it should be used, and
   any fallback behavior when disabled. This should be specific enough that
   someone unfamiliar with the change understands the effect of toggling it —
   see `README.md` for the convention.

4. **Append the new entry to `flags.json`.** Read the file, add the new key at
   the end (after the last existing key, preserving existing order and
   4-space indentation), and write it back. Do not reorder or reformat
   existing entries.

5. **Run the lint script:**

   ```
   node scripts/lint-flags.js
   ```

   If it fails, fix the issue (most likely in the newly added entry) and
   re-run until it passes. Report the result to the user.

6. Show the user the diff (`git diff flags.json`) and stop — do not commit or
   push unless the user separately asks for that.
