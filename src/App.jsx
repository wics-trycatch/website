import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';

import Home from './pages/Home.jsx';
import Wics from './pages/Wics.jsx';
import Speakers from './pages/Speakers.jsx';

function App() {

  return (
    <div className={`overflow-x-hidden max-w-[128rem] mx-auto px-[5%] py-[2rem]`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sfu-wics" element={<Wics />} />
          <Route path="/speakers" element={<Speakers />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
