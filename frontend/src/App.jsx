import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import useApi from './hooks/useApi';
import useTheme from './hooks/useTheme';
import { getHealth } from './api/meta';
import DashboardPage from './pages/DashboardPage';
import NewsPage from './pages/NewsPage';
import ArticlePage from './pages/ArticlePage';
import MapPage from './pages/MapPage';
import SentimentPage from './pages/SentimentPage';
import TrendingPage from './pages/TrendingPage';
import ComparePage from './pages/ComparePage';
import EventComparePage from './pages/EventComparePage';
import TimelinePage from './pages/TimelinePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

function AppLayout() {
  const { theme, toggleTheme } = useTheme();
  const { data: health, loading: healthLoading } = useApi(
    ({ signal }) => getHealth({ signal }),
    [],
  );

  return (
    <div className="app-shell">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer health={health} loading={healthLoading} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:id" element={<ArticlePage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="sentiment" element={<SentimentPage />} />
          <Route path="trending" element={<TrendingPage />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="compare/:eventId" element={<EventComparePage />} />
          <Route path="timeline" element={<TimelinePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
