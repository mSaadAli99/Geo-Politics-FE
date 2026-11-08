import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import TrendingBarChart from '../components/charts/TrendingBarChart';
import ArticleList from '../components/articles/ArticleList';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import useApi from '../hooks/useApi';
import useFilters from '../hooks/useFilters';
import { getTrending } from '../api/trending';
import { getArticles } from '../api/articles';
import styles from './Pages.module.css';

const DEFAULTS = { window: '24h' };

export default function TrendingPage() {
  const { filters, setFilter } = useFilters(DEFAULTS);
  const { data: topics, loading, error, refetch } = useApi(
    ({ signal }) => getTrending({ window: filters.window, limit: 20 }, { signal }),
    [filters.window],
  );
  const selectedTopic = filters.topic_id;
  const articles = useApi(
    ({ signal }) =>
      getArticles({ topic_id: selectedTopic, page_size: 12, sort: 'latest' }, { signal }),
    [selectedTopic],
    { enabled: Boolean(selectedTopic) },
  );

  if (loading) return <Loader label="Loading trends" />;
  if (error) return <ErrorState message={error?.message} onRetry={refetch} />;

  return (
    <div className={styles.page}>
      <PageHeader
        title="Trending topics"
        subtitle="Topics gaining attention across monitored news sources."
      />
      <div className={styles.toolbar}>
        <div className={styles.chipRow} role="group" aria-label="Trend window">
          {['24h', '7d'].map((window) => (
            <button
              key={window}
              className={`${styles.toggle} ${filters.window === window ? styles.active : ''}`}
              aria-pressed={filters.window === window}
              onClick={() => setFilter('window', window)}
            >
              {window === '24h' ? 'Last 24 hours' : 'Last 7 days'}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.twoColumns}>
        <section className={styles.section}>
          <h2 className="section-title">Ranked topics</h2>
          <ol className={styles.rankedList}>
            {(topics || []).map((topic, index) => (
              <li key={topic.id}>
                <button
                  className={styles.rankedButton}
                  onClick={() => setFilter('topic_id', topic.id)}
                >
                  <strong>#{index + 1}</strong>
                  <span>{topic.label}</span>
                  <span>{topic.article_count} articles</span>
                  <span className={topic.growth_pct >= 0 ? styles.positive : styles.negative}>
                    {topic.growth_pct >= 0 ? '↑' : '↓'} {Math.abs(topic.growth_pct)}%
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </section>
        <section className={styles.section}>
          <h2 className="section-title">Trend score</h2>
          <TrendingBarChart data={topics || []} />
        </section>
      </div>

      {selectedTopic && (
        <section className={styles.page}>
          <div className={styles.toolbar}>
            <h2 className={styles.heading}>
              {topics?.find((topic) => topic.id === Number(selectedTopic))?.label || 'Topic'} coverage
            </h2>
            <Link className="btn btn-secondary" to={`/timeline?topic_id=${selectedTopic}`}>
              View timeline
            </Link>
          </div>
          {articles.error ? (
            <ErrorState message={articles.error?.message} onRetry={articles.refetch} />
          ) : !articles.loading && !articles.data?.items?.length ? (
            <EmptyState title="No articles found for this topic" />
          ) : (
            <ArticleList articles={articles.data?.items || []} loading={articles.loading} />
          )}
        </section>
      )}
    </div>
  );
}
