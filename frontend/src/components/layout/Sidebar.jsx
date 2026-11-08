import { X } from 'lucide-react';
import styles from './Sidebar.module.css';
export default function Sidebar({ children, open = true, onClose, title }) { if (!open) return null; return <><button className={styles.backdrop} onClick={onClose} aria-label="Close side panel"/><aside className={styles.sidebar} aria-label={title || 'Side panel'}><div className={styles.header}>{title && <h2>{title}</h2>}{onClose && <button onClick={onClose} aria-label="Close side panel"><X size={20}/></button>}</div><div className={styles.content}>{children}</div></aside></>; }
