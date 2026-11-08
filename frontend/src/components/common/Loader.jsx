import styles from './Loader.module.css';
export default function Loader({ label = 'Loading' }) { return <div className={styles.wrapper} role="status"><span className={styles.spinner}/><span>{label}</span></div>; }
