import Home from '../components/Home';
import About from '../components/About';
import ProjectList from '../components/ProjectList';
import BlogList from '../components/BlogList';
import Contact from '../components/Contact';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


const LandingPage = () => {

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="relative w-full">

      <div className="relative z-10">
        
        <div id="home">
          <Home/>
        </div>

        <div id="about">
          <About />
        </div>
        
        <div id="projects">
          <ProjectList />
        </div>

        <div id="blogs">
          <BlogList />
        </div>

        <div id="contact">
          <Contact />
        </div>

      </div>

    </div>
  );
};

export default LandingPage;