import { describe, expect, it } from 'vitest';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useFilters from '../src/hooks/useFilters';

function Probe() {
  const { filters, setFilter, clearFilters } = useFilters({ sort: 'latest' });
  const location = useLocation();
  return (
    <div>
      <div data-testid="q">{filters.q || ''}</div>
      <div data-testid="search">{location.search}</div>
      <button type="button" onClick={() => setFilter('q', 'ukraine')}>
        Set q
      </button>
      <button type="button" onClick={clearFilters}>
        Clear
      </button>
    </div>
  );
}

describe('useFilters', () => {
  it('syncs filters to the URL query string', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/news']}>
        <Probe />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: 'Set q' }));
    expect(screen.getByTestId('q')).toHaveTextContent('ukraine');
    expect(screen.getByTestId('search').textContent).toContain('q=ukraine');

    await user.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.getByTestId('q')).toHaveTextContent('');
    expect(screen.getByTestId('search')).toHaveTextContent('');
  });
});
