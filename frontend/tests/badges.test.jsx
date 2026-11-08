import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CategoryBadge from '../src/components/badges/CategoryBadge';
import SentimentBadge from '../src/components/badges/SentimentBadge';
import CredibilityBadge from '../src/components/badges/CredibilityBadge';
import CountryChip from '../src/components/badges/CountryChip';

describe('badges', () => {
  it('renders category badge', () => {
    render(<CategoryBadge category="politics" />);
    expect(screen.getByText(/politics/i)).toBeInTheDocument();
  });

  it('renders sentiment badge', () => {
    render(<SentimentBadge sentiment={{ label: 'positive', score: 0.8 }} />);
    expect(screen.getByText(/positive/i)).toBeInTheDocument();
  });

  it('renders credibility score and level', () => {
    render(<CredibilityBadge credibility={{ score: 84, level: 'high' }} />);
    expect(screen.getByText(/84/)).toBeInTheDocument();
    expect(screen.getByText(/high/i)).toBeInTheDocument();
  });

  it('links country chip to map', () => {
    render(
      <MemoryRouter>
        <CountryChip country={{ iso2: 'PK', name: 'Pakistan' }} />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: /pakistan/i })).toHaveAttribute(
      'href',
      '/map?country=PK',
    );
  });
});
