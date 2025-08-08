import { formatCharacterCardClasses, formatCharacterClasses, removeNullObjProps } from '@/scripts/tools/utils';
import { describe, expect, test } from 'vitest';


describe('removeNullObjProps', () => {
  test('Filter null values from object', () => {
    expect(removeNullObjProps({ id: 1, name: null })).toEqual({ id: 1 });
  });
});

describe('formatCharacterClasses', () => {
  test('One class', () => {
    const classes = [
      { id: 1, name: 'Rouge', lvl: 3, subclass: { name: 'Thief' }}
    ] as any;
    expect(formatCharacterClasses(classes)).toEqual('Thief Rouge lvl 3');
  });

  test('Multiple classes', () => {
    const classes = [
      { id: 1, name: 'Rouge', lvl: 3, subclass: { name: 'Thief' }},
      { id: 2, name: 'Barbarian', lvl: 1, subclass: null },
    ] as any;
    expect(formatCharacterClasses(classes)).toEqual('Thief Rouge lvl 3 / Barbarian lvl 1');
  });

  test('No classes', () => {
    expect(formatCharacterClasses([])).toEqual('');
  });
});

describe('formatCharacterCardClasses', () => {
  test('One class', () => {
    const classes = [
      { name: 'Rouge', lvl: 3, subclass: 'Thief' }
    ] as any;
    expect(formatCharacterCardClasses(classes)).toEqual('Thief Rouge 3');
  });

  test('Multiple classes', () => {
    const classes = [
      { name: 'Rouge', lvl: 3, subclass: 'Thief' },
      { name: 'Barbarian', lvl: 1, subclass: null },
    ] as any;
    expect(formatCharacterCardClasses(classes)).toEqual('Thief Rouge 3 / Barbarian 1');
  });

  test('No classes', () => {
    expect(formatCharacterCardClasses([])).toEqual('');
  });
});
