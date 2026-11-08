import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { categoryColors } from '../../utils/colors';
import { categoryLabel } from '../../utils/format';
import EmptyState from '../common/EmptyState';
import ErrorState from '../common/ErrorState';
import Skeleton from '../common/Skeleton';
import styles from './CategoryBarChart.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function CategoryBarChart({ data = [], loading, error, onRetry, height = 300 }) {
  if (loading) return <Skeleton height={`${height}px`} />;
  if (error) return <ErrorState message={error.message || error} onRetry={onRetry} />;
  if (!data.length) return <EmptyState message="No category data available." />;

  const chartData = {
    labels: data.map((item) => categoryLabel(item.category)),
    datasets: [
      {
        label: 'Articles',
        data: data.map((item) => item.count),
        backgroundColor: data.map((item) => categoryColors[item.category]?.chart || '#64748b'),
        borderRadius: 5,
        maxBarThickness: 48,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748b' },
      },
      y: {
        beginAtZero: true,
        ticks: { precision: 0, color: '#64748b' },
        grid: { color: 'rgba(148, 163, 184, 0.35)' },
      },
    },
  };

  return (
    <div className={styles.chart} style={{ height }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}
