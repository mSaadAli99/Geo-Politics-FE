import { useParams } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import SourceComparisonTable from '../components/compare/SourceComparisonTable';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import useApi from '../hooks/useApi';
import { getEvent } from '../api/events';
import styles from './Pages.module.css';

export default function EventComparePage() {
  const { eventId } = useParams();
  const { data, loading, error, refetch } = useApi(
    ({ signal }) => getEvent(eventId, { signal }),
    [eventId],
  );

  if (loading) return <Loader label="Loading source comparison" />;
  if (error) return <ErrorState message={error?.message} onRetry={refetch} />;
  if (!data) return null;

  const { event, articles = [], comparison = {} } = data;
  const credibility = comparison.credibility_range || {};
  const spread = comparison.sentiment_spread;
  const spreadLabel = Array.isArray(spread)
    ? spread.join(', ')
    : spread && typeof spread === 'object'
      ? Object.entries(spread)
          .map(([label, count]) => `${label} ${count}`)
          .join(', ')
      : '';
  const earliestAt =
    comparison.earliest_report?.published_at ||
    (typeof comparison.earliest_report === 'string' ? comparison.earliest_report : null);

  return (
    <div className={styles.page}>
      <PageHeader
        title={event?.title || 'Event comparison'}
        subtitle="See the differences and common ground across source coverage."
      />
      <section className={styles.summaryStrip} aria-label="Comparison summary">
        <div className={styles.summaryItem}>
          <span className={styles.muted}>Sources</span>
          <strong>{comparison.sources?.length || event?.sources_count || 0}</strong>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.muted}>Sentiment spread</span>
          <strong>{spreadLabel || '—'}</strong>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.muted}>Credibility range</span>
          <strong>
            {credibility.min ?? '—'}–{credibility.max ?? '—'}
          </strong>
        </div>
      </section>
      <SourceComparisonTable
        event={event}
        articles={articles}
        sources={articles}
        comparison={comparison}
        earliestId={
          articles.find((article) => article.published_at === earliestAt)?.id
        }
      />
    </div>
  );
}
