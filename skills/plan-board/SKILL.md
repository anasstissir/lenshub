---
name: plan-board
version: 1.0.0
platform: claude-code
description: |
  Board-level meta-synthesis. Runs Musk, Jobs, and Altman lenses in sequence,
  surfaces where they agree (GREEN) and disagree (RED), and delivers a
  final weighted verdict.
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash
  - AskUserQuestion
---
<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

## Update Check (run first)

```bash
_UPD=$(~/.claude/skills/lenshub/scripts/lenshub-update-check 2>/dev/null || true)
[ -n "$_UPD" ] && echo "$_UPD" || true
```

If output shows `UPGRADE_AVAILABLE <old> <new>`: read `~/.claude/skills/lenshub/skills/lenshub-upgrade/SKILL.md` and follow the "Inline upgrade flow" (auto-upgrade if configured, otherwise AskUserQuestion with 4 options, write snooze state if declined). If `JUST_UPGRADED <from> <to>`: tell user "Running lenshub v{to} (just updated!)" and continue.

> "If you want to go fast, go alone. If you want to go far, go together."
> — African proverb, frequently cited in boardrooms

# ◎ BOARD REVIEW — MULTI-LENS SYNTHESIS

## Philosophy
You are convening a board of three. Each board member sees the plan through a different lens. Your job is not to average their views — it is to surface where they **agree** (that's signal) and where they **disagree** (that's where the real decisions live). Disagreements between strong thinkers are not noise; they are the most valuable information in a plan review.

The three lenses:
- **⚡ Musk lens:** First principles. Delete requirements. Speed. "Can this be cut?"
- **◉ Jobs lens:** User experience. Simplicity. Delight. "What does the user feel?"
- **◈ Altman lens:** Leverage. AI-native. Compounding. "Does this matter in 10 years?"

No lens is more correct. Each surfaces real things the others miss. The board's job is synthesis, not consensus.

**Critical rule:** Do NOT water down disagreements. If Musk would delete what Jobs considers essential, say so clearly. The disagreement is the finding — not a problem to smooth over.

Do NOT make code changes. Do NOT start implementation. Your job is to **run all three lenses and synthesize their verdicts**.

## PRE-REVIEW SYSTEM AUDIT

```bash
git log --oneline -20
git diff main --stat
```

Read `CLAUDE.md` and `TODOS.md` if they exist. Map:
- Current system state and what's in flight
- Existing known pain points
- Architecture context needed for all three lenses

Report findings concisely before the reviews begin.

---

## ⚡ MUSK LENS — First Principles Review

Apply the full Musk review methodology:

**Step 0: Delete Test**
- Can this feature be deleted entirely? What breaks if it never ships?
- Which requirements are made up? For each: who imposed it, is it valid?
- What's the first-principles problem (strip all assumed solutions)?

**Simplification Map**
For every component: is it justified? What's the simplest alternative?
Flag: YAGNI violations, config options without justification, abstractions serving hypothetical futures.

**Speed Test**
- 48-hour version: [describe]
- 1-week version: [describe]
- Gap analysis: what's scope creep vs. real requirements?

**Musk Verdict**
```
MUSK VERDICT: [DELETE / SIMPLIFY / BUILD]
Key finding: [one sentence]
Requirements to cut: [list]
Biggest complexity smell: [one item]
```

---

## ◉ JOBS LENS — Experience Review

Apply the full Jobs review methodology:

**Step 0: User Feeling Test**
- What does a user feel the first time they encounter this?
- What would a sixth-grader think of this UX?
- Walk through the first-time experience step by step.

**Focus Audit**
- What is the ONE thing this plan does that matters most?
- What dilutes it?
- What should be cut so the important thing can shine?

**The Wow Moment**
- Is there one moment that makes a user say "oh wow, they thought of that"?
- If not: CRITICAL DESIGN GAP. Name it.

**Jobs Verdict**
```
JOBS VERDICT: [REDESIGN / REFINE / SHIP]
Key finding: [one sentence]
Wow moment: [identified / MISSING]
Experience gaps: [list]
Things to cut for focus: [list]
```

---

## ◈ ALTMAN LENS — Leverage Review

Apply the full Altman review methodology:

**Step 0: Leverage Test**
- Does this compound? (Gets better with time, data, or users?)
- What's the defensible moat?
- AI-native or AI-frosted?

**AI-Native Audit**
For each major feature: what's the 10x-better AI version?

**10-Year Question**
- Is this problem still a problem in 10 years?
- What comes after this ships (Phase 2)?

**Altman Verdict**
```
ALTMAN VERDICT: [REFRAME / ACCELERATE / EXECUTE]
Key finding: [one sentence]
Compounding mechanism: [identified / MISSING]
Moat type: [strongest moat, or NONE]
AI-native gap: [biggest missed AI opportunity, if any]
```

---

## Board Synthesis

### GREEN — Where all three agree
These findings are the highest-confidence signal. If Musk, Jobs, and Altman all flag the same thing, it's not an opinion — it's a fact.

```
FINDING              | MUSK  | JOBS  | ALTMAN | VERDICT
---------------------|-------|-------|--------|--------
[finding]            | ✓     | ✓     | ✓      | GREEN
```

List all GREEN items. These are the non-negotiable changes.

### RED — Where they disagree
This is where judgment matters most. The right answer is not "average them" — it's to understand WHY they disagree and make a decision.

```
TOPIC                | MUSK VIEW    | JOBS VIEW    | ALTMAN VIEW  | TENSION
---------------------|--------------|--------------|--------------|--------
[topic]              | [stance]     | [stance]     | [stance]     | [why]
```

For each RED item:
1. State the exact disagreement in one sentence.
2. Name the underlying value tension (e.g., "Speed vs. polish," "Simplicity vs. leverage," "Cut vs. delight").
3. Make a recommendation. The board must have a view, not just "it depends."

**STOP.** AskUserQuestion for each RED item with genuine decision weight. Recommend + WHY. One question per item.

### YELLOW — Where two agree, one dissents
Surface these with the dissenting view clearly named. A 2-1 majority is not consensus — understand the dissent.

```
TOPIC                | MAJORITY VIEW         | DISSENTING LENS  | DISSENT REASON
---------------------|-----------------------|------------------|---------------
```

### Final Board Verdict Table

```
+===========================================================================+
|                      BOARD VERDICT                                        |
+===========================================================================+
|                     | ⚡ MUSK        | ◉ JOBS        | ◈ ALTMAN      |
+---------------------+---------------+---------------+----------------+
| Overall verdict     | [mode]        | [mode]        | [mode]         |
| Biggest concern     | [one item]    | [one item]    | [one item]     |
| Biggest strength    | [one item]    | [one item]    | [one item]     |
| Risk rating (1-5)   | [1-5]         | [1-5]         | [1-5]          |
+---------------------+---------------+---------------+----------------+
| BOARD RECOMMENDATION: [PROCEED / REDESIGN / HOLD]                    |
| Rationale: [2-3 sentences synthesizing the board's reasoning]        |
+===========================================================================+
```

**PROCEED** = all three or 2-1 with weak dissent → ship with GREEN fixes applied.
**REDESIGN** = 2+ lenses recommend structural changes → stop, redesign on the RED items, re-review.
**HOLD** = fundamental disagreement on whether to build this at all → bring decision back to the team.

### TODOS.md updates
Present each potential TODO as its own individual AskUserQuestion. Never batch. Options: **A)** Add to TODOS.md **B)** Skip **C)** Build now.

### Completion Summary
```
+====================================================================+
|              ◎ BOARD REVIEW — COMPLETION SUMMARY                   |
+====================================================================+
| Musk verdict         | [DELETE / SIMPLIFY / BUILD]                 |
| Jobs verdict         | [REDESIGN / REFINE / SHIP]                  |
| Altman verdict       | [REFRAME / ACCELERATE / EXECUTE]            |
+--------------------------------------------------------------------+
| GREEN items          | ___ (unanimous findings)                    |
| RED items            | ___ (disagreements requiring decision)      |
| YELLOW items         | ___ (2-1 findings)                          |
+--------------------------------------------------------------------+
| Board recommendation | [PROCEED / REDESIGN / HOLD]                 |
| Confidence           | High / Medium / Low                         |
| TODOS.md updates     | ___ items proposed                          |
+====================================================================+

"The goal is not consensus. The goal is the right decision."
```
