import { RefreshCw } from 'lucide-react';
import styles from './NewArticlesBanner.module.css';
export default function NewArticlesBanner({ count = 0, onRefresh }) { if (!count) return null; return <button className={styles.banner} onClick={onRefresh}><RefreshCw size={17}/><span>{count} new {count === 1 ? 'article' : 'articles'} – Refresh</span></button>; }
