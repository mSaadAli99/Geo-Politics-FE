import { useEffect, useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import SearchBar from '../components/filters/SearchBar';
import FilterBar from '../components/filters/FilterBar';
import Timeline from '../components/timeline/Timeline';
import TimelineVolumeChart from '../components/timeline/TimelineVolumeChart';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import useApi from '../hooks/useApi';
import useDebounce from '../hooks/useDebounce';
import useFilters from '../hooks/useFilters';
import { getTimeline } from '../api/timeline';
import { getCountries } from '../api/countries';
import styles from './Pages.module.css';

const DEFAULTS = { granularity: 'day' };

export default function TimelinePage() {
  const { filters, setFilter, setFilters, apiParams } = useFilters(DEFAULTS);
  const [query, setQuery] = useState(filters.q || '');
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => setQuery(filters.q || ''), [filters.q]);
  useEffect(() => {
    if (debouncedQuery !== (filters.q || '')) setFilter('q', debouncedQuery);
  }, [debouncedQuery, filters.q, setFilter]);

  const hasSubject = Boolean(
    apiParams.q || apiParams.country || apiParams.topic_id || apiParams.event_id,
  );
  const { data, loading, error, refetch } = useApi(
    ({ signal }) => getTimeline(apiParams, { signal }),
    [JSON.stringify(apiParams)],
    { enabled: hasSubject },
  );
  const countries = useApi(({ signal }) => getCountries({}, { signal }), []);

  return (
    <div className={styles.page}>
      <PageHeader
        title="Coverage timeline"
        subtitle="Follow how reporting on a topic, country, or event developed."
      />
      <section className={styles.section}>
        <SearchBar
          value={query}
          onChange={(value) => setQuery(value?.target ? value.target.value : value)}
          placeholder="Enter a topic to build a timeline"
        />
        <FilterBar
          fields={['country', 'from', 'to']}
          filters={filters}
          values={filters}
          countries={countries.data || []}
          onChange={(next) => setFilters(next)}
          onClear={() => setFilters({ country: '', from: '', to: '' })}
        />
        <div className={styles.chipRow} role="group" aria-label="Timeline granularity">
          {['day', 'week'].map((value) => (
            <button
              key={value}
              className={`${styles.toggle} ${filters.granularity === value ? styles.active : ''}`}
              aria-pressed={filters.granularity === value}
              onClick={() => setFilter('granularity', value)}
            >
              By {value}
            </button>
          ))}
        </div>
      </section>

      {!hasSubject ? (
        <EmptyState
          title="Choose a topic or country"
          message="Search above or follow a timeline link from a trending topic or event."
        />
      ) : error ? (
        <ErrorState message={error?.message} onRetry={refetch} />
      ) : (
        <>
          <section className={styles.section}>
            <h2 className="section-title">Coverage volume</h2>
            <TimelineVolumeChart data={data?.buckets || []} loading={loading} />
          </section>
          <Timeline items={data?.items || []} loading={loading} />
        </>
      )}
      <p className={styles.methodology}>Based on the historical data in our database.</p>
    </div>
  );
}
