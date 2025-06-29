import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import PublicGalleryPage from './pages/PublicGalleryPage';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<PublicGalleryPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;