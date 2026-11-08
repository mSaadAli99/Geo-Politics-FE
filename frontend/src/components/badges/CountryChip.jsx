import { Link } from 'react-router-dom';
import styles from './CountryChip.module.css';
export default function CountryChip({ country, iso2, name }) { const code = iso2 || country?.iso2; const label = name || country?.name || code; return <Link className={styles.chip} to={`/map?country=${encodeURIComponent(code || '')}`}>{label}</Link>; }
