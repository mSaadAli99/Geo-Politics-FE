import { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import Sidebar from '../components/layout/Sidebar';
import FilterBar from '../components/filters/FilterBar';
import WorldMap from '../components/map/WorldMap';
import CountryPanel from '../components/map/CountryPanel';
import ErrorState from '../components/common/ErrorState';
import useApi from '../hooks/useApi';
import useFilters from '../hooks/useFilters';
import { getCountries, getCountry } from '../api/countries';
import styles from './Pages.module.css';

const DEFAULTS = {};

export default function MapPage() {
  const { filters, setFilter, setFilters } = useFilters(DEFAULTS);
  const [mapMode, setMapMode] = useState('count');
  const selectedCountry = filters.country;
  const mapParams = { category: filters.category, from: filters.from, to: filters.to };
  const detailParams = { from: filters.from, to: filters.to };
  const countries = useApi(
    ({ signal }) => getCountries(mapParams, { signal }),
    [JSON.stringify(mapParams)],
  );
  const country = useApi(
    ({ signal }) => getCountry(selectedCountry, detailParams, { signal }),
    [selectedCountry, JSON.stringify(detailParams)],
    { enabled: Boolean(selectedCountry) },
  );

  const selectCountry = (value) => {
    const iso2 =
      typeof value === 'string'
        ? value
        : value?.iso2 || value?.properties?.ISO_A2_EH || value?.properties?.ISO_A2;
    if (iso2 && iso2 !== '-99') setFilter('country', iso2);
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="World map"
        subtitle="Explore reporting volume and sentiment country by country."
      />
      <section className={styles.section}>
        <FilterBar
          compact
          fields={['category', 'from', 'to']}
          filters={filters}
          values={filters}
          countries={countries.data || []}
          onChange={(next) => setFilters(next)}
          onClear={() => setFilters({ category: '', from: '', to: '' })}
        />
      </section>
      {countries.error ? (
        <ErrorState message={countries.error?.message} onRetry={countries.refetch} />
      ) : (
        <section className={`${styles.panel} ${styles.mapLarge}`}>
          <WorldMap
            countries={countries.data || []}
            data={countries.data || []}
            loading={countries.loading}
            mode={mapMode}
            onModeChange={setMapMode}
            selectedCountry={selectedCountry}
            onCountryClick={selectCountry}
          />
        </section>
      )}
      <Sidebar
        open={Boolean(selectedCountry)}
        isOpen={Boolean(selectedCountry)}
        title="Country details"
        onClose={() => setFilter('country', '')}
      >
        <CountryPanel
          country={country.data}
          data={country.data}
          loading={country.loading}
          error={country.error}
          onRetry={country.refetch}
          onClose={() => setFilter('country', '')}
        />
      </Sidebar>
    </div>
  );
}
