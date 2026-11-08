import { Inbox } from 'lucide-react';
import styles from './EmptyState.module.css';
export default function EmptyState({ title = 'Nothing here yet', message = 'No data is available.', action, icon }) { return <div className={styles.state}>{icon || <Inbox size={32}/>}<h3>{title}</h3><p>{message}</p>{action && <div>{action}</div>}</div>; }
