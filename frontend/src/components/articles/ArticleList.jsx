import ArticleCard from './ArticleCard';
import Skeleton from '../common/Skeleton';
import EmptyState from '../common/EmptyState';
import ErrorState from '../common/ErrorState';
import styles from './ArticleList.module.css';
export default function ArticleList({ articles = [], loading = false, error, onRetry, emptyAction, emptyMessage = 'No articles match these filters.' }) { if (loading) return <div className={styles.list} role="status" aria-label="Loading articles">{Array.from({length:3},(_,i)=><div className={styles.loading} key={i}><Skeleton height="10rem"/><Skeleton count={3}/></div>)}</div>; if (error) return <ErrorState message={error.message || error} onRetry={onRetry}/>; if (!articles.length) return <EmptyState title="No articles found" message={emptyMessage} action={emptyAction}/>; return <div className={styles.list}>{articles.map((article)=><ArticleCard key={article.id} article={article}/>)}</div>; }
