# BCG Framework Library

Reference for Step 4 (Framework Pass) in bcg-slide. Each entry includes purpose, layout spec, and markdown rendering guidance.

---

## 1. Narrative

**Purpose:** Context, situation, and recommendation slides. Conveys a logical argument in prose + bullets without a visual artifact.

**Layout:**
- Action title (full-width, top)
- 3-5 MECE bullets (left 60-70%), each a complete insight sentence
- Optional: supporting callout box (right 30-40%) with key statistic or pull-quote
- Waterfall connector at bottom: "therefore / but / so → [next slide]"

**Markdown rendering:**
```markdown
### Slide N: [ACTION TITLE]
**Framework:** Narrative

- Bullet 1 — specific insight
- Bullet 2
- Bullet 3

> **Key stat:** [Pull-quote or statistic in blockquote]

**→ therefore / but / so:** [Next slide title]
```

---

## 2. Comparison

**Purpose:** Benchmarking, competitive analysis, option evaluation. Two or more entities compared across consistent criteria.

**Layout:**
- Comparison table: rows = criteria, columns = entities/options
- Or horizontal grouped bar chart: groups = criteria, bars = entities
- Highlight column for preferred option (BCG Blue header)
- Rating cells: ✅ / ⚠️ / ❌ or numeric scores
- Annotation row: "Why this matters" at bottom

**Markdown rendering:**
```markdown
| Criteria       | Option A | Option B | Option C |
|----------------|----------|----------|----------|
| Cost           | Low ✅   | High ❌  | Med ⚠️  |
| Speed          | Med ⚠️  | High ✅  | Low ❌   |
| Risk           | Low ✅   | Med ⚠️  | High ❌  |
| **VERDICT**    | **Prefer** |        |          |
```

---

## 3. Portfolio (Growth-Share Matrix / 2×2)

**Purpose:** Portfolio prioritization. The BCG Growth-Share Matrix (Stars, Cash Cows, Question Marks, Dogs) is the canonical form. Also used for effort-vs-impact, risk-vs-return.

**Quadrant definitions (Growth-Share Matrix):**
- **Stars** (high growth, high share): Invest aggressively — future cash generators
- **Cash Cows** (low growth, high share): Harvest — fund Stars and R&D
- **Question Marks** (high growth, low share): Selective investment — decide fast
- **Dogs** (low growth, low share): Divest or contain — drain resources

**Layout:**
- 2×2 grid with axes labelled
- Business units / products plotted as circles (size = revenue)
- Quadrant labels in corners
- Strategic arrows showing desired movement

**Markdown rendering:**
```
HIGH   │  Question Marks  │     Stars        │
GROWTH │  🔵 Product C    │  🟡 Product A    │
       │─────────────────────────────────────│
LOW    │     Dogs         │   Cash Cows      │
GROWTH │  ⬜ Product D    │  🟢 Product B    │
       └──────────────────┴──────────────────┘
          LOW SHARE           HIGH SHARE
```

---

## 4. Trend

**Purpose:** Growth, trajectory, experience curve, market evolution. Shows direction and rate of change over time.

**Sub-types:**
- **Simple Trend:** Single metric over time (line chart)
- **Multi-series Trend:** Compare multiple entities over time (grouped lines)
- **Experience Curve:** Log-log plot of cost per unit vs cumulative volume — as volume doubles, cost falls 20-30%
- **Area/Stacked:** Market share evolution, composition change over time

**Experience Curve specifics:**
- X-axis: Cumulative production volume (log scale)
- Y-axis: Unit cost or price (log scale)
- Slope = learning rate (e.g., "80% experience curve" = cost drops 20% each time volume doubles)
- Annotation: mark competitor positions and gap

**Markdown rendering:**
```
Year:    2019    2020    2021    2022    2023
─────────────────────────────────────────────
Revenue:  $100M   $118M   $142M   $171M   $205M
YoY %:    —       +18%    +20%    +20%    +20%
▓▓▓       ▓▓▓▓    ▓▓▓▓▓   ▓▓▓▓▓▓  ▓▓▓▓▓▓▓▓

Trend: 20% CAGR — market growing ahead of GDP
```

---

## 5. Decomposition (Value Bridge Waterfall)

**Purpose:** Decompose a total into parts, or show how value is built up or destroyed across components. EBITDA bridge, revenue walk, cost breakdown, savings waterfall.

**Layout:**
- Horizontal waterfall: start bar (total/baseline) → delta bars (positive = gain, negative = loss) → end bar (result)
- Bar labels above each bar (value + sign)
- Connecting horizontal lines at top of each bar
- Color coding: green (gains), red (losses), grey (total bars)

**Annotation requirements:**
- Label each delta bar with a brief insight ("Price increase +$12M")
- Highlight largest positive and largest negative
- Add "So what?" annotation: "Net improvement of $Xm driven primarily by [factor]"

**Markdown rendering:**
```
START:    $200M
+ Revenue mix:  +$35M  [BCG Green]
+ Price/unit:   +$12M  [BCG Green]
- Volume loss:  -$18M  [BCG Red]
- Cost inflation: -$8M [BCG Red]
──────────────────────────────────
END:      $221M  (+10.5%)
```

---

## 6. Strategic (Three Horizons)

**Purpose:** Portfolio strategy across time. Horizon 1 (defend and extend core), Horizon 2 (build emerging businesses), Horizon 3 (seed future options).

**Horizon definitions:**
- **H1 (0-2 years):** Core business — protect, optimize, harvest. High certainty, high return.
- **H2 (2-5 years):** Growth businesses — build, scale, invest. Medium certainty, medium return.
- **H3 (5+ years):** Emerging options — explore, experiment, create options. Low certainty, high potential.

**Layout:**
- Three overlapping bell curves (or S-curves) on a time axis
- Each initiative plotted on the curve where it sits
- Investment allocation annotated (e.g., H1: 70%, H2: 20%, H3: 10%)
- Strategic question: "Are we over-investing in H1 at the cost of future growth?"

**Markdown rendering:**
```
                  H1 (Core)    H2 (Growth)    H3 (Options)
─────────────────────────────────────────────────────────────
Timeframe:        Now–2yr      2–5yr          5yr+
Investment:       70%          20%            10%
Certainty:        High         Medium         Low
Initiatives:
  - [Initiative A] ✓
  - [Initiative B]              ✓
  - [Initiative C]                             ✓

Strategic gap: H2 pipeline underfunded — risk to 5yr growth
```

---

## 7. MECE Issue Tree

**Purpose:** Decompose a governing question into sub-questions, ensuring Mutually Exclusive, Collectively Exhaustive coverage. Used in Step 1 (Issue Tree) and as a slide type for showing problem structure.

**Layout:**
- Hierarchical tree: Governing Question at root → 2-4 branches → 2-3 leaves per branch
- Annotate each node with the analytical question it answers
- Mark MECE status at each level (✅ MECE / ❌ violation)
- Circle or highlight the "decisive branch" — the one that most changes the recommendation

**Markdown rendering:**
```
GOVERNING QUESTION
├── Branch 1: [Sub-question] ✅
│   ├── 1a: [Leaf question]
│   └── 1b: [Leaf question]
├── Branch 2: [Sub-question] ✅
│   ├── 2a: [Leaf question]
│   └── 2b: [Leaf question]
└── Branch 3: [Sub-question] ✅
    ├── 3a: [Leaf question]
    └── 3b: [Leaf question]

MECE check: No overlap ✅ | Full coverage ✅ | Decisive branch: Branch 2
```

---

## 8. Narrative Comparison (Side-by-Side)

**Purpose:** Direct narrative contrast — current state vs future state, "as-is" vs "to-be", hypothesis confirmed vs rejected. Used for recommendation slides with clear before/after structure.

**Layout:**
- Two equal columns with dividing line
- Left: "Current State / As-Is / Against hypothesis"
- Right: "Future State / To-Be / For hypothesis"
- Matching row structure for direct comparison
- Color coding: left = neutral/grey, right = BCG Blue/green (positive direction)
- Governing conclusion at bottom spanning both columns

**Markdown rendering:**
```
CURRENT STATE (As-Is)           │  FUTURE STATE (To-Be)
────────────────────────────────┼─────────────────────────────────
Revenue: $200M flat (3yr)       │  Revenue: $280M target (+40%)
NPS: 42 (declining)             │  NPS: 65+ (top quartile)
Market share: 12% (−4pts)       │  Market share: 18% (recovered)
Margin: 18% (below benchmark)   │  Margin: 24% (industry median)

Governing conclusion: Achieving the future state requires
prioritising [specific action] over the next 18 months.
```
