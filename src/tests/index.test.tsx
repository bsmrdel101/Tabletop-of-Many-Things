import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';


describe('Dashboard', () => {
  test('Render App', () => {
    render(<h1 data-testid="dashboard-title" className="page-title">Dashboard</h1>);
    const dashboardTitle = screen.queryByTestId('dashboard-title');
    expect(dashboardTitle?.innerHTML).toEqual('Dashboard');
  });
});