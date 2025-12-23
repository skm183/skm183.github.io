import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", id: "home", type: "scroll" },
    { name: "About", id: "about", type: "scroll" },
    { name: "Projects", id: "projects", type: "scroll" },
    { name: "Research", id: "blogs", type: "scroll" },
    { name: "Contact", id: "contact", type: "scroll" },
  ];

  const handleNavigation = (link) => {
    setIsOpen(false); 

    if (link.type === "route") {
      navigate("/blog");
    } else {
      if (location.pathname === "/") {
        const element = document.getElementById(link.id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else if (link.id === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        navigate("/", { state: { scrollTo: link.id } });
      }
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled 
          ? "bg-neutral-950/80 backdrop-blur-md border-cyan-500/10 py-4 shadow-[0_0_15px_rgba(0,0,0,0.5)]" 
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        <div 
            className="text-xl font-bold font-mono text-white cursor-pointer"
            onClick={() => handleNavigation({ type: 'scroll', id: 'home' })}
        > [
          <span className="text-cyan-400">skm183</span>
          ]
          <span className="text-white">$</span>
        </div>

        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <button 
              key={link.name}
              onClick={() => handleNavigation(link)}
              className="relative text-sm font-mono text-neutral-400 hover:text-cyan-400 uppercase tracking-widest transition-all duration-300 group"
            >
              <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-500 inline-block mr-1">[</span>
              {link.name}
              <span className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-500 inline-block ml-1">]</span>
              
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-500 group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </div>
      </div>
      
      <button
        className="md:hidden absolute top-1/2 right-6 -translate-y-1/2 z-50 text-cyan-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        {isOpen ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        )}
      </button>

      <div 
        className={`fixed top-0 right-0 h-screen w-3/4 max-w-sm bg-neutral-900/95 backdrop-blur-xl border-l border-cyan-500/30 shadow-[-10px_0_30px_rgba(6,182,212,0.1)] transform transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col items-start p-8 space-y-6 mt-16">
          {navLinks.map((link, index) => (
            <button 
              key={link.name}
              onClick={() => handleNavigation(link)}
              className="text-2xl font-mono font-bold text-neutral-400 hover:text-white flex items-center gap-4 group w-full text-left"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="text-xs text-cyan-500 font-normal opacity-50">0x0{index + 1}.</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300">{link.name}</span>
            </button>
          ))}
        </div>

        <div className="absolute bottom-8 left-8 text-neutral-600 font-mono text-xs">
           STATUS: ONLINE
        </div>
      </div>

      {isOpen && (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  )
}

export default Navbar