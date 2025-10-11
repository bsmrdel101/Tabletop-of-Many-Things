import { describe, it, expect, beforeEach, beforeAll, afterAll } from 'vitest';
import { client, resetDb } from '../resetDatabase';
import { setApiBaseUrl } from '@/scripts/config/axios';
import { loginUser } from '@/services/userService';
import { editCharacter, getCharacterById } from '@/rulesets/dnd/services/charactersService';

beforeAll(async () => {
  setApiBaseUrl('http://localhost:8001');
});

beforeEach(async () => {
  await resetDb();
  await loginUser({ username: 'dev', password: '123' });
});

afterAll(async () => {
  await client.end();
});


describe('Character Integration', () => {
  it('Override AC', async () => {
    const res = await getCharacterById(1);
    if (!res) return;
    const character = { ...res, acMod: 2, acOverride: 18 };
    await editCharacter(character);
    const newCharacter = await getCharacterById(1);
    if (!newCharacter) return;
    expect(newCharacter).toEqual(expect.objectContaining({ ac: 18, acMod: 2, acOverride: 18 }));
  });

  it('Add AC mod', async () => {
    const res = await getCharacterById(1);
    if (!res) return;
    const character = { ...res, acMod: 2, acOverride: 0 };
    await editCharacter(character);
    const newCharacter = await getCharacterById(1);
    if (!newCharacter) return;
    expect(newCharacter).toEqual(expect.objectContaining({ ac: 12, acMod: 2, acOverride: 0 }));
  });

  it('Edit character', async () => {
    const character = {
      id: 1,
      maxHpMod: 0,
      maxHpOverride: 0,
      hp: 20,
      acMod: 0,
      acOverride: 0,
      tempHp: 0,
      name: 'Ziggy'
    } as any;
    await editCharacter(character);
    const res = await getCharacterById(character.id);
    expect(res).toEqual(expect.objectContaining(character));
  });
});
