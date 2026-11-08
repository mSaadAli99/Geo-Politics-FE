import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { sentimentColors } from '../../utils/colors';
import { formatDate } from '../../utils/format';
import EmptyState from '../common/EmptyState'; import ErrorState from '../common/ErrorState'; import Skeleton from '../common/Skeleton';
import styles from './SentimentTrendChart.module.css';
export default function SentimentTrendChart({ data=[], loading, error, onRetry, height=340 }) { if(loading)return <Skeleton height={`${height}px`}/>; if(error)return <ErrorState message={error.message||error} onRetry={onRetry}/>; if(!data.length)return <EmptyState message="No trend data available."/>; return <div className={styles.chart} style={{height}}><ResponsiveContainer><AreaChart data={data}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="key" tickFormatter={(v)=>formatDate(v,'MMM d')}/><YAxis/><Tooltip/><Legend/>{['positive','neutral','negative'].map((key)=><Area key={key} type="monotone" dataKey={key} stackId="sentiment" stroke={sentimentColors[key].chart} fill={sentimentColors[key].chart} fillOpacity={0.55}/>)}</AreaChart></ResponsiveContainer></div>; }
