import { removeNullObjProps } from '@/scripts/tools/utils';
import { describe, expect, test } from 'vitest';


describe('RemoveNullObjProps', () => {
  test('Filter null values from object', () => {
    expect(removeNullObjProps({ id: 1, name: null })).toEqual({ id: 1 });
  });
});
