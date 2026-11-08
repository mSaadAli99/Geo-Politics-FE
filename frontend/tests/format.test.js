import { describe, expect, it } from 'vitest';
import { capitalize, categoryLabel, formatNumber, formatPercent, growthArrow } from '../src/utils/format';

describe('format utils', () => {
  it('formats numbers and percents', () => {
    expect(formatNumber(1284)).toBe('1,284');
    expect(formatPercent(38)).toBe('38%');
  });

  it('labels categories and capitalizes', () => {
    expect(categoryLabel('international_relations')).toBe('International Relations');
    expect(capitalize('positive')).toBe('Positive');
  });

  it('builds growth arrows', () => {
    expect(growthArrow(12).direction).toBe('up');
    expect(growthArrow(-4).direction).toBe('down');
    expect(growthArrow(0).direction).toBe('flat');
  });
});
