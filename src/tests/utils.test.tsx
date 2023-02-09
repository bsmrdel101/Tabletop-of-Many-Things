import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { clamp, convertACTypeFormat, convertAtSpecificLevelTypeFormat, convertDamageTypeFormat, convertDCTypeFormat, convertDiceTypeFormat, findCell, getAbilityScoreMod, getCoords } from '../scripts/tools/utils';


describe('Clamp', () => {
  test('Can set number between min and max', () => {
    expect(clamp(5, 6, 10)).toBe(6);
    expect(clamp(11, 6, 10)).toBe(10);
  });
});

describe('Find Cell', () => {
  const cells = (
    <>
      <div data-testid="cell1" className="grid__cell" data-cell-x="1" data-cell-y="1"></div>
      <div data-testid="cell2" className="grid__cell" data-cell-x="2" data-cell-y="1"></div>
      <div className="grid__cell" data-cell-x="3" data-cell-y="1"></div>
    </>
  );

  test('Find cell (1,1)', () => {
    render(cells);
    const cell1 = screen.queryByTestId('cell1');
    expect(findCell(1, 1)).toBe(cell1);
  });

  test('Can\'t find cell (1,1)', () => {
    render(cells);
    const cell1 = screen.queryByTestId('cell1');
    expect(findCell(1, 2)).not.toBe(cell1);
  });

  test('Find cell (2,1)', () => {
    render(cells);
    const cell2 = screen.queryByTestId('cell2');
    expect(findCell(2, 1)).toBe(cell2);
  });
});

describe('Get Coords', () => {
  test('Returns correct x and y values', () => {
    const div = document.createElement('div');
    div.setAttribute('data-cell-x', '1');
    div.setAttribute('data-cell-y', '1');
    expect(getCoords(div)).toEqual({ x: 1, y: 1 });
  });
});

describe('Get Ability Score Mod', () => {
  test('Returns the modifier of an ability score', () => {
    expect(getAbilityScoreMod(20)).toEqual(5);
    expect(getAbilityScoreMod(9)).toEqual(-1);
  });
});

describe('Convert DC type', () => {
  test('Change DC from old format to new format', () => {
    const oldFormat = {
      dc_type: {index: "con", name: "CON", url: "/api/ability-scores/con"},
      dc_value: 14,
      success_type: 'none'
    };   
    const newFormat = {
      type: 'con',
      value: 14,
      successType: 'none'
    };    
    expect(convertDCTypeFormat(oldFormat)).toEqual(newFormat);
  });
});

describe('Convert damage type format', () => {
  test('Change damage from old format to new format', () => {
    const oldFormat = [
      { damage_type: {index: "bludgeoning", name: "Bludgeoning", url: "/api/damage-types/bludgeoning"}, damage_dice: '2d6+5' },
      { damage_type: {index: "acid", name: "Acid", url: "/api/damage-types/acid"}, damage_dice: '1d12' }
    ];
    const newFormat = [
      { type: 'bludgeoning', dice: { amount: 2, type: 6, mod: 5 } },
      { type: 'acid', dice: { amount: 1, type: 12, mod: 0 } }
    ];
    expect(convertDamageTypeFormat(oldFormat)).toEqual(newFormat);
  });
});

describe('Convert dice type format', () => {
  test('Change dice from old format to new format', () => {
    const oldFormat = '3d8+5';
    const newFormat = { amount: 3, type: 8, mod: 5 };
    expect(convertDiceTypeFormat(oldFormat)).toEqual(newFormat);
  });

  test('Change dice from old format to new format with minus mod', () => {
    const oldFormat = '4d6-2';
    const newFormat = { amount: 4, type: 6, mod: -2 };
    expect(convertDiceTypeFormat(oldFormat)).toEqual(newFormat);
  });

  test('Change dice from old format to new format with no mod', () => {
    const oldFormat = '1d20';
    const newFormat = { amount: 1, type: 20, mod: 0 };
    expect(convertDiceTypeFormat(oldFormat)).toEqual(newFormat);
  });
});

describe('Convert AC type format', () => {
  test('Change AC from old format to new format', () => {
    const oldFormat = [
      {
        type: 'armor',
        value: 15,
        armor: [
          {'index': 'leather-armor','name': 'Leather Armor','url': '/api/equipment/leather-armor'},
          {'index': 'shield','name': 'Shield','url': '/api/equipment/shield'}
        ]
      }
    ];
    const newFormat = 15;
    expect(convertACTypeFormat(oldFormat)).toEqual(newFormat);
  });

  test('Change AC from old format to new format with multiple armor', () => {
    const oldFormat = [
      {
        type: 'armor',
        value: 15,
        armor: [
          {'index': 'leather-armor','name': 'Leather Armor','url': '/api/equipment/leather-armor'},
          {'index': 'shield','name': 'Shield','url': '/api/equipment/shield'}
        ]
      },
      {
        type: 'bonus',
        value: 2,
        armor: [
          {'index': 'gauntlets','name': 'Leather Armor','url': '/api/equipment/leather-armor'}
        ]
      }
    ];
    const newFormat = 17;
    expect(convertACTypeFormat(oldFormat)).toEqual(newFormat);
  });
});

describe('Convert at specific level type format', () => {
  test('Change spell damage type to correct format', () => {
    const obj = {
      1: '1d8',
      5: '2d8',
      11: '3d8',
      17: '4d8'
    };
    const newObj = [
      { level: 1, dice: { amount: 1, type: 8, mod: 0 } },
      { level: 5, dice: { amount: 2, type: 8, mod: 0 } },
      { level: 11, dice: { amount: 3, type: 8, mod: 0 } },
      { level: 17, dice: { amount: 4, type: 8, mod: 0 } }
  ];
    expect(convertAtSpecificLevelTypeFormat(obj)).toEqual(newObj);
  });
});
