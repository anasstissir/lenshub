```
 ██╗     ███████╗███╗   ██╗███████╗    ██╗  ██╗██╗   ██╗██████╗
 ██║     ██╔════╝████╗  ██║██╔════╝    ██║  ██║██║   ██║██╔══██╗
 ██║     █████╗  ██╔██╗ ██║███████╗    ███████║██║   ██║██████╔╝
 ██║     ██╔══╝  ██║╚██╗██║╚════██║    ██╔══██║██║   ██║██╔══██╗
 ███████╗███████╗██║ ╚████║███████║    ██║  ██║╚██████╔╝██████╔╝
 ╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝    ╚═╝  ╚═╝ ╚═════╝ ╚═════╝
          iconic thinkers.  as claude code skills.
```

```
                               YOUR PLAN
                                   │
                                  ╱│╲
                                 ╱ │ ╲
                                ╱  │  ╲
                               ╱░░░│░░░╲
                              ╱░░░░│░░░░╲
                             ╱░ L E N S ░╲
                            ╱░░  H U B  ░░╲
                           ╱░░░░░░│░░░░░░░╲
                          ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
               │          │       │       │          │
               ▼          ▼       ▼       ▼          ▼
            /plan-      /plan-  /plan-  /plan-     /plan-
             musk        jobs   altman  bezos      feynman
           delete it   feel it scale it work back  prove it
```

---

Get Elon Musk to delete your requirements. Have Steve Jobs question your UX. Ask Sam Altman if this compounds. Or convene the whole board and watch them disagree.

## Skills

### Plan review lenses

| Skill | Lens | Best for |
|-------|------|----------|
| `/plan-musk` | First principles, deletion, speed | Your plan feels bloated or over-engineered |
| `/plan-jobs` | User experience, simplicity, delight | You're not sure what the user actually feels |
| `/plan-altman` | Leverage, AI-native, compounding | You want to know if this matters in 5 years |
| `/plan-bezos` | Customer obsession, working backwards | You're not sure you're solving the right problem |
| `/plan-feynman` | Clarity, rigor, assumption-busting | Your plan feels complex and you can't explain why |
| `/plan-board` | Multi-lens synthesis (Musk + Jobs + Altman) | You want all angles at once, surfacing disagreements |

### Action skills

| Skill | What it does | Best for |
|-------|-------------|----------|
| `/browse-qa` | Navigates and tests a running web app with a headless browser | Verifying a feature shipped as planned; generating a paste-ready QA report |

## Install

Clone anywhere and run `./setup`:

```bash
git clone https://github.com/anasstissir/lenshub
cd lenshub
./setup
```

That's it. No binary compilation. No Playwright. Sub-10-second install.

The setup script works regardless of where you cloned the repo. It:
1. Generates `SKILL.md` files from templates
2. Symlinks the repo into `~/.claude/skills/lenshub` (so upgrades and update checks work)
3. Symlinks each skill into `~/.claude/skills/` so Claude Code discovers them

## Usage

In any Claude Code session, just invoke a skill with a description of your plan:

```
/plan-musk I'm building a notification service that sends emails, SMS, and push
           notifications. It has three adapters, a retry queue, and a delivery
           tracking dashboard.

/plan-jobs [same plan]

/plan-altman [same plan]

/plan-board [same plan — runs all three and synthesizes]
```

Each review:
1. Runs a system audit (git log, CLAUDE.md, TODOS.md)
2. Challenges the premise from that persona's lens
3. Walks through 5 persona-specific review sections
4. Asks questions one at a time via `AskUserQuestion`
5. Produces a completion summary with a signature quote

## What makes each lens different

**Musk** asks: can we delete this? Can we cut that requirement? What's the first-principles version? What ships in 48 hours? His review produces a **Deletion Map** and a **Requirements Audit** that challenges every constraint.

**Jobs** asks: what does the user *feel*? Where's the wow moment? What's cluttering the core experience? His review produces an **Experience Map** and a **Cut List** focused on focus itself.

**Altman** asks: does this compound? Is there an AI-native version that's 10x better? What's the moat? What comes after this ships? His review produces a **Leverage Audit** and an **AI-Native Audit**.

**Bezos** asks: who is the customer and what does their life look like after this ships? He writes the press release first, then the FAQ, then the spec. His review produces a **Press Release Test**, a **Working Backwards Map**, and a **Customer Journey Delta**.

**Feynman** asks: can you explain this simply? If not, you don't understand it. He grades every section of your plan on a 1–5 Clarity Scale and flags cargo-cult engineering. His review produces a **Clarity Score Card**, an **Assumption Registry**, and a **Cargo-Cult Audit**.

**Board** runs Musk, Jobs, and Altman in sequence, then surfaces:
- **GREEN** — where all three agree (highest-confidence findings)
- **RED** — where they disagree (the real decisions)
- **YELLOW** — 2-1 findings with a named dissent
- **Board Verdict** — PROCEED / REDESIGN / HOLD with rationale

## Add a persona

See [CONTRIBUTING.md](CONTRIBUTING.md). A good persona takes ~30 minutes to add.

Wanted personas: Linus Torvalds, Jensen Huang, Murati, Nadella, Gates. Open a PR.

## Development

```bash
bun run gen:skill-docs   # regenerate SKILL.md from templates
bun test                 # run validation tests (free, <1s)
bun run skill:check      # freshness check
```

SKILL.md files are generated from `.tmpl` templates. Always edit `.tmpl`, not `.md` directly.

## License

MIT
