import { sentimentColors } from '../../utils/colors';
import { capitalize } from '../../utils/format';
import styles from './SentimentBadge.module.css';

export default function SentimentBadge({ sentiment }) {
  const label = typeof sentiment === 'string' ? sentiment : sentiment?.label;
  if (!label) {
    return (
      <span className={styles.badge} aria-label="Sentiment not analyzed">
        —
      </span>
    );
  }

  const color = sentimentColors[label] || sentimentColors.neutral;
  return (
    <span className={styles.badge} style={{ color: color.fg, backgroundColor: color.bg }}>
      {capitalize(label)}
    </span>
  );
}
