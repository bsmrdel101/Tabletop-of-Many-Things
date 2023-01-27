import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { clamp, findCell, getCoords } from '../scripts/tools/utils';

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
