import { formatDateTime } from '../../utils/format';
import styles from './Footer.module.css';
export default function Footer({ health, loading = false }) {
  const healthy = health?.status === 'ok' || health?.status === 'healthy';
  const updated = health?.last_updated_at || health?.last_updated;
  return <footer className={styles.footer}><div className={styles.inner}><span>© {new Date().getFullYear()} GeoPolitics AI</span><span className={styles.status}><i className={`${styles.dot} ${healthy ? styles.healthy : styles.unhealthy}`} aria-hidden="true"/>{loading ? 'Checking service…' : healthy ? 'Service healthy' : 'Service unavailable'}{updated && ` · Updated ${formatDateTime(updated)}`}</span></div></footer>;
}
