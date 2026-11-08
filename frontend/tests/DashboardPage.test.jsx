import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import DashboardPage from '../src/pages/DashboardPage';

vi.mock('../src/components/map/WorldMap', () => ({
  default: () => <div data-testid="mini-map">Map</div>,
}));

describe('DashboardPage', () => {
  it('renders overview stats and latest articles', async () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Global intelligence dashboard/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/1,284|1284/)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Pakistan and India agree to resume trade talks/i),
      ).toBeInTheDocument();
    });
  });
});
