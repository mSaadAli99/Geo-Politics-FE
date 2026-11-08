import styles from './Skeleton.module.css';
export default function Skeleton({ width = '100%', height = '1rem', count = 1, className = '' }) { return <div className={`${styles.group} ${className}`} aria-hidden="true">{Array.from({length:count},(_,i)=><span key={i} className={styles.skeleton} style={{width,height}}/>)}</div>; }
