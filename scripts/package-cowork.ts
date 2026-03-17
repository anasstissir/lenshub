#!/usr/bin/env bun
/**
 * Package Cowork skills into a ZIP for upload via Cowork UI.
 *
 * Reads all skills with `platform: cowork` or `platform: both` in SKILL.md
 * frontmatter, and creates dist/cowork-skills-v{VERSION}.zip.
 *
 * Usage: bun run package:cowork
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const ROOT = path.resolve(import.meta.dir, '..');
const SKILLS_DIR = path.join(ROOT, 'skills');
const DIST_DIR = path.join(ROOT, 'dist');

function getVersion(): string {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'));
  return pkg.version as string;
}

function parsePlatform(skillPath: string): string | null {
  if (!fs.existsSync(skillPath)) return null;
  const content = fs.readFileSync(skillPath, 'utf-8');
  const match = content.match(/^---\n[\s\S]*?\n---/);
  if (!match) return null;
  const platformMatch = match[0].match(/^platform:\s*(\S+)/m);
  return platformMatch ? platformMatch[1] : null;
}

function getCoworkSkills(): string[] {
  if (!fs.existsSync(SKILLS_DIR)) return [];
  return fs.readdirSync(SKILLS_DIR)
    .filter(name => {
      const skillPath = path.join(SKILLS_DIR, name, 'SKILL.md');
      const platform = parsePlatform(skillPath);
      return platform === 'cowork' || platform === 'both';
    })
    .sort();
}

const version = getVersion();
const skills = getCoworkSkills();

if (skills.length === 0) {
  console.error('No skills with platform: cowork or platform: both found.');
  process.exit(1);
}

console.log(`Packaging ${skills.length} Cowork skill(s): ${skills.join(', ')}`);

// Ensure dist/ exists
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

// One ZIP per skill (Cowork requires exactly one SKILL.md per upload)
console.log(`\nCreated:`);
for (const skill of skills) {
  const zipName = `cowork-${skill}-v${version}.zip`;
  const zipPath = path.join(DIST_DIR, zipName);

  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

  const refsDir = path.join(ROOT, 'skills', skill, 'references');
  const hasRefs = fs.existsSync(refsDir);
  const zipCmd = hasRefs
    ? `cd "${ROOT}/skills/${skill}" && zip -r "${zipPath}" SKILL.md references/`
    : `cd "${ROOT}/skills/${skill}" && zip "${zipPath}" SKILL.md`;
  execSync(zipCmd, { stdio: 'inherit' });
  console.log(`  ✓ dist/${zipName}`);
}
