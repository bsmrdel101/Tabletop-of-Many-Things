import { rollCheck, rollDC, rollDice } from '@/rulesets/dnd/scripts/gameplayMechanics';
import { createDice } from '@/rulesets/dnd/scripts/utils';
import { afterEach, describe, expect, test, vi } from 'vitest';


describe('createDice', () => {
  test('Make dice object', () => {
    expect(createDice(1, 20)).toEqual({ amount: 1, type: 20, mod: 0, display: '1d20' });
  });

  test('Make dice object with mod', () => {
    expect(createDice(1, 12, 4)).toEqual({ amount: 1, type: 12, mod: 4, display: '1d12+4' });
  });

  test('Make dice object with negative mod', () => {
    expect(createDice(1, 12, -4)).toEqual({ amount: 1, type: 12, mod: -4, display: '1d12-4' });
  });
});

describe('rollDice', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Single dice', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.2);
    const dice = [{ amount: 1, type: 20, mod: 0, display: '1d20' }];
    const { total, rolled } = rollDice(dice);
    expect(total).toEqual(5);
    expect(rolled).toEqual(5);
  });

  test('Single dice with mod', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.2);
    const dice = [{ amount: 1, type: 20, mod: 2, display: '1d20+2' }];
    const { total, rolled } = rollDice(dice, 2);
    expect(total).toEqual(9);
    expect(rolled).toEqual(7);
  });

  test('Multiple dice', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.2);
    const dice = [
      { amount: 1, type: 10, mod: 0, display: '1d10' },
      { amount: 2, type: 6, mod: 2, display: '2d6+2' }
    ];
    const { total, rolled } = rollDice(dice);
    expect(total).toEqual(9);
    expect(rolled).toEqual(9);
  });

  test('Multiple dice with mod', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.2);
    const dice = [
      { amount: 1, type: 10, mod: 0, display: '1d10' },
      { amount: 2, type: 6, mod: 2, display: '2d6+2' },
      { amount: 3, type: 4, mod: 1, display: '3d4+1' },
    ];
    const { total, rolled } = rollDice(dice, 4);
    expect(total).toEqual(17);
    expect(rolled).toEqual(13);
  });

  test('Many dice with mod', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.2);
    const dice = [
      { amount: 1, type: 10, mod: 0, display: '1d10' },
      { amount: 2, type: 6, mod: 2, display: '2d6+2' },
      { amount: 3, type: 4, mod: 1, display: '3d4+1' },
      { amount: 2, type: 8, mod: 1, display: '2d8+1' },
      { amount: 1, type: 6, mod: 0, display: '1d6' },
      { amount: 2, type: 10, mod: 4, display: '2d10+4' },
      { amount: 1, type: 12, mod: 0, display: '1d12' },
      { amount: 10, type: 6, mod: 3, display: '10d6+3' },
      { amount: 3, type: 4, mod: 1, display: '3d4+1' },
      { amount: 3, type: 6, mod: 0, display: '3d6' }
    ];
    const { total, rolled } = rollDice(dice, 6);
    expect(total).toEqual(72);
    expect(rolled).toEqual(66);
  });

  test('Multiple dice with negative mod', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.2);
    const dice = [
      { amount: 1, type: 10, mod: 0, display: '1d10' },
      { amount: 2, type: 6, mod: -1, display: '2d6-1' },
    ];
    const { total, rolled } = rollDice(dice, -2);
    expect(total).toEqual(4);
    expect(rolled).toEqual(6);
  });
});

describe('rollDC', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Successful dice roll', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.4);
    expect(rollDC(12, 4)).toEqual({ target: 12, roll: 13, success: true });
  });

  test('Failed dice roll', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.2);
    expect(rollDC(12, 4)).toEqual({ target: 12, roll: 9, success: false });
  });
});

describe('rollCheck', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Roll with no result', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.4);
    expect(rollCheck(2)).toEqual(null);
  });

  test('Successful dice roll', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.3);
    expect(rollCheck(4, 11)).toEqual({ target: 11, roll: 11, success: true });
  });

  test('Failed dice roll', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.3);
    expect(rollCheck(0, 11)).toEqual({ target: 11, roll: 7, success: false });
  });
});
