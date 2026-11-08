import { useEffect, useMemo, useState } from 'react';
import L from 'leaflet';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { mapCountScale, mapNoDataColor, mapSentimentFill } from '../../utils/colors';
import ErrorState from '../common/ErrorState';
import Loader from '../common/Loader';
import MapLegend from './MapLegend';
import styles from './WorldMap.module.css';

L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

function isoOf(feature) {
  const props = feature?.properties || {};
  const raw =
    props.ISO_A2 ||
    props['ISO3166-1-Alpha-2'] ||
    props.iso_a2 ||
    props.ISO_A2_EH ||
    props.WB_A2;
  if (!raw || raw === '-99') {
    return (props.ISO_A2_EH || props.WB_A2 || '').toUpperCase() || null;
  }
  return String(raw).toUpperCase();
}

export default function WorldMap({
  countries = [],
  geojson: suppliedGeojson,
  mode: controlledMode,
  onModeChange,
  selectedCountry,
  onCountryClick,
  loading = false,
  error,
  height = 520,
}) {
  const [geojson, setGeojson] = useState(suppliedGeojson);
  const [geoError, setGeoError] = useState(null);
  const [internalMode, setInternalMode] = useState('count');
  const controlled = controlledMode !== undefined && typeof onModeChange === 'function';
  const mode = controlled ? controlledMode : internalMode;

  const setMode = (next) => {
    if (controlled) onModeChange(next);
    else setInternalMode(next);
  };

  useEffect(() => {
    if (suppliedGeojson) {
      setGeojson(suppliedGeojson);
      return undefined;
    }
    let active = true;
    fetch('/world-countries.geojson')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load map boundaries.');
        return response.json();
      })
      .then((data) => {
        if (active) setGeojson(data);
      })
      .catch((err) => {
        if (active) setGeoError(err);
      });
    return () => {
      active = false;
    };
  }, [suppliedGeojson]);

  const byIso = useMemo(
    () => new Map(countries.map((country) => [country.iso2?.toUpperCase(), country])),
    [countries],
  );
  const max = Math.max(0, ...countries.map((country) => country.article_count || 0));
  const selected = selectedCountry?.toUpperCase?.() || String(selectedCountry || '').toUpperCase();

  const fill = (country) => {
    if (!country) return mapNoDataColor;
    if (mode === 'sentiment') {
      return mapSentimentFill[country.dominant_sentiment] || mapNoDataColor;
    }
    const ratio = max ? (country.article_count || 0) / max : 0;
    return mapCountScale[
      Math.min(mapCountScale.length - 1, Math.floor(ratio * mapCountScale.length))
    ];
  };

  if (loading) {
    return (
      <div className={styles.state} style={{ height }}>
        <Loader label="Loading map…" />
      </div>
    );
  }
  if (error || geoError) {
    return (
      <ErrorState message={(error || geoError).message || error || 'Unable to load map.'} />
    );
  }

  return (
    <div className={styles.wrapper} style={{ height }}>
      <div className={styles.toggle} role="group" aria-label="Map display mode">
        <button
          type="button"
          className={mode === 'count' ? styles.active : ''}
          aria-pressed={mode === 'count'}
          onClick={() => setMode('count')}
        >
          Article count
        </button>
        <button
          type="button"
          className={mode === 'sentiment' ? styles.active : ''}
          aria-pressed={mode === 'sentiment'}
          onClick={() => setMode('sentiment')}
        >
          Sentiment
        </button>
      </div>
      <MapContainer
        className={styles.map}
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        worldCopyJump
        scrollWheelZoom
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geojson && (
          <GeoJSON
            key={`${mode}-${countries.length}-${max}-${selected}`}
            data={geojson}
            style={(feature) => {
              const iso = isoOf(feature);
              const active = Boolean(iso && iso === selected);
              return {
                fillColor: fill(byIso.get(iso)),
                weight: active ? 2.4 : 0.8,
                color: active ? '#0f172a' : '#fff',
                fillOpacity: active ? 0.95 : 0.8,
              };
            }}
            onEachFeature={(feature, layer) => {
              const iso = isoOf(feature);
              const country = byIso.get(iso);
              const name =
                country?.name || feature.properties?.ADMIN || feature.properties?.name || iso;
              const tooltip =
                mode === 'sentiment'
                  ? `${name}: ${country?.dominant_sentiment || 'no sentiment'} (${country?.article_count || 0})`
                  : `${name}: ${country?.article_count || 0} articles`;
              layer.bindTooltip(tooltip);
              layer.on({
                click: () => iso && onCountryClick?.(iso),
                mouseover: (event) => event.target.setStyle({ weight: 2, color: '#334155' }),
                mouseout: (event) =>
                  event.target.setStyle({
                    weight: iso && iso === selected ? 2.4 : 0.8,
                    color: iso && iso === selected ? '#0f172a' : '#fff',
                  }),
              });
            }}
          />
        )}
      </MapContainer>
      <MapLegend mode={mode} maxCount={max} />
    </div>
  );
}
