import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { sentimentColors } from '../../utils/colors';
import EmptyState from '../common/EmptyState';
import ErrorState from '../common/ErrorState';
import Skeleton from '../common/Skeleton';
import styles from './SentimentPieChart.module.css';
export default function SentimentPieChart({ data = [], loading, error, onRetry, height = 300 }) { if(loading)return <Skeleton height={`${height}px`}/>; if(error)return <ErrorState message={error.message||error} onRetry={onRetry}/>; const chart=Array.isArray(data)?data:Object.entries(data||{}).map(([name,value])=>({name,value})); if(!chart.length)return <EmptyState message="No sentiment data available."/>; return <div className={styles.chart} style={{height}}><ResponsiveContainer><PieChart><Pie data={chart} dataKey="value" nameKey="name" innerRadius="48%" outerRadius="75%" paddingAngle={2}>{chart.map((item)=><Cell key={item.name} fill={(sentimentColors[item.name]||sentimentColors.neutral).chart}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer></div>; }
