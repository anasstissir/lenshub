# Contributing a New Persona

lenshub is a collection of iconic thinker skills for Claude Code. Adding a new lens takes about 30 minutes and follows a simple template.

## Who makes a good persona?

A good lenshub lens has:
- A **distinct, opinionated thinking framework** (not just a personality)
- A **genuine lens** that surfaces different issues than the existing personas
- **Public statements** (quotes, interviews, essays) that make the review voice authentic
- Enough documented philosophy to write 5+ distinct review sections

Current personas and their primary lenses:
- **Musk** — First principles, deletion, speed
- **Jobs** — User experience, simplicity, delight
- **Altman** — Leverage, AI-native, compounding returns
- *Wanted: Bezos (customer obsession, long-term), Murati (research rigor, safety), Gates (systems thinking)*

## How to add a persona

### 1. Create the skill directory

```bash
mkdir skills/plan-<name>
```

### 2. Write the template

Create `skills/plan-<name>/SKILL.md.tmpl`. The generator auto-discovers all `skills/*/SKILL.md.tmpl` files — no registration needed. Use this structure:

```markdown
---
name: plan-<name>
version: {{VERSION}}
description: |
  [One-liner: what makes this persona's lens unique]
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash
  - AskUserQuestion
---

> "[Famous quote from this person]"
> — [Name]

# [EMOJI] [NAME] REVIEW — [LENS NAME] MODE

## Philosophy
[2-3 paragraphs describing the thinking framework, not just personality.
What questions does this person ask that others don't?
What would they DELETE from a plan that others would keep?
What do they see that others miss?]

**The Core Lens:**
1. [Core principle 1]
2. [Core principle 2]
3. [Core principle 3]
...

**Critical rule:** [One rule about how to commit to this lens]

Do NOT make code changes. Do NOT start implementation. Your job is to [frame the job].

## PRE-REVIEW SYSTEM AUDIT

[Standard git audit commands + what this persona specifically looks for in context]

## Step 0: [Name] Premise Challenge + Mode Selection

### 0A. [Persona-specific test 1]
[3 questions this person would ask first]

### 0B. [Persona-specific test 2]
[...]

### 0C. Mode Selection
[Three modes unique to this persona's framework]

**STOP.** AskUserQuestion once per issue. Do NOT batch. Recommend + WHY. Do NOT proceed until user responds.

## Review Sections

[5 sections, each with a table format and STOP/AskUserQuestion rule]

## Required Outputs

[Lists of what this persona's review must produce]

### Completion Summary
\`\`\`
+====================================================================+
|        [EMOJI] [NAME] REVIEW — COMPLETION SUMMARY                  |
+====================================================================+
| Mode selected | [...] |
| [key metrics] | [...] |
+====================================================================+

"[Closing quote from this person]"
\`\`\`
```

### 3. Generate SKILL.md

```bash
bun run gen:skill-docs
```

### 4. Run tests

```bash
bun test
```

Fix any test failures (usually frontmatter issues or missing sections).

### 5. Add to plan-board

Edit `skills/plan-board/SKILL.md.tmpl` to include the new lens in the synthesis section. Update the Board Verdict table to include the new column.

Regenerate:
```bash
bun run gen:skill-docs
```

### 6. Commit

Commit both `.tmpl` and generated `.md` files together:
```bash
git add skills/plan-<name>/
git add skills/plan-board/SKILL.md.tmpl skills/plan-board/SKILL.md
git commit -m "feat: add /plan-<name> persona skill"
```

### 7. Open a PR

Include in the PR description:
- Why this persona has a distinct lens (what does it surface that others miss?)
- 2-3 example findings this persona would catch on a real plan
- The "mode names" you chose for Step 0 and why

## Quality bar

Before opening a PR, verify:
- [ ] The persona's `Step 0` questions are genuinely different from Musk/Jobs/Altman
- [ ] Each review section has a unique table format, not just a copy of another persona's
- [ ] The completion summary has a real closing quote from this person
- [ ] `bun test` passes with zero failures
- [ ] `bun run skill:check` reports `FRESH` for all skills

## Who to credit

Add yourself to the PR description as the persona contributor. Community personas are credited in the README.

---

*"The best plan review is the one that finds the thing you were too close to see."*
