import { Clock } from 'lucide-react';
import { formatRelativeTime } from '../../utils/format';
import styles from './ArticleMeta.module.css';
export default function ArticleMeta({ source, publishedAt, author }) { return <div className={styles.meta}><span>{source?.name || source || 'Unknown source'}</span>{author && <><i/> <span>{author}</span></>}<i/><Clock size={14}/><time dateTime={publishedAt}>{formatRelativeTime(publishedAt)}</time></div>; }
