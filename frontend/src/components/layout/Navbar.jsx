import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import { NAV_LINKS } from '../../utils/constants';
import styles from './Navbar.module.css';

export default function Navbar({ theme = 'light', onToggleTheme }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const submit = (event) => {
    event.preventDefault();
    const q = query.trim();
    navigate(q ? `/news?q=${encodeURIComponent(q)}` : '/news');
    setOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} to="/">
          GeoPolitics AI
        </Link>

        <form className={styles.search} onSubmit={submit} role="search">
          <label className="sr-only" htmlFor="global-search">
            Search news
          </label>
          <input
            id="global-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search global news…"
          />
          <button aria-label="Submit search" type="submit">
            <Search size={18} />
          </button>
        </form>

        <button
          className={styles.iconButton}
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          type="button"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          className={`${styles.iconButton} ${styles.menuButton}`}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label="Toggle navigation"
          type="button"
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav
          id="primary-navigation"
          className={`${styles.nav} ${open ? styles.open : ''}`}
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? styles.active : undefined)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
