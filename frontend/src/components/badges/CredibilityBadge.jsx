import { credibilityColors } from '../../utils/colors';
import { capitalize } from '../../utils/format';
import styles from './CredibilityBadge.module.css';

export default function CredibilityBadge({ credibility, score, level }) {
  const value = score ?? credibility?.score;
  const hasValue = value != null && value !== '';
  const tier =
    level ||
    credibility?.level ||
    (hasValue ? (value >= 75 ? 'high' : value >= 50 ? 'medium' : 'low') : null);

  if (!hasValue && !tier) {
    return (
      <span className={styles.badge} aria-label="Credibility not analyzed">
        —
      </span>
    );
  }

  const color = credibilityColors[tier] || credibilityColors.medium;
  return (
    <span
      className={styles.badge}
      style={{ color: color.fg, backgroundColor: color.bg }}
      aria-label={`Credibility ${hasValue ? value : 'unknown'}, ${tier || 'unknown'}`}
    >
      <strong>{hasValue ? value : '—'}</strong> {capitalize(tier)}
    </span>
  );
}
