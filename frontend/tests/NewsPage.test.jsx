import { describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import NewsPage from '../src/pages/NewsPage';

describe('NewsPage', () => {
  it('loads articles from the API and renders results', async () => {
    render(
      <MemoryRouter initialEntries={['/news']}>
        <Routes>
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Pakistan and India agree to resume trade talks/i),
      ).toBeInTheDocument();
    });
  });

  it('applies query filters from the URL', async () => {
    render(
      <MemoryRouter initialEntries={['/news?q=oil']}>
        <Routes>
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Oil prices rise/i)).toBeInTheDocument();
    });
  });
});
