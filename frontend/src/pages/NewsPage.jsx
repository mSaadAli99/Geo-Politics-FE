import { useEffect, useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import SearchBar from '../components/filters/SearchBar';
import FilterBar from '../components/filters/FilterBar';
import Pagination from '../components/filters/Pagination';
import ArticleList from '../components/articles/ArticleList';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import useApi from '../hooks/useApi';
import useDebounce from '../hooks/useDebounce';
import useFilters from '../hooks/useFilters';
import { getArticles } from '../api/articles';
import { getCountries } from '../api/countries';
import { getSources } from '../api/meta';
import styles from './Pages.module.css';

const DEFAULTS = { sort: 'latest', page: 1, page_size: 12 };

export default function NewsPage() {
  const { filters, setFilter, setFilters, clearFilters, apiParams } = useFilters(DEFAULTS);
  const [search, setSearch] = useState(filters.q || '');
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setSearch(filters.q || '');
  }, [filters.q]);

  useEffect(() => {
    if (debouncedSearch !== (filters.q || '')) setFilter('q', debouncedSearch);
  }, [debouncedSearch, filters.q, setFilter]);

  const { data, loading, error, refetch } = useApi(
    ({ signal }) => getArticles(apiParams, { signal }),
    [JSON.stringify(apiParams)],
  );
  const countries = useApi(({ signal }) => getCountries({}, { signal }), []);
  const sources = useApi(({ signal }) => getSources({ signal }), []);

  return (
    <div className={styles.page}>
      <PageHeader title="News & search" subtitle="Search and filter geopolitical coverage." />
      <section className={styles.section} aria-label="Article filters">
        <SearchBar
          value={search}
          onChange={(value) => setSearch(value?.target ? value.target.value : value)}
          onSubmit={setSearch}
          placeholder="Search topics, countries, or headlines"
        />
        <FilterBar
          filters={filters}
          values={filters}
          countries={countries.data || []}
          sources={sources.data || []}
          onChange={(next) => setFilters(next)}
          onClear={clearFilters}
        />
      </section>

      {error ? (
        <ErrorState message={error?.message} onRetry={refetch} />
      ) : !loading && !data?.items?.length ? (
        <EmptyState
          title="No articles match these filters"
          message="Try broadening your search or clearing the filters."
          action={<button className="btn btn-secondary" onClick={clearFilters}>Clear filters</button>}
        />
      ) : (
        <ArticleList articles={data?.items || []} loading={loading} />
      )}

      {data?.pages > 1 && (
        <Pagination
          page={data.page}
          currentPage={data.page}
          pages={data.pages}
          totalPages={data.pages}
          onChange={(page) => setFilter('page', page)}
          onPageChange={(page) => setFilter('page', page)}
        />
      )}
    </div>
  );
}
