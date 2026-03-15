---
name: lenshub-upgrade
version: 1.0.0
description: |
  Upgrade lenshub to the latest version. Pulls from the remote repo,
  regenerates all SKILL.md files, and shows what's new.
allowed-tools:
  - Bash
  - Read
  - AskUserQuestion
---
<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

# /lenshub-upgrade

Upgrade lenshub to the latest version and show what's new.

## Inline upgrade flow

This section is referenced by lenshub skill preambles when they detect `UPGRADE_AVAILABLE`.

### Step 1: Ask the user (or auto-upgrade)

First, check if auto-upgrade is enabled:
```bash
_AUTO_FILE="${HOME}/.lenshub/auto-upgrade"
_AUTO=""
[ "${LENSHUB_AUTO_UPGRADE:-}" = "1" ] && _AUTO="true"
[ -z "$_AUTO" ] && [ -f "$_AUTO_FILE" ] && _AUTO=$(cat "$_AUTO_FILE")
echo "AUTO_UPGRADE=$_AUTO"
```

**If `AUTO_UPGRADE=true` or `AUTO_UPGRADE=1`:** Skip AskUserQuestion. Log "Auto-upgrading lenshub v{old} → v{new}..." and proceed directly to Step 2.

**Otherwise**, use AskUserQuestion:
- Question: "lenshub **v{new}** is available (you're on v{old}). Upgrade now?"
- Options: ["Yes, upgrade now", "Always keep me up to date", "Not now", "Never ask again"]

**If "Yes, upgrade now":** Proceed to Step 2.

**If "Always keep me up to date":**
```bash
mkdir -p "${HOME}/.lenshub"
echo "true" > "${HOME}/.lenshub/auto-upgrade"
```
Tell user: "Auto-upgrade enabled. Future updates will install automatically." Then proceed to Step 2.

**If "Not now":** Write snooze state with escalating backoff (first snooze = 24h, second = 48h, third+ = 1 week), then continue with the current skill.
```bash
_SNOOZE_FILE="${HOME}/.lenshub/update-snoozed"
_REMOTE_VER="{new}"
_CUR_LEVEL=0
if [ -f "$_SNOOZE_FILE" ]; then
  _SNOOZED_VER=$(awk '{print $1}' "$_SNOOZE_FILE")
  if [ "$_SNOOZED_VER" = "$_REMOTE_VER" ]; then
    _CUR_LEVEL=$(awk '{print $2}' "$_SNOOZE_FILE")
    case "$_CUR_LEVEL" in *[!0-9]*) _CUR_LEVEL=0 ;; esac
  fi
fi
_NEW_LEVEL=$((_CUR_LEVEL + 1))
[ "$_NEW_LEVEL" -gt 3 ] && _NEW_LEVEL=3
mkdir -p "${HOME}/.lenshub"
echo "$_REMOTE_VER $_NEW_LEVEL $(date +%s)" > "$_SNOOZE_FILE"
```
Tell user the snooze duration: "Next reminder in 24h" (or 48h or 1 week, depending on level).

**If "Never ask again":**
```bash
mkdir -p "${HOME}/.lenshub"
touch "${HOME}/.lenshub/no-update-check"
```
Tell user: "Update checks disabled. Delete `~/.lenshub/no-update-check` to re-enable."
Continue with the current skill.

### Step 2: Find the install directory

The `./setup` script symlinks the repo into `~/.claude/skills/lenshub`. Resolve the symlink to get the real repo root so `git` operations work correctly.

```bash
LINK="${HOME}/.claude/skills/lenshub"
if [ -e "$LINK" ]; then
  # Resolve the symlink to the real repo (handles both symlinked and direct clones)
  INSTALL_DIR="$(cd "$LINK" && pwd -P)"
else
  echo "ERROR: lenshub not found at ~/.claude/skills/lenshub"
  echo "Run ./setup from the lenshub repo to install."
  exit 1
fi
echo "Install dir: $INSTALL_DIR"
```

### Step 3: Save old version

```bash
OLD_VERSION=$(node -e "console.log(require('${INSTALL_DIR}/package.json').version)" 2>/dev/null \
  || python3 -c "import json; print(json.load(open('${INSTALL_DIR}/package.json'))['version'])" 2>/dev/null \
  || echo "unknown")
```

### Step 4: Pull and regenerate

**For git installs:**
```bash
cd "$INSTALL_DIR"
STASH_OUTPUT=$(git stash 2>&1)
git fetch origin
git reset --hard origin/main
bun run gen:skill-docs
```

If `$STASH_OUTPUT` contains "Saved working directory", warn: "Note: local changes were stashed. Run `git stash pop` in the lenshub directory to restore them."

If `bun` is not available:
```bash
command -v bun >/dev/null 2>&1 || {
  echo "⚠️  bun not found — SKILL.md files not regenerated."
  echo "   Install bun: curl -fsSL https://bun.sh/install | bash"
  echo "   Then run: cd $INSTALL_DIR && bun run gen:skill-docs"
}
```

### Step 5: Write marker and clear snooze

```bash
mkdir -p "${HOME}/.lenshub"
echo "$OLD_VERSION" > "${HOME}/.lenshub/just-upgraded-from"
rm -f "${HOME}/.lenshub/update-snoozed"
```

### Step 6: Show what's new

Read `$INSTALL_DIR/CHANGELOG.md`. Find all entries between the old version and the new version. Summarize as 5-7 bullets grouped by theme. Focus on user-facing changes — new lenses, updated review sections, new delight features. Skip internal refactors unless significant.

Format:
```
lenshub v{new} — upgraded from v{old}!

What's new:
- [bullet 1]
- [bullet 2]
- ...

Happy reviewing!
```

### Step 7: Continue

After showing What's New, continue with whatever the user originally invoked. The upgrade is done.

---

## Standalone usage

When invoked directly as `/lenshub-upgrade` (not from a preamble):

Run Step 2–6 above. If already on the latest version:
```bash
cd "$INSTALL_DIR" && git fetch origin --quiet 2>/dev/null
LOCAL=$(node -e "console.log(require('./package.json').version)" 2>/dev/null || echo "")
REMOTE=$(git show origin/main:package.json 2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin)['version'])" 2>/dev/null || echo "")
```
If `LOCAL = REMOTE`, tell the user: "lenshub is already up to date (v{version}). All SKILL.md files are current."

---

## Adding the update check to a lenshub skill preamble

Every lenshub skill should run this at the top before doing anything else:

```bash
_UPD=$(~/.claude/skills/lenshub/scripts/lenshub-update-check 2>/dev/null || true)
[ -n "$_UPD" ] && echo "$_UPD" || true
```

If output shows `UPGRADE_AVAILABLE <old> <new>`: read `~/.claude/skills/lenshub/skills/lenshub-upgrade/SKILL.md` and follow the "Inline upgrade flow" above.

If output shows `JUST_UPGRADED <from> <to>`: tell user "Running lenshub v{to} (just updated!)" and continue.
