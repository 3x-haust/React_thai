import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import NotFound from './NotFound';
import GNB from './components/common/GNB';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Map from './pages/Map';
import Footer from './components/common/Footer';
import Exhibition from './pages/Exhibition';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  overflow: hidden;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <GNB />
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/map" element={<Map />} />
          <Route path="/exhibition" element={<Exhibition />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainContent>
      <Footer />
    </AppContainer>
  );
};

export default App;
