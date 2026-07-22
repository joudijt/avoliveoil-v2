import { Navigate, Route, Routes } from 'react-router-dom';
import { LangLayout } from './routes/LangLayout';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="/:lang" element={<LangLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
}

export default App;
