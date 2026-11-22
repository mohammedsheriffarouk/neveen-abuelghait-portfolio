import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SiteLayout } from './layouts/SiteLayout';
import { LocaleProvider } from './i18n/LocaleContext';
import Home from './pages/Home';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import CvPrint from './pages/CvPrint';

/**
 * HashRouter keeps the prototype working on any static host (no server rewrites needed).
 * Switch to BrowserRouter when deploying to a host that supports SPA fallbacks (Netlify, Vercel...).
 */
export default function App() {
  return (
    <LocaleProvider>
    <HashRouter>
      <Routes>
        <Route path="cv-print/:lang" element={<CvPrint />} />
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          {/* Removed pages: old links land on Home */}
          <Route path="about" element={<Navigate to="/" replace />} />
          <Route path="programs" element={<Programs />} />
          <Route path="programs/:slug" element={<ProgramDetail />} />
          <Route path="media" element={<Navigate to="/programs" replace />} />
          <Route path="gallery" element={<Navigate to="/" replace />} />
          <Route path="experience" element={<Navigate to="/" replace />} />
          <Route path="education" element={<Navigate to="/" replace />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
    </LocaleProvider>
  );
}
