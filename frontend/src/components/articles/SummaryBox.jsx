import { Sparkles } from 'lucide-react';
import styles from './SummaryBox.module.css';

export default function SummaryBox({ children, summary, fallback, loading = false }) {
  const generated = summary || children;
  const text = generated || fallback;

  return (
    <section
      className={styles.box}
      aria-label={generated ? 'AI-generated summary' : 'Article preview'}
    >
      <div className={styles.label}>
        <Sparkles size={16} /> {generated ? 'AI-generated' : 'Preview'}
      </div>
      {loading ? <p>Generating analysis…</p> : <p>{text || 'No summary is available yet.'}</p>}
    </section>
  );
}
