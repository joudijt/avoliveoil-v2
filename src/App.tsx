import { Navigate, Route, Routes } from 'react-router-dom';
import { LangLayout } from './routes/LangLayout';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ShopPage } from './pages/ShopPage';
import { WhyUsPage } from './pages/WhyUsPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { WhatsAppButton } from './components/ui/WhatsAppButton';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path="/:lang" element={<LangLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="why-us" element={<WhyUsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
      <WhatsAppButton />
    </>
  );
}

export default App;
