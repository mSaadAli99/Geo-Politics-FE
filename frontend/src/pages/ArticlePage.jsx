import { Link, useParams } from 'react-router-dom';
import ArticleMeta from '../components/articles/ArticleMeta';
import SummaryBox from '../components/articles/SummaryBox';
import EntityChips from '../components/articles/EntityChips';
import ArticleList from '../components/articles/ArticleList';
import CategoryBadge from '../components/badges/CategoryBadge';
import SentimentBadge from '../components/badges/SentimentBadge';
import CredibilityBadge from '../components/badges/CredibilityBadge';
import CountryChip from '../components/badges/CountryChip';
import CredibilityBreakdown from '../components/credibility/CredibilityBreakdown';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import useApi from '../hooks/useApi';
import { getArticle } from '../api/articles';
import styles from './Pages.module.css';

export default function ArticlePage() {
  const { id } = useParams();
  const { data: article, loading, error, refetch } = useApi(
    ({ signal }) => getArticle(id, { signal }),
    [id],
  );

  if (loading) return <Loader label="Loading article" />;
  if (error) return <ErrorState message={error?.message} onRetry={refetch} />;
  if (!article) return null;

  return (
    <article className={styles.page}>
      <header className={styles.articleHeader}>
        <p className={styles.eyebrow}>Geopolitical coverage</p>
        <h1 className={styles.title}>{article.title}</h1>
        <ArticleMeta
          source={article.source}
          author={article.author}
          publishedAt={article.published_at}
        />
        <div className={styles.chipRow}>
          <CategoryBadge category={article.category} />
          <SentimentBadge sentiment={article.sentiment} />
          <CredibilityBadge credibility={article.credibility} />
          {article.countries?.map((country) => (
            <CountryChip key={country.iso2} country={country} />
          ))}
        </div>
      </header>

      {article.image_url && (
        <img className={styles.heroImage} src={article.image_url} alt="" />
      )}

      <SummaryBox summary={article.summary} fallback={article.snippet} />

      <section className={styles.section}>
        <h2 className="section-title">Available article text</h2>
        <div className={styles.articleBody}>{article.content_text || article.snippet}</div>
      </section>

      <section className={styles.section}>
        <h2 className="section-title">Detected entities</h2>
        <EntityChips
          entities={article.entities}
          keywords={article.keywords || []}
        />
        <div className={styles.entityGroup}>
          <strong>Keywords and topics</strong>
          <div className={styles.chipRow}>
            {article.keywords?.map((keyword) => (
              <Link className={styles.chip} key={keyword} to={`/news?q=${encodeURIComponent(keyword)}`}>
                {keyword}
              </Link>
            ))}
            {article.topics?.map((topic) => (
              <Link className={styles.chip} key={topic.id} to={`/news?topic_id=${topic.id}`}>
                {topic.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CredibilityBreakdown
        factors={article.credibility?.factors || []}
        explanation={
          article.credibility?.disclaimer ||
          'Indicator based on defined factors, not a fact-check.'
        }
      />

      <div className={styles.actions}>
        <a className="btn" href={article.url} target="_blank" rel="noopener noreferrer">
          Read original article ↗
        </a>
        {article.event_id && (
          <Link className="btn btn-secondary" to={`/compare/${article.event_id}`}>
            Compare coverage
          </Link>
        )}
      </div>

      {article.related_articles?.length > 0 && (
        <section>
          <h2 className="section-title">Related articles</h2>
          <ArticleList articles={article.related_articles} />
        </section>
      )}
    </article>
  );
}
