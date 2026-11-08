import { categoryColors } from '../../utils/colors';
import { categoryLabel } from '../../utils/format';
import styles from './CategoryBadge.module.css';
export default function CategoryBadge({ category }) { const color = categoryColors[category] || { fg: 'var(--color-text-muted)', bg: 'var(--color-neutral-bg)' }; return <span className={styles.badge} style={{color:color.fg,backgroundColor:color.bg}}>{categoryLabel(category)}</span>; }
