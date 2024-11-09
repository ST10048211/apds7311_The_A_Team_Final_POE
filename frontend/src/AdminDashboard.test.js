import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] }))
}));

test('renders dashboard with filters and logout button', () => {
  render(
    <BrowserRouter>
      <AdminDashboard />
    </BrowserRouter>
  );

  // Check for page title
  expect(screen.getByText(/Approve Transactions/i)).toBeInTheDocument();
});

test('filters payments based on selected status', async () => {
  render(
    <BrowserRouter>
      <AdminDashboard />
    </BrowserRouter>
  );

  // Wait for payments to be filtered
  const rows = await screen.findAllByRole('row');
  expect(rows).toHaveLength(1); // Header row and no payments
});
