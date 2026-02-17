import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageProvider';
import { LanguageModal } from './components/LanguageModal';
import MainLayout from './layouts/MainLayout';
import { ProductExplorer } from './pages/ProductExplorer';

function RootRedirect() {
  // Check for existing language selection in localStorage
  const savedLang = localStorage.getItem('marconeServiceEssentialsLanguage');
  // Default to 'en' if no selection exists
  const targetLang = savedLang === 'fr' ? 'fr' : 'en';
  
  return <Navigate to={`/${targetLang}`} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <LanguageModal />
        <MainLayout>
          <Routes>
            {/* Handle the root route specifically to check for existing selection */}
            <Route path="/" element={<RootRedirect />} />
            <Route path="/en" element={<ProductExplorer />} />
            <Route path="/fr" element={<ProductExplorer />} />
            {/* Catch-all remains to redirect unknown paths back to language-prefixed routes */}
            <Route path="*" element={<RootRedirect />} />
          </Routes>
        </MainLayout>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;