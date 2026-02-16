import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageProvider';
import { LanguageModal } from './components/LanguageModal';
import MainLayout from './layouts/MainLayout';
import { ProductExplorer } from './pages/ProductExplorer';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <LanguageModal />
        <MainLayout>
          <Routes>
            <Route path="/en" element={<ProductExplorer />} />
            <Route path="/fr" element={<ProductExplorer />} />
            <Route path="*" element={<Navigate to="/en" replace />} />
          </Routes>
        </MainLayout>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;