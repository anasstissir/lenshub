---
name: browse-qa
version: 1.0.0
description: |
  Post-plan-review smoke test. Uses the browser to verify the feature you
  planned actually shipped as intended. Produces a paste-ready QA report
  for PR descriptions and GitHub issues.
allowed-tools:
  - Read
  - Glob
  - Grep
  - WebFetch
  - AskUserQuestion
  - Agent
---
<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

## Update Check (run first)

```bash
_UPD=$(~/.claude/skills/lenshub/scripts/lenshub-update-check 2>/dev/null || true)
[ -n "$_UPD" ] && echo "$_UPD" || true
```

If output shows `UPGRADE_AVAILABLE <old> <new>`: read `~/.claude/skills/lenshub/skills/lenshub-upgrade/SKILL.md` and follow the "Inline upgrade flow" (auto-upgrade if configured, otherwise AskUserQuestion with 4 options, write snooze state if declined). If `JUST_UPGRADED <from> <to>`: tell user "Running lenshub v{to} (just updated!)" and continue.

> "Quality means doing it right when no one is looking."
> — Henry Ford

# 🔍 BROWSE-QA — POST-PLAN SMOKE TEST

## Philosophy
You are not here to run a full QA regression. You are here to answer one question: **did we ship what we planned?** This skill bridges the gap between plan review and production reality. Invoke it after a /plan-* review, after a PR merges, or before a demo. Navigate the app, test the flows the plan touched, and produce a report clear enough to paste into a PR description.

**Critical rules:**
1. **NEVER report a PASS on a flow you could not fully test.** If the browser cannot reach a page, cannot find an element, or encounters an unexpected state — that is a ❌ FAIL or ⚠️ PARTIAL, never a silent PASS.
2. **Stay focused on the plan's flows.** You are testing what changed, not the whole app.
3. **Every finding must have evidence.** Screenshot or exact reproduction steps. "The button didn't work" is not a finding.
4. **Failures are loud, never silent.** If a test step fails, report the exact URL, action attempted, and what was observed instead. Then continue to the next flow.

Do NOT make code changes. Do NOT fix bugs you find. Your job is to observe and report.

## Step 0: Gather Test Context

AskUserQuestion to collect:
1. **URL to test** — staging, localhost, or production?
2. **Feature or plan to focus on** — what just shipped? (If you just ran /plan-musk or similar, describe what was planned.)
3. **Specific flows to verify** — optional; infer from the feature description if not provided.

## Step 1: Build the Test Plan

Based on the feature description, identify 3-7 key user flows to verify. For each:

```
FLOW                 | HAPPY PATH STEPS              | ONE FAILURE CASE TO PROBE
---------------------|-------------------------------|-------------------------
[flow name]          | [step 1 → step 2 → outcome]   | [what should fail loudly]
```

Present the test plan to the user. AskUserQuestion to confirm or adjust before running.

## Test Execution

Use the Agent tool to run each flow through the browser. For each flow:

1. Navigate to the URL
2. Take a before screenshot
3. Perform the interaction steps (click, fill form, submit, etc.)
4. Assert the expected outcome (element present, text matches, redirect occurred)
5. Take an after screenshot

**On any failure:**
- Mark that flow as ❌ FAIL with the exact action that failed and what was observed
- Continue to the next flow — do not abort the entire run
- Never mark a flow as PASS if any step within it failed or could not be verified

## QA Report

After all flows are tested, output the full report in this format — designed to be pasted directly into a PR description or GitHub issue:

```markdown
## QA Report: <Feature Name>
**URL tested:** <URL>
**Date:** <date>
**Scope:** Post-plan smoke test via /browse-qa (lenshub)

### Health Score: <X>/10

### Results

| Flow | Status | Notes |
|------|--------|-------|
| <flow name> | ✅ PASS / ❌ FAIL / ⚠️ PARTIAL | <one-line finding> |

### Findings

#### ❌ <Finding title>
**Steps to reproduce:**
1. Navigate to <URL>
2. <step>
**Expected:** <expected behavior>
**Actual:** <actual behavior>
**Screenshot:** <filename or "see attached">

### Passed Flows
<list flows with no issues>

### Not Tested
<list flows skipped and why — never silently skip>
```

## CRITICAL RULE — How to ask questions
Every AskUserQuestion MUST: (1) present 2-3 concrete lettered options, (2) state which you recommend FIRST, (3) explain WHY in 1-2 sentences. No batching. No yes/no questions.

## Completion Summary
```
+====================================================================+
|              🔍 BROWSE-QA — COMPLETION SUMMARY                     |
+====================================================================+
| URL tested           | [URL]                                       |
| Flows tested         | ___ of ___ planned                          |
| ✅ PASS              | ___                                         |
| ❌ FAIL              | ___                                         |
| ⚠️  PARTIAL          | ___                                         |
| Health Score         | ___/10                                      |
| Critical findings    | ___                                         |
| Report               | Paste-ready markdown ✓                      |
+====================================================================+

"Quality means doing it right when no one is looking."
```
