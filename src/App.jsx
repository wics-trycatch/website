import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import Faq from './pages/Faq.jsx';
import Wics from './pages/Wics.jsx';
import Speakers from './pages/Speakers.jsx';
import Workshops from './pages/Workshops.jsx';
import Schedule from './pages/Schedule.jsx';

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
    <div className={`overflow-x-hidden max-w-[128rem] mx-auto px-[5%] py-[2rem]`}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/sfu-wics" element={<Wics />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App