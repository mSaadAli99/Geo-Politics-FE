import { ImageOff, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryBadge from '../badges/CategoryBadge';
import SentimentBadge from '../badges/SentimentBadge';
import CredibilityBadge from '../badges/CredibilityBadge';
import CountryChip from '../badges/CountryChip';
import ArticleMeta from './ArticleMeta';
import styles from './ArticleCard.module.css';

export default function ArticleCard({ article }) {
  const analyzed = Boolean(
    article.summary || article.sentiment || article.category || article.credibility,
  );

  return (
    <article className={styles.card}>
      <div className={styles.image}>
        {article.image_url ? (
          <img src={article.image_url} alt="" loading="lazy" />
        ) : (
          <div className={styles.placeholder}>
            <ImageOff />
            <span>No image</span>
          </div>
        )}
      </div>
      <div className={styles.body}>
        <ArticleMeta source={article.source} publishedAt={article.published_at} />
        <h3>
          <Link to={`/news/${article.id}`}>{article.title}</Link>
        </h3>
        <p className={styles.excerpt}>{article.summary || article.snippet || 'No preview available.'}</p>
        {!article.summary && !analyzed && (
          <span className={styles.pending}>
            <Sparkles size={13} /> AI analysis in progress
          </span>
        )}
        <div className={styles.badges}>
          <CategoryBadge category={article.category} />
          <SentimentBadge sentiment={article.sentiment} />
          <CredibilityBadge credibility={article.credibility} />
        </div>
        {article.countries?.length > 0 && (
          <div className={styles.countries}>
            {article.countries.slice(0, 3).map((country) => (
              <CountryChip key={country.iso2} country={country} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
