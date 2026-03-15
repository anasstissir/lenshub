# TODOS

## Captured from review

### [ ] Test that `setup` script has execute permissions

**What:** Add a `bun test` assertion that verifies `setup` has the `+x` bit set.

**Why:** Git preserves the executable bit in most environments, but some CI configs and git clients (particularly on Windows or with certain `core.fileMode=false` settings) strip it. If the bit is lost, `./setup` fails with `Permission denied` — a confusing first-run experience with no clear error pointing to the cause.

**Pros:** Catches portability regressions early, makes the failure loud instead of silent.

**Cons:** Minimal — one test, trivial implementation (`fs.statSync('setup').mode & 0o111`).

**Context:** The `setup` script is the primary install path. If it's not executable, users see a confusing error and the README instructions fail silently. `git ls-files --stage setup` would show the mode; a CI test would enforce it programmatically. Start in `test/skill-validation.test.ts`.

**Depends on:** Nothing. Standalone.

---

### [ ] Add "what this lens won't catch" cross-referral block to each persona completion summary

**What:** At the end of each persona's Completion Summary, add a callout like: "This lens won't catch UX regressions (try /plan-jobs) or long-term durability concerns (try /plan-bezos)."

**Why:** As the lens library grows, users need guidance on which lens to invoke next. The completion summary is the natural place — they just finished one review and are deciding what to do next.

**Pros:** Low effort, high clarity. Turns each skill into a pointer to the rest of the library. Makes the lens ecosystem feel cohesive.

**Cons:** Cross-referrals become stale if new lenses are added and the existing templates aren't updated. Best done once the lens library stabilizes.

**Context:** Each persona template ends with a Completion Summary section. Adding one line after the summary table — "What this lens won't catch:" with 2-3 pointers to complementary lenses — is a ~5 minute change per template. Do this after the lens set stabilizes (5+ lenses).

**Effort:** S (once lens library is stable)
**Priority:** P3

**Depends on:** Lens library having 5+ stable lenses.

---

### [ ] Add a lens recommender skill (/plan-pick)

**What:** A skill that reads a plan description and recommends which 1-2 lenses to invoke first, based on problem type (greenfield vs. refactor, UX-heavy vs. infra, etc.).

**Why:** With 5+ lenses, users face a meta-decision before they can start reviewing. A recommender removes that friction and makes the library approachable to new users.

**Pros:** Makes lenshub more discoverable. Reduces the "I don't know which lens to use" barrier. Can double as a tour of the library.

**Cons:** Adds another skill to maintain. The recommendations are probabilistic — a "wrong" recommendation is confusing. Best implemented once the lenses are proven in practice.

**Context:** Implementation would be a simple prompt-based skill: read the plan, map it to a decision tree (e.g., "no clear user story → Bezos first; feels over-engineered → Feynman; fast execution needed → Musk"), output 1-2 recommended lens invocations with one-line rationale for each.

**Effort:** S
**Priority:** P2

**Depends on:** Nothing. Can be built at any time.
