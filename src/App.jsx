import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AllBlogs from './pages/AllBlogs';
import BlogPost from './pages/BlogPost';
import VDP from './pages/VDP';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import ChangeLog from './pages/ChangeLog';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>

      <div className="relative min-h-screen bg-neutral-950 text-neutral-200 font-mono w-full overflow-x-hidden flex flex-col grow">

        <ScrollToTop />

        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />      
          <Route path="/blog" element={<AllBlogs />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/security" element={<VDP />} />
          <Route path="/changelog" element={<ChangeLog />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;