import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';
import { CATEGORIES } from './constants';

export function parseDate(value) {
  if (!value) return null;
  const date = typeof value === 'string' ? parseISO(value) : new Date(value);
  return isValid(date) ? date : null;
}

export function formatRelativeTime(value) {
  const date = parseDate(value);
  if (!date) return '—';
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatDate(value, pattern = 'MMM d, yyyy') {
  const date = parseDate(value);
  if (!date) return '—';
  return format(date, pattern);
}

export function formatDateTime(value) {
  return formatDate(value, 'MMM d, yyyy · HH:mm');
}

export function formatPercent(value, digits = 0) {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return `${Number(value).toFixed(digits)}%`;
}

export function formatNumber(value) {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return new Intl.NumberFormat().format(Number(value));
}

export function categoryLabel(value) {
  const match = CATEGORIES.find((c) => c.value === value);
  return match ? match.label : value?.replaceAll('_', ' ') || '—';
}

export function capitalize(value) {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function growthArrow(pct) {
  if (pct == null) return { direction: 'flat', label: '0%' };
  if (pct > 0) return { direction: 'up', label: `+${formatPercent(pct, 0)}` };
  if (pct < 0) return { direction: 'down', label: formatPercent(pct, 0) };
  return { direction: 'flat', label: '0%' };
}
