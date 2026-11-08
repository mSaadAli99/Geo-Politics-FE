import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { sentimentColors } from '../../utils/colors';
import { formatDate } from '../../utils/format';
import EmptyState from '../common/EmptyState';
import ErrorState from '../common/ErrorState';
import Skeleton from '../common/Skeleton';
import styles from './TimelineVolumeChart.module.css';

const SERIES = [
  { key: 'positive', label: 'Positive' },
  { key: 'neutral', label: 'Neutral' },
  { key: 'negative', label: 'Negative' },
  { key: 'unclassified', label: 'Unclassified', color: '#94a3b8' },
];

function asCount(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

export function toVolumeRow(bucket = {}) {
  const sentiment =
    bucket.sentiment && typeof bucket.sentiment === 'object' ? bucket.sentiment : {};
  const positive = asCount(bucket.positive ?? sentiment.positive);
  const neutral = asCount(bucket.neutral ?? sentiment.neutral);
  const negative = asCount(bucket.negative ?? sentiment.negative);
  const classified = positive + neutral + negative;
  const total = asCount(bucket.count ?? bucket.total ?? classified);

  return {
    key: bucket.key || bucket.date,
    positive,
    neutral,
    negative,
    unclassified: Math.max(0, total - classified),
  };
}

export default function TimelineVolumeChart({
  data = [],
  loading,
  error,
  onRetry,
  type = 'bar',
  height = 300,
}) {
  if (loading) return <Skeleton height={`${height}px`} />;
  if (error) return <ErrorState message={error.message || error} onRetry={onRetry} />;
  if (!data.length) return <EmptyState message="No timeline volume data available." />;

  const rows = data.map(toVolumeRow);
  const Chart = type === 'area' ? AreaChart : BarChart;
  const Series = type === 'area' ? Area : Bar;
  const visibleSeries = SERIES.filter(
    (series) => series.key !== 'unclassified' || rows.some((row) => row.unclassified > 0),
  );

  return (
    <div className={styles.chart} style={{ height }}>
      <ResponsiveContainer>
        <Chart data={rows}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="key" tickFormatter={(value) => formatDate(value, 'MMM d')} />
          <YAxis allowDecimals={false} />
          <Tooltip labelFormatter={(value) => formatDate(value, 'MMM d, yyyy')} />
          <Legend />
          {visibleSeries.map((series) => (
            <Series
              key={series.key}
              dataKey={series.key}
              name={series.label}
              stackId="volume"
              stroke={series.color || sentimentColors[series.key].chart}
              fill={series.color || sentimentColors[series.key].chart}
            />
          ))}
        </Chart>
      </ResponsiveContainer>
    </div>
  );
}
