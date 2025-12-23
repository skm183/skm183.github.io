import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AllBlogs from './pages/AllBlogs';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <Router>

      <div className="relative min-h-screen bg-neutral-950 text-neutral-200 font-mono">

        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />      
          <Route path="/blog" element={<AllBlogs />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>

      </div>
    </Router>
  )
}

export default App;