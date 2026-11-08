import { Link } from 'react-router-dom';
import styles from './Pages.module.css';

export default function NotFoundPage() {
  return (
    <section className={styles.empty404}>
      <strong>404</strong>
      <h1>Page not found</h1>
      <p className={styles.muted}>The page you requested does not exist or has moved.</p>
      <Link className="btn" to="/">
        Return to dashboard
      </Link>
    </section>
  );
}
