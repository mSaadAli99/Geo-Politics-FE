import { formatNumber } from '../../utils/format';
import Skeleton from './Skeleton';
import styles from './StatCard.module.css';
export default function StatCard({ label, value, icon: Icon, loading = false }) { return <article className={styles.card}>{Icon && <span className={styles.icon}><Icon size={22}/></span>}<div><p>{label}</p>{loading ? <Skeleton width="5rem" height="1.8rem"/> : <strong>{typeof value === 'number' ? formatNumber(value) : value ?? '—'}</strong>}</div></article>; }
