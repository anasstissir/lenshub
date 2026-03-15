# lenshub development

## Commands

```bash
bun run gen:skill-docs  # regenerate SKILL.md files from .tmpl templates
bun test                # run static validation tests (free, <1s)
bun run skill:check     # freshness check — exits 1 if SKILL.md is stale
```

## Project structure

```
lenshub/
├── skills/
│   ├── plan-musk/
│   │   ├── SKILL.md.tmpl    ← edit this
│   │   └── SKILL.md         ← generated (commit both)
│   ├── plan-jobs/
│   │   ├── SKILL.md.tmpl
│   │   └── SKILL.md
│   ├── plan-altman/
│   │   ├── SKILL.md.tmpl
│   │   └── SKILL.md
│   └── plan-board/          ← meta-skill (runs all personas, synthesizes)
│       ├── SKILL.md.tmpl
│       └── SKILL.md
├── scripts/
│   └── gen-skill-docs.ts    # Template → SKILL.md generator
├── test/
│   └── skill-validation.test.ts  # Frontmatter + freshness checks
├── setup                    # Bash installer (symlinks skills → ~/.claude/skills/)
├── package.json
├── CLAUDE.md
├── README.md
└── CONTRIBUTING.md          # Guide for adding new personas
```

## SKILL.md workflow

SKILL.md files are **generated** from `.tmpl` templates. To update docs:

1. Edit the `.tmpl` file (e.g. `skills/plan-musk/SKILL.md.tmpl`)
2. Run `bun run gen:skill-docs`
3. Commit both the `.tmpl` and generated `.md` files

## Adding a new persona

See `CONTRIBUTING.md` for the full guide. Quick version:
1. Create `skills/plan-<name>/SKILL.md.tmpl`
2. Run `bun run gen:skill-docs` (auto-discovered — no registration needed)
3. Add validation tests in `test/skill-validation.test.ts`

## Skill preamble (update check)

Every lenshub skill should include this block at the very top, before any other content:

```bash
_UPD=$(~/.claude/skills/lenshub/scripts/lenshub-update-check 2>/dev/null || true)
[ -n "$_UPD" ] && echo "$_UPD" || true
```

If output shows `UPGRADE_AVAILABLE <old> <new>`: read `~/.claude/skills/lenshub/skills/lenshub-upgrade/SKILL.md` and follow the "Inline upgrade flow".
If output shows `JUST_UPGRADED <from> <to>`: tell user "Running lenshub v{to} (just updated!)" and continue.

## Deploying to your active skills

Users run `/lenshub-upgrade` or Claude runs it automatically when the preamble detects a new version. Manual deploy:

```bash
cd ~/.claude/skills/lenshub
git fetch origin && git reset --hard origin/main
bun run gen:skill-docs
```
