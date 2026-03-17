# McKinsey Framework Library

Reference for the Framework Pass in mckinsey-slide. Each entry includes purpose, layout spec, and markdown rendering guidance.

---

## 1. Pyramid Principle (Minto Pyramid)

**Purpose:** The governing structure of every McKinsey deck. Conclusion first, then supporting arguments, then evidence. Every slide is a node in the pyramid.

**Structure:**
```
GOVERNING THOUGHT (top of pyramid = conclusion)
├── ARGUMENT 1 (MECE — supports governing thought)
│   ├── Evidence 1a
│   └── Evidence 1b
├── ARGUMENT 2 (MECE — supports governing thought)
│   ├── Evidence 2a
│   └── Evidence 2b
└── ARGUMENT 3 (MECE — supports governing thought)
    ├── Evidence 3a
    └── Evidence 3b
```

**Rules:**
- Each level is MECE: no overlap between arguments, no gaps in coverage
- Each argument must independently support the governing thought
- Evidence must be specific, quantified where possible
- "So What?" test: every node must answer it

**Slide application:**
- Executive Summary slide = governing thought + 3 argument headlines
- Each argument = one deck section (multiple slides)
- Each evidence = one slide

---

## 2. MECE Issue Tree

**Purpose:** Decompose a complex problem into sub-problems with no overlap and no gaps. Used for problem-structuring (Step 1) and as a standalone slide.

**Types:**
- **Process tree:** decompose by sequential steps (what happens first, second, third)
- **Category tree:** decompose by MECE categories (geography, segment, function)
- **Hypothesis tree:** decompose by the logical conditions that must be true for the hypothesis to hold

**Layout:**
```
ROOT QUESTION
├── Branch A: [Sub-question]
│   ├── Leaf A1: [Analytical question → Data source]
│   └── Leaf A2: [Analytical question → Data source]
├── Branch B: [Sub-question]
│   ├── Leaf B1
│   └── Leaf B2
└── Branch C: [Sub-question]
    ├── Leaf C1
    └── Leaf C2
```

**MECE check at each level:**
- Overlap test: "Could the same answer appear in two branches?" → If yes: split or merge
- Completeness test: "Is there a possible answer not covered?" → If yes: add branch
- Mark: ✅ MECE or ❌ MECE VIOLATION + explanation

---

## 3. McKinsey 7S Framework

**Purpose:** Organisational alignment analysis. Diagnose why a strategy isn't being executed, or plan a transformation. The 7 elements must be internally consistent.

**The seven elements:**
- **Strategy:** The plan to build and maintain competitive advantage
- **Structure:** Organisational hierarchy and accountability
- **Systems:** Processes, workflows, IT, reporting
- **Shared Values:** Culture, norms, organisational identity (centre of the model)
- **Style:** Leadership and management approach
- **Staff:** Talent, capabilities, human resources
- **Skills:** Core competencies the organisation has or needs

**Layout:** Interconnected circles (Venn-like), with Shared Values at centre

**Slide application:**
- Assess current state of each S (Red/Amber/Green)
- Identify misalignments (e.g., strategy requires agility but structure is hierarchical)
- Prioritise which S to change first

**Markdown rendering:**
```
| Element        | Current State        | Target State         | Gap  |
|----------------|----------------------|----------------------|------|
| Strategy       | Cost leadership      | Differentiation      | High |
| Structure      | Functional silos     | Cross-functional     | High |
| Systems        | Legacy ERP           | Cloud-native         | High |
| Shared Values  | Risk-averse          | Innovation-first     | Med  |
| Style          | Command & control    | Servant leadership   | Med  |
| Staff          | Strong ops talent    | Digital talent gap   | High |
| Skills         | Process excellence   | Analytics / AI       | High |
```

---

## 4. Three Horizons (McKinsey Horizon Model)

**Purpose:** Portfolio and innovation strategy across time. Avoid over-investing in the core at the expense of future growth. Balance defend, build, and explore.

**The three horizons:**
- **Horizon 1 (Now, 0-2yr):** Defend and extend the core business. High certainty, incremental improvement.
- **Horizon 2 (Next, 2-5yr):** Build emerging businesses. Medium certainty, requires focused investment.
- **Horizon 3 (Beyond, 5yr+):** Create future options. Low certainty, high potential, early-stage bets.

**Layout:** Three overlapping S-curves on a time axis, with initiatives plotted on each horizon.

**Diagnostic questions:**
- What % of investment is in H1 vs H2 vs H3?
- Is H1 generating enough cash to fund H2 and H3?
- Are H3 bets being killed too early or too late?

**Markdown rendering:**
```
                  H1 — CORE     H2 — GROWTH    H3 — OPTIONS
─────────────────────────────────────────────────────────────
Time horizon:     0–2 years      2–5 years      5+ years
Investment %:     [X]%           [Y]%           [Z]%
Return profile:   Certain        Probable       Uncertain
Initiatives:
  — [A] ✓
  — [B]                ✓
  — [C]                               ✓

Key insight: [Are we over/under-investing in any horizon?]
```

---

## 5. GE-McKinsey Matrix

**Purpose:** Portfolio prioritisation for multi-business companies. More nuanced than the BCG Growth-Share Matrix — uses Industry Attractiveness (X) vs Business Unit Strength (Y).

**Axes:**
- **Y-axis (Business Unit Competitive Strength):** Market share, profit margins, technology, brand, supply chain — weighted composite score
- **X-axis (Industry Attractiveness):** Market size, growth rate, profitability, competitive intensity — weighted composite score

**3×3 grid zones:**
- Top-left 3 cells (high strength, high attractiveness): **Invest / Grow**
- Diagonal 3 cells: **Selective investment / hold**
- Bottom-right 3 cells (low strength, low attractiveness): **Harvest / Divest**

**Markdown rendering:**
```
HIGH  │ Invest ✅  │ Invest ✅  │ Selective ⚠️ │
BU    │──────────────────────────────────────────│
STRENGTH│ Invest ✅│ Selective ⚠️│ Harvest ❌  │
      │──────────────────────────────────────────│
LOW   │ Selective ⚠️│ Harvest ❌│ Divest ❌   │
      └──────────────┴────────────┴──────────────┘
           HIGH       MEDIUM         LOW
              Industry Attractiveness
```

---

## 6. Value Bridge Waterfall

**Purpose:** Quantify the financial impact of individual levers. Show how revenue, cost, or margin changes from baseline to target. EBITDA bridge, savings waterfall, revenue walk.

**Layout:**
- Start bar (baseline) → series of delta bars (positive = gains, negative = losses) → end bar (result)
- Each delta bar labelled with lever name + value
- Color: gains = McKinsey Blue; losses = McKinsey Red; totals = Dark Grey

**Annotation requirements:**
- Largest contributor called out with "KEY DRIVER" annotation
- "Net change" summarised above the end bar
- "So What?" at bottom: "Net $Xm improvement — [lever] is the primary driver and should be prioritised"

**Markdown rendering:**
```
Baseline EBITDA:          $180M
+ Pricing optimisation:   + $28M  [LARGEST DRIVER]
+ Procurement savings:    + $15M
- Volume decline:         -  $9M
- Restructuring costs:    - $12M
─────────────────────────────────
Target EBITDA:            $202M   (+12.2%)

Key driver: Pricing contributes 62% of gross improvement.
```

---

## 7. Structured Action Plan (30-60-90 Day Plan)

**Purpose:** Translate recommendations into concrete, accountable actions. Every recommendation must end in a next-steps plan. Used on the final 1-2 slides of every deck.

**Structure:**
- Three columns: 30 Days | 60 Days | 90 Days
- Each column: 2-4 specific, measurable, owner-assigned actions
- Rows: workstream (e.g., Pricing, Org design, IT)

**Action format:** "[Verb] [specific deliverable] by [date], Owner: [name/role]"
- ✅ "Finalise pricing model and run pilot in 3 markets by April 15 — Owner: CMO"
- ❌ "Work on pricing" (too vague)

**Markdown rendering:**
```
| Workstream    | 30 Days (by [date])           | 60 Days (by [date])          | 90 Days (by [date])          |
|---------------|-------------------------------|------------------------------|------------------------------|
| Pricing       | Complete pricing analysis     | Pilot in top 3 markets       | Roll out nationally           |
|               | Owner: CMO                    | Owner: CMO + Sales           | Owner: CMO                   |
| Org Design    | Confirm new structure         | Hire 3 key roles             | Complete transition           |
|               | Owner: CHRO                   | Owner: CHRO                  | Owner: CEO + CHRO             |
| Technology    | Audit current systems         | Select vendor                | Begin implementation          |
|               | Owner: CTO                    | Owner: CTO                   | Owner: CTO + PMO              |
```
