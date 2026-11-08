import { useEffect, useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import SearchBar from '../components/filters/SearchBar';
import FilterBar from '../components/filters/FilterBar';
import Pagination from '../components/filters/Pagination';
import EventCard from '../components/compare/EventCard';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import useApi from '../hooks/useApi';
import useDebounce from '../hooks/useDebounce';
import useFilters from '../hooks/useFilters';
import { getEvents } from '../api/events';
import { getCountries } from '../api/countries';
import styles from './Pages.module.css';

const DEFAULTS = { min_sources: 2, page: 1, page_size: 12 };

export default function ComparePage() {
  const { filters, setFilter, setFilters, clearFilters, apiParams } = useFilters(DEFAULTS);
  const [query, setQuery] = useState(filters.q || '');
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => setQuery(filters.q || ''), [filters.q]);
  useEffect(() => {
    if (debouncedQuery !== (filters.q || '')) setFilter('q', debouncedQuery);
  }, [debouncedQuery, filters.q, setFilter]);

  const { data, loading, error, refetch } = useApi(
    ({ signal }) => getEvents({ ...apiParams, min_sources: 2 }, { signal }),
    [JSON.stringify(apiParams)],
  );
  const countries = useApi(({ signal }) => getCountries({}, { signal }), []);

  return (
    <div className={styles.page}>
      <PageHeader
        title="Compare sources"
        subtitle="Compare how multiple publishers report the same event."
      />
      <section className={styles.section}>
        <SearchBar
          value={query}
          onChange={(value) => setQuery(value?.target ? value.target.value : value)}
          placeholder="Search events"
        />
        <FilterBar
          fields={['category', 'country', 'from', 'to']}
          filters={filters}
          values={filters}
          countries={countries.data || []}
          onChange={(next) => setFilters(next)}
          onClear={clearFilters}
        />
      </section>
      {loading ? (
        <Loader label="Loading events" />
      ) : error ? (
        <ErrorState message={error?.message} onRetry={refetch} />
      ) : !data?.items?.length ? (
        <EmptyState
          title="No multi-source events found"
          action={<button className="btn btn-secondary" onClick={clearFilters}>Clear filters</button>}
        />
      ) : (
        <div className={styles.twoColumns}>
          {data.items.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
      {data?.pages > 1 && (
        <Pagination
          currentPage={data.page}
          totalPages={data.pages}
          page={data.page}
          pages={data.pages}
          onChange={(page) => setFilter('page', page)}
          onPageChange={(page) => setFilter('page', page)}
        />
      )}
    </div>
  );
}
