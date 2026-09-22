import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import NavbarWrapper from "./components/NavbarWrapper.jsx";
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import Schedule from './pages/Schedule.jsx';
import Faq from './pages/Faq.jsx';
import OurTeam from './pages/OurTeam.jsx';
import Speakers from './pages/Speakers.jsx';
import Workshops from './pages/Workshops.jsx';
import Sponsors from './pages/Sponsors.jsx';
import { useFaviconEyeTracking } from './utils/useFaviconEyeTracking.js';

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  useFaviconEyeTracking();

  return (
    <div className={`max-w-[128rem] mx-auto px-[5%] py-[2rem]`}>
        <NavbarWrapper />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/our-team" element={<OurTeam />} />
          {/* old link — send it to the renamed page */}
          <Route path="/sfu-wics" element={<Navigate to="/our-team" replace />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/sponsors" element={<Sponsors />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App