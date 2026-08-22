import { describe, it, expect, beforeEach, beforeAll, afterAll } from 'vitest';
import { client, resetDb } from '../resetDatabase';
import { setApiBaseUrl } from '@/scripts/config/axios';
import { loginUser } from '@/services/userService';
import { getCharacterById } from '@/rulesets/dnd/services/charactersService';

beforeAll(async () => {
  setApiBaseUrl('http://localhost:8001');
});

beforeEach(async () => {
  await resetDb();
  await loginUser({ email: 'dev@gmail.com', password: '123' });
});

afterAll(async () => {
  await client.end();
});


describe('Classes Integration', () => {
  it('Edit player class', async () => {
    // await editPlayerClass({ id: 1, lvl: 4, subclassId: null });
    const res = await getCharacterById(1);
    expect(res).toEqual(expect.objectContaining({ lvl: 4 }));
  });
});
