import { describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import ArticlePage from '../src/pages/ArticlePage';

describe('ArticlePage', () => {
  it('renders summary, entities, and credibility breakdown', async () => {
    render(
      <MemoryRouter initialEntries={['/news/101']}>
        <Routes>
          <Route path="/news/:id" element={<ArticlePage />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Pakistan and India agree to resume trade talks/i),
      ).toBeInTheDocument();
    });

    expect(screen.getByText(/AI-generated/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(/Indicator based on defined factors/i).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText(/Credibility breakdown/i)).toBeInTheDocument();
  });
});
