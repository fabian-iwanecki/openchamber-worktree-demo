import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import test from 'node:test';
import pg from 'pg';

test('writes to the database and checkout for this worktree', async () => {
  const marker = process.env.WORKTREE_MARKER;
  assert.ok(marker);
  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  try {
    await client.query('CREATE TABLE IF NOT EXISTS worktree_probe (marker text PRIMARY KEY)');
    await client.query('INSERT INTO worktree_probe VALUES ($1) ON CONFLICT DO NOTHING', [marker]);
    const { rows } = await client.query('SELECT marker FROM worktree_probe');
    assert.deepEqual(rows, [{ marker }]);
    await writeFile('.worktree-marker', marker + '\n');
  } finally {
    await client.end();
  }
});
