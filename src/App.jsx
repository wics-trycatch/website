import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import NavbarWrapper from "./components/NavbarWrapper.jsx";
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import Faq from './pages/Faq.jsx';
import Wics from './pages/Wics.jsx';
import Speakers from './pages/Speakers.jsx';
import Workshops from './pages/Workshops.jsx';
import Sponsors from './pages/Sponsors.jsx';

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {

  return (
    <div className={`max-w-[128rem] mx-auto px-[5%] py-[2rem]`}>
        <NavbarWrapper />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/sfu-wics" element={<Wics />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/workshops" element={<Workshops />} />
          {/* the schedule now lives on the home page; old links land there */}
          <Route path="/schedule" element={<Navigate to="/" replace state={{ scrollTo: "schedule" }} />} />
          <Route path="/sponsors" element={<Sponsors />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App