# EY Framework Library

Reference for Step 4 (Framework Pass) in ey-slide. Each entry includes purpose, layout spec, and pptxgenjs implementation notes.

---

## 1. POINT Narrative

**Purpose:** Primary storytelling structure. One slide = one POINT element. Used for Position, Transition, and standalone argument slides.

**Layout:**
- Large action-title headline (full-width, top)
- 3-5 body bullets (left 60%), each max 12 words
- Supporting callout or pull-quote (right 40%, EY Yellow accent box)
- Source/footnote (bottom-left, 8pt)

**pptxgenjs notes:**
```typescript
slide.addText(title, { x: 0.5, y: 0.3, w: 9, h: 0.8, fontSize: 22, bold: true, color: '2E2E38' });
slide.addText(bullets, { x: 0.5, y: 1.3, w: 5.5, h: 4, fontSize: 14, bullet: true });
slide.addShape(pptx.ShapeType.rect, { x: 6.3, y: 1.3, w: 3.2, h: 2, fill: { color: 'FFE600' } });
slide.addText(callout, { x: 6.4, y: 1.4, w: 3.0, h: 1.8, fontSize: 13, bold: true, color: '2E2E38' });
```

---

## 2. 5-Box Executive Summary

**Purpose:** Self-contained brief for the exec audience. Goes on slide 2 immediately after cover. Must stand alone as a 1-page summary.

**Layout:**
- Five equal-width boxes in a horizontal row (or 2+3 stacked if content is dense)
- Box labels (bold, small caps): BUSINESS ISSUE | APPROACH | KEY FINDINGS | RECOMMENDATIONS | NEXT STEPS
- Each box: 1-3 sentences max
- Box borders: 1pt EY Dark Grey; active/focus box highlighted with EY Yellow top border (3pt)

**pptxgenjs notes:**
```typescript
const boxes = ['BUSINESS ISSUE', 'APPROACH', 'KEY FINDINGS', 'RECOMMENDATIONS', 'NEXT STEPS'];
boxes.forEach((label, i) => {
  const x = 0.3 + i * 1.92;
  slide.addShape(pptx.ShapeType.rect, { x, y: 1.2, w: 1.85, h: 4.5, line: { color: '2E2E38', pt: 1 } });
  slide.addText(label, { x: x + 0.05, y: 1.25, w: 1.75, h: 0.4, fontSize: 9, bold: true, color: '2E2E38' });
  slide.addText(content[i], { x: x + 0.05, y: 1.7, w: 1.75, h: 3.9, fontSize: 11, color: '2E2E38' });
});
```

---

## 3. 2×2 Priority Matrix

**Purpose:** Prioritization and trade-off decisions. Plot initiatives, risks, or options on two axes. Common: Impact vs Effort, Urgency vs Importance, Risk vs Return.

**Layout:**
- Full-slide 2x2 grid
- Axis labels (bold) on X and Y
- Quadrant labels (top-right: "Quick Wins", top-left: "Strategic Bets", bottom-right: "Fill-Ins", bottom-left: "Deprioritise")
- Items plotted as labelled circles (EY Yellow fill for prioritised items)
- Legend bottom-right

**pptxgenjs notes:**
```typescript
// Draw quadrant lines
slide.addShape(pptx.ShapeType.line, { x: 5, y: 1.2, w: 0, h: 5, line: { color: '2E2E38', pt: 1.5 } });
slide.addShape(pptx.ShapeType.line, { x: 0.5, y: 3.7, w: 9, h: 0, line: { color: '2E2E38', pt: 1.5 } });
// Plot items as circles
items.forEach(item => {
  slide.addShape(pptx.ShapeType.ellipse, { x: item.x, y: item.y, w: 0.6, h: 0.6, fill: { color: item.priority ? 'FFE600' : 'D8D8D8' } });
  slide.addText(item.label, { x: item.x + 0.65, y: item.y + 0.1, fontSize: 10 });
});
```

---

## 4. Traffic Light Dashboard

**Purpose:** Status tracking, KPI summaries, risk registers. Green/Amber/Red indicators communicate health at a glance.

**Layout:**
- Table with rows = items/KPIs, columns = Name | Status (RAG) | Comment | Owner | Due Date
- RAG circle in Status column (filled: Green #00A859, Amber #FFB81C, Red #E4002B)
- Alternating row shading (white / very light grey #F5F5F5)
- Bold header row (EY Dark Grey #2E2E38 background, white text)

**pptxgenjs notes:**
```typescript
const ragColor = { green: '00A859', amber: 'FFB81C', red: 'E4002B' };
rows.forEach((row, i) => {
  const y = 1.5 + i * 0.6;
  slide.addShape(pptx.ShapeType.rect, { x: 0.3, y, w: 9.4, h: 0.55, fill: { color: i % 2 ? 'F5F5F5' : 'FFFFFF' } });
  slide.addShape(pptx.ShapeType.ellipse, { x: 3.5, y: y + 0.08, w: 0.4, h: 0.4, fill: { color: ragColor[row.rag] } });
  slide.addText(row.name, { x: 0.4, y: y + 0.1, w: 3, h: 0.4, fontSize: 11 });
  slide.addText(row.comment, { x: 4.1, y: y + 0.1, w: 3.5, h: 0.4, fontSize: 11 });
});
```

---

## 5. Journey Map

**Purpose:** Illustrate a process, customer experience, or transformation programme across phases. Shows current state pain points and future state improvements.

**Layout:**
- Horizontal swim-lane: phases across top (equal-width columns), rows = Actor / Actions / Pain Points / Opportunities
- Phase headers: EY Yellow background, dark text
- Pain points: Red accent annotations
- Opportunities: Green accent annotations
- Connecting arrows between phase columns

**pptxgenjs notes:**
```typescript
phases.forEach((phase, i) => {
  const x = 0.4 + i * (9.2 / phases.length);
  const w = 9.2 / phases.length - 0.1;
  slide.addShape(pptx.ShapeType.rect, { x, y: 0.8, w, h: 0.5, fill: { color: 'FFE600' } });
  slide.addText(phase.name, { x, y: 0.85, w, h: 0.4, fontSize: 11, bold: true, align: 'center' });
  // Add content rows below
  slide.addText(phase.actions, { x, y: 1.5, w, h: 1.2, fontSize: 10, bullet: true });
  slide.addText(phase.painPoints, { x, y: 2.8, w, h: 1.0, fontSize: 10, color: 'E4002B', bullet: true });
  slide.addText(phase.opportunities, { x, y: 3.9, w, h: 1.0, fontSize: 10, color: '00A859', bullet: true });
});
```

---

## 6. Value Bridge Waterfall

**Purpose:** Show how value is created or destroyed across components. Revenue bridge, cost walk, savings decomposition, EBITDA bridge.

**Layout:**
- Horizontal waterfall: start bar (leftmost), positive/negative delta bars, end bar (rightmost)
- Positive deltas: EY Yellow or Green fill
- Negative deltas: EY Red (#E4002B) fill
- Start and end bars: EY Dark Grey fill
- Value labels above/below each bar
- Connector lines between bars

**pptxgenjs notes:**
```typescript
let baseline = startValue;
bars.forEach((bar, i) => {
  const x = 0.5 + i * 1.1;
  const isPositive = bar.value >= 0;
  const barY = isPositive ? yScale(baseline + bar.value) : yScale(baseline);
  const barH = Math.abs(yScale(0) - yScale(bar.value));
  slide.addShape(pptx.ShapeType.rect, {
    x, y: barY, w: 0.9, h: barH,
    fill: { color: bar.isTotal ? '2E2E38' : isPositive ? 'FFE600' : 'E4002B' }
  });
  slide.addText(`${isPositive ? '+' : ''}${bar.value}`, { x, y: barY - 0.3, w: 0.9, h: 0.3, fontSize: 10, align: 'center' });
  baseline += bar.isTotal ? 0 : bar.value;
});
```

---

## 7. Root Cause Analysis (Fishbone / Ishikawa)

**Purpose:** Structured problem decomposition. Identify root causes of a central problem across multiple categories (People, Process, Technology, Policy, Data, Environment).

**Layout:**
- Central horizontal spine pointing to the "effect" box (right side)
- 4-6 diagonal "bones" branching off the spine (category labels at tips)
- Sub-causes as smaller horizontal lines off each bone
- Effect box: EY Yellow border, bold problem statement

**pptxgenjs notes:**
```typescript
// Central spine
slide.addShape(pptx.ShapeType.line, { x: 0.5, y: 3.5, w: 7.5, h: 0, line: { color: '2E2E38', pt: 2 } });
// Effect box
slide.addShape(pptx.ShapeType.rect, { x: 7.8, y: 3.1, w: 1.8, h: 0.8, line: { color: 'FFE600', pt: 2 } });
slide.addText(effect, { x: 7.85, y: 3.2, w: 1.7, h: 0.6, fontSize: 10, bold: true });
// Bones (simplified)
categories.forEach((cat, i) => {
  const isTop = i % 2 === 0;
  const x = 1.2 + i * 1.1;
  const endY = isTop ? 1.5 : 5.5;
  slide.addShape(pptx.ShapeType.line, { x, y: 3.5, w: 0.8, h: isTop ? -2 : 2, line: { color: '2E2E38', pt: 1.5 } });
  slide.addText(cat.name, { x: x - 0.3, y: isTop ? 1.1 : 5.6, w: 1.4, h: 0.4, fontSize: 9, bold: true });
});
```

---

## 8. SWOT Strategic Overview

**Purpose:** Strategic situation analysis. Strengths and Weaknesses (internal) vs Opportunities and Threats (external). Used for market entry, capability assessment, competitive review.

**Layout:**
- 2×2 grid: top-left = Strengths (green), top-right = Opportunities (blue), bottom-left = Weaknesses (amber), bottom-right = Threats (red)
- Internal/External axis labels on X; Positive/Negative axis labels on Y
- Each quadrant: bold label header + 3-5 bulleted insights
- Light background fill per quadrant; bold border at quadrant dividers

**pptxgenjs notes:**
```typescript
const quadrants = [
  { label: 'STRENGTHS',     x: 0.3, y: 1.0, fill: 'E8F5E9', border: '00A859' },
  { label: 'OPPORTUNITIES', x: 5.1, y: 1.0, fill: 'E3F2FD', border: '0E4D92' },
  { label: 'WEAKNESSES',    x: 0.3, y: 3.8, fill: 'FFF8E1', border: 'FFB81C' },
  { label: 'THREATS',       x: 5.1, y: 3.8, fill: 'FFEBEE', border: 'E4002B' },
];
quadrants.forEach(q => {
  slide.addShape(pptx.ShapeType.rect, { x: q.x, y: q.y, w: 4.6, h: 2.6, fill: { color: q.fill }, line: { color: q.border, pt: 1.5 } });
  slide.addText(q.label, { x: q.x + 0.1, y: q.y + 0.1, w: 4.4, h: 0.4, fontSize: 11, bold: true, color: q.border });
  slide.addText(content[q.label], { x: q.x + 0.1, y: q.y + 0.55, w: 4.4, h: 1.9, fontSize: 10, bullet: true });
});
```
