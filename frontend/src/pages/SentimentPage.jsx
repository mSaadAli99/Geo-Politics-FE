import { useEffect, useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import SearchBar from '../components/filters/SearchBar';
import FilterBar from '../components/filters/FilterBar';
import SentimentTrendChart from '../components/charts/SentimentTrendChart';
import SentimentPieChart from '../components/charts/SentimentPieChart';
import CategoryBarChart from '../components/charts/CategoryBarChart';
import ErrorState from '../components/common/ErrorState';
import useApi from '../hooks/useApi';
import useDebounce from '../hooks/useDebounce';
import useFilters from '../hooks/useFilters';
import { getSentimentStats } from '../api/stats';
import { getCountries } from '../api/countries';
import styles from './Pages.module.css';

const DEFAULTS = {};

export default function SentimentPage() {
  const { filters, setFilter, setFilters, apiParams } = useFilters(DEFAULTS);
  const [query, setQuery] = useState(filters.q || '');
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => setQuery(filters.q || ''), [filters.q]);
  useEffect(() => {
    if (debouncedQuery !== (filters.q || '')) setFilter('q', debouncedQuery);
  }, [debouncedQuery, filters.q, setFilter]);

  const baseParams = {
    q: apiParams.q,
    category: apiParams.category,
    country: apiParams.country,
    from: apiParams.from,
    to: apiParams.to,
  };
  const daily = useApi(
    ({ signal }) => getSentimentStats({ ...baseParams, group_by: 'day' }, { signal }),
    [JSON.stringify(baseParams)],
  );
  const byCategory = useApi(
    ({ signal }) => getSentimentStats({ ...baseParams, group_by: 'category' }, { signal }),
    [JSON.stringify(baseParams)],
  );
  const bySource = useApi(
    ({ signal }) => getSentimentStats({ ...baseParams, group_by: 'source' }, { signal }),
    [JSON.stringify(baseParams)],
  );
  const countries = useApi(({ signal }) => getCountries({}, { signal }), []);

  const totals = (daily.data || []).reduce(
    (sum, row) => ({
      positive: sum.positive + (row.positive || 0),
      negative: sum.negative + (row.negative || 0),
      neutral: sum.neutral + (row.neutral || 0),
    }),
    { positive: 0, negative: 0, neutral: 0 },
  );

  if (daily.error) return <ErrorState message={daily.error?.message} onRetry={daily.refetch} />;

  return (
    <div className={styles.page}>
      <PageHeader
        title="Sentiment analysis"
        subtitle="Understand the tone of reporting across time, categories, and sources."
      />
      <section className={styles.section}>
        <SearchBar
          value={query}
          onChange={(value) => setQuery(value?.target ? value.target.value : value)}
          placeholder="Filter by topic"
        />
        <FilterBar
          fields={['category', 'country', 'from', 'to']}
          filters={filters}
          values={filters}
          countries={countries.data || []}
          onChange={(next) => setFilters(next)}
          onClear={() => setFilters({ category: '', country: '', from: '', to: '' })}
        />
      </section>
      <section className={styles.section}>
        <h2 className="section-title">Sentiment over time</h2>
        <SentimentTrendChart data={daily.data || []} loading={daily.loading} />
      </section>
      <div className={styles.threeColumns}>
        <section className={styles.section}>
          <h2 className="section-title">Overall distribution</h2>
          <SentimentPieChart data={totals} />
        </section>
        <section className={styles.section}>
          <h2 className="section-title">By category</h2>
          <CategoryBarChart
            data={(byCategory.data || []).map((row) => ({
              category: row.key,
              count: row.total,
            }))}
          />
        </section>
        <section className={styles.section}>
          <h2 className="section-title">By source</h2>
          <CategoryBarChart
            data={(bySource.data || []).map((row) => ({
              category: row.key,
              count: row.total,
            }))}
          />
        </section>
      </div>
      <p className={styles.methodology}>
        Sentiment labels describe the tone of article text using an automated model. They do not
        represent the truth of a claim or the position of GeoPolitics AI.
      </p>
    </div>
  );
}
