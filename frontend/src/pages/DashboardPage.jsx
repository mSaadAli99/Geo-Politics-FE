import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import StatCard from '../components/common/StatCard';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import NewArticlesBanner from '../components/common/NewArticlesBanner';
import ArticleList from '../components/articles/ArticleList';
import TrendingBarChart from '../components/charts/TrendingBarChart';
import SentimentPieChart from '../components/charts/SentimentPieChart';
import CategoryBarChart from '../components/charts/CategoryBarChart';
import WorldMap from '../components/map/WorldMap';
import useApi from '../hooks/useApi';
import usePolling from '../hooks/usePolling';
import { getArticles } from '../api/articles';
import { getCountries } from '../api/countries';
import { getOverview, getSentimentStats, getCategoryStats } from '../api/stats';
import { getTrending } from '../api/trending';
import styles from './Pages.module.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const previousTotal = useRef(null);
  const [newCount, setNewCount] = useState(0);
  const overview = useApi(({ signal }) => getOverview({ signal }), []);
  const latest = useApi(
    ({ signal }) => getArticles({ page_size: 10, sort: 'latest' }, { signal }),
    [],
  );
  const trending = useApi(({ signal }) => getTrending({ window: '24h', limit: 5 }, { signal }), []);
  const countries = useApi(({ signal }) => getCountries({}, { signal }), []);
  const sentiment = useApi(
    ({ signal }) => getSentimentStats({ group_by: 'day' }, { signal }),
    [],
  );
  const categories = useApi(({ signal }) => getCategoryStats({}, { signal }), []);
  const pollSeconds = Number(import.meta.env.VITE_POLL_INTERVAL_SECONDS) || 60;

  useEffect(() => {
    const total = overview.data?.total_articles;
    if (total == null) return;
    if (previousTotal.current != null && total > previousTotal.current) {
      setNewCount((count) => count + total - previousTotal.current);
    }
    previousTotal.current = total;
  }, [overview.data?.total_articles]);

  usePolling(overview.refetch, pollSeconds);

  const refreshLatest = () => {
    setNewCount(0);
    latest.refetch();
  };

  if (overview.loading && !overview.data) return <Loader label="Loading dashboard" />;
  if (overview.error && !overview.data) {
    return <ErrorState message={overview.error?.message} onRetry={overview.refetch} />;
  }

  const stats = overview.data || {};
  const pieData =
    stats.by_sentiment ||
    sentiment.data?.reduce?.(
      (totals, row) => ({
        positive: totals.positive + (row.positive || 0),
        negative: totals.negative + (row.negative || 0),
        neutral: totals.neutral + (row.neutral || 0),
      }),
      { positive: 0, negative: 0, neutral: 0 },
    );

  return (
    <div className={styles.page}>
      <PageHeader
        title="Global intelligence dashboard"
        subtitle="A live view of geopolitical reporting, trends, and sentiment."
      />
      {newCount > 0 && <NewArticlesBanner count={newCount} onRefresh={refreshLatest} />}

      <section className={styles.stats} aria-label="Overview statistics">
        <StatCard title="Total articles" label="Total articles" value={stats.total_articles || 0} />
        <StatCard title="Published today" label="Published today" value={stats.articles_today || 0} />
        <StatCard title="Sources" label="Sources" value={stats.sources_count || 0} />
        <StatCard title="Countries" label="Countries" value={stats.countries_count || 0} />
      </section>

      <div className={styles.twoColumns}>
        <section className={styles.section}>
          <h2 className="section-title">Trending now</h2>
          <div className={styles.chipRow}>
            {(trending.data || []).slice(0, 5).map((topic) => (
              <button
                className={styles.chip}
                key={topic.id}
                onClick={() => navigate(`/trending?topic_id=${topic.id}`)}
              >
                {topic.label}
              </button>
            ))}
          </div>
          <TrendingBarChart data={trending.data || []} />
        </section>
        <section className={styles.section}>
          <h2 className="section-title">News activity by country</h2>
          <div className={styles.map}>
            <WorldMap
              countries={countries.data || []}
              data={countries.data || []}
              height={280}
              onCountryClick={(country) => {
                const iso2 =
                  typeof country === 'string'
                    ? country
                    : country.iso2 || country.properties?.ISO_A2;
                navigate(`/map?country=${iso2}`);
              }}
            />
          </div>
        </section>
      </div>

      <div className={styles.twoColumns}>
        <section className={styles.section}>
          <h2 className="section-title">Overall sentiment</h2>
          <SentimentPieChart data={pieData || {}} />
        </section>
        <section className={styles.section}>
          <h2 className="section-title">Coverage by category</h2>
          <CategoryBarChart data={categories.data || []} />
        </section>
      </div>

      <section>
        <h2 className="section-title">Latest news</h2>
        {latest.error ? (
          <ErrorState message={latest.error?.message} onRetry={latest.refetch} />
        ) : (
          <ArticleList articles={latest.data?.items || []} loading={latest.loading} />
        )}
      </section>
    </div>
  );
}
