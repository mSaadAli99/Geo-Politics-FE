import { AlertTriangle } from 'lucide-react';
import styles from './ErrorState.module.css';
export default function ErrorState({ message = 'Something went wrong.', onRetry }) { return <div className={styles.state} role="alert"><AlertTriangle size={30}/><p>{message}</p>{onRetry && <button className="btn btn-secondary" onClick={onRetry}>Retry</button>}</div>; }
