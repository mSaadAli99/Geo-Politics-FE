import { Link } from 'react-router-dom'; import { formatDateTime } from '../../utils/format'; import styles from './TimelineItem.module.css';
export default function TimelineItem({ item }) {
  const articleId =
    item.article_id ||
    item.top_article_id ||
    item.top_article?.id ||
    item.articles?.[0]?.id;
  return (
    <article className={styles.item}>
      <span className={styles.dot} />
      <time dateTime={item.date || item.published_at}>
        {formatDateTime(item.date || item.published_at)}
      </time>
      <h3>
        {articleId ? <Link to={`/news/${articleId}`}>{item.title}</Link> : item.title}
      </h3>
      {item.summary && <p>{item.summary}</p>}
      <span className={styles.count}>
        {item.article_count || item.articles?.length || 1} articles
      </span>
    </article>
  );
}
