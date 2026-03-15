import { describe, test, expect } from 'bun:test';
import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(import.meta.dir, '..');
const SKILLS_DIR = path.join(ROOT, 'skills');

// ─── Helpers ────────────────────────────────────────────────

function getSkillDirs(): string[] {
  if (!fs.existsSync(SKILLS_DIR)) return [];
  return fs.readdirSync(SKILLS_DIR)
    .filter(name => fs.statSync(path.join(SKILLS_DIR, name)).isDirectory())
    .sort();
}

function parseFrontmatter(content: string): Record<string, unknown> | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  // Minimal YAML parser for our frontmatter schema (no external deps)
  const yaml: Record<string, unknown> = {};
  const lines = match[1].split('\n');
  let currentKey: string | null = null;
  let listItems: string[] = [];

  for (const line of lines) {
    if (line.startsWith('  - ')) {
      // List item under currentKey
      if (currentKey) listItems.push(line.slice(4).trim());
    } else if (line.match(/^[a-z]/)) {
      // Flush previous list if any
      if (currentKey && listItems.length > 0) {
        yaml[currentKey] = listItems;
        listItems = [];
      }
      const colonIdx = line.indexOf(':');
      if (colonIdx === -1) continue;
      currentKey = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim();
      if (value && value !== '|') {
        yaml[currentKey] = value;
        currentKey = null; // simple scalar, no continuation
      }
    } else if (line.startsWith('  ') && currentKey && listItems.length === 0) {
      // Multi-line scalar (description: |)
      const existing = yaml[currentKey] as string | undefined;
      yaml[currentKey] = (existing ? existing + '\n' : '') + line.trim();
    }
  }

  // Flush final list
  if (currentKey && listItems.length > 0) {
    yaml[currentKey] = listItems;
  }

  return yaml;
}

const VALID_TOOLS = new Set([
  'Read', 'Edit', 'Write', 'Bash', 'Glob', 'Grep',
  'Agent', 'AskUserQuestion', 'WebSearch', 'WebFetch',
  'NotebookEdit', 'mcp__ide__executeCode', 'mcp__ide__getDiagnostics',
  'TaskCreate', 'TaskUpdate', 'TaskGet', 'TaskList', 'TaskOutput', 'TaskStop',
]);

// ─── Tests ──────────────────────────────────────────────────

describe('Skill directory structure', () => {
  test('skills/ directory exists', () => {
    expect(fs.existsSync(SKILLS_DIR)).toBe(true);
  });

  test('at least one skill directory exists', () => {
    expect(getSkillDirs().length).toBeGreaterThan(0);
  });

  for (const skillName of getSkillDirs()) {
    const skillDir = path.join(SKILLS_DIR, skillName);

    test(`${skillName}: SKILL.md.tmpl exists`, () => {
      expect(fs.existsSync(path.join(skillDir, 'SKILL.md.tmpl'))).toBe(true);
    });

    test(`${skillName}: SKILL.md exists (generated)`, () => {
      expect(fs.existsSync(path.join(skillDir, 'SKILL.md'))).toBe(true);
    });
  }
});

describe('SKILL.md frontmatter validation', () => {
  for (const skillName of getSkillDirs()) {
    const skillPath = path.join(SKILLS_DIR, skillName, 'SKILL.md');
    if (!fs.existsSync(skillPath)) continue;

    const content = fs.readFileSync(skillPath, 'utf-8');
    const fm = parseFrontmatter(content);

    test(`${skillName}: has valid YAML frontmatter`, () => {
      expect(fm).not.toBeNull();
    });

    test(`${skillName}: frontmatter has required 'name' field`, () => {
      expect(fm?.name).toBeTruthy();
    });

    test(`${skillName}: frontmatter 'name' matches directory name`, () => {
      expect(fm?.name).toBe(skillName);
    });

    test(`${skillName}: frontmatter has required 'version' field`, () => {
      expect(fm?.version).toBeTruthy();
    });

    test(`${skillName}: frontmatter has required 'description' field`, () => {
      expect(fm?.description).toBeTruthy();
    });

    test(`${skillName}: frontmatter has 'allowed-tools' list`, () => {
      expect(Array.isArray(fm?.['allowed-tools'])).toBe(true);
      expect((fm?.['allowed-tools'] as string[]).length).toBeGreaterThan(0);
    });

    test(`${skillName}: all allowed-tools are valid Claude Code tool names`, () => {
      const tools = fm?.['allowed-tools'] as string[] | undefined;
      if (!tools) return;
      const invalid = tools.filter(t => !VALID_TOOLS.has(t));
      expect(invalid).toEqual([]);
    });
  }
});

describe('Generated SKILL.md freshness', () => {
  for (const skillName of getSkillDirs()) {
    const skillDir = path.join(SKILLS_DIR, skillName);
    const skillPath = path.join(skillDir, 'SKILL.md');
    if (!fs.existsSync(skillPath)) continue;

    const content = fs.readFileSync(skillPath, 'utf-8');

    test(`${skillName}: no unresolved {{placeholders}} in SKILL.md`, () => {
      const unresolved = content.match(/\{\{\w+\}\}/g);
      expect(unresolved).toBeNull();
    });

    test(`${skillName}: SKILL.md has AUTO-GENERATED header`, () => {
      expect(content).toContain('AUTO-GENERATED');
    });
  }
});

describe('Persona skill content validation', () => {
  const personaSkills = ['plan-musk', 'plan-jobs', 'plan-altman', 'plan-bezos', 'plan-feynman'];

  for (const skillName of personaSkills) {
    const skillPath = path.join(SKILLS_DIR, skillName, 'SKILL.md');
    if (!fs.existsSync(skillPath)) continue;

    const content = fs.readFileSync(skillPath, 'utf-8');

    test(`${skillName}: has PRE-REVIEW SYSTEM AUDIT section`, () => {
      expect(content).toContain('PRE-REVIEW SYSTEM AUDIT');
    });

    test(`${skillName}: has Step 0 section`, () => {
      expect(content).toContain('Step 0');
    });

    test(`${skillName}: has AskUserQuestion reference`, () => {
      expect(content).toContain('AskUserQuestion');
    });

    test(`${skillName}: has Completion Summary`, () => {
      expect(content).toContain('Completion Summary');
    });

    test(`${skillName}: has an opening quote`, () => {
      expect(content).toMatch(/^>\s*"/m);
    });
  }
});

describe('plan-board meta-skill validation', () => {
  const boardPath = path.join(SKILLS_DIR, 'plan-board', 'SKILL.md');
  if (!fs.existsSync(boardPath)) {
    test.skip('plan-board/SKILL.md not found', () => {});
  } else {
    const content = fs.readFileSync(boardPath, 'utf-8');

    test('plan-board: references all three lenses', () => {
      expect(content).toContain('Musk');
      expect(content).toContain('Jobs');
      expect(content).toContain('Altman');
    });

    test('plan-board: has GREEN section (consensus)', () => {
      expect(content).toContain('GREEN');
    });

    test('plan-board: has RED section (disagreements)', () => {
      expect(content).toContain('RED');
    });

    test('plan-board: has Board Verdict table', () => {
      expect(content).toContain('BOARD VERDICT');
    });

    test('plan-board: has final recommendation options', () => {
      expect(content).toContain('PROCEED');
      expect(content).toContain('REDESIGN');
      expect(content).toContain('HOLD');
    });

    test('plan-board: has Completion Summary', () => {
      expect(content).toContain('Completion Summary');
    });
  }
});

describe('browse-qa action skill validation', () => {
  const browsePath = path.join(SKILLS_DIR, 'browse-qa', 'SKILL.md');
  if (!fs.existsSync(browsePath)) {
    test.skip('browse-qa/SKILL.md not found', () => {});
  } else {
    const content = fs.readFileSync(browsePath, 'utf-8');

    test('browse-qa: references browser usage', () => {
      expect(content).toContain('browser');
    });

    test('browse-qa: asks user for URL', () => {
      expect(content).toContain('URL');
    });

    test('browse-qa: has structured report output section', () => {
      expect(content).toContain('QA Report');
    });

    test('browse-qa: has CRITICAL RULE about silent failures', () => {
      expect(content).toContain('NEVER');
    });

    test('browse-qa: has AskUserQuestion reference', () => {
      expect(content).toContain('AskUserQuestion');
    });

    test('browse-qa: has Completion Summary', () => {
      expect(content).toContain('Completion Summary');
    });
  }
});

describe('Version consistency', () => {
  test('all skills have the same version as package.json', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'));
    const expectedVersion = pkg.version;

    for (const skillName of getSkillDirs()) {
      const skillPath = path.join(SKILLS_DIR, skillName, 'SKILL.md');
      if (!fs.existsSync(skillPath)) continue;

      const content = fs.readFileSync(skillPath, 'utf-8');
      const fm = parseFrontmatter(content);
      if (!fm) continue;

      expect(fm.version).toBe(expectedVersion);
    }
  });
});
