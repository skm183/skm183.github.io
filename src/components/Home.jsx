import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import kernelImg from "../assets/kernel_dev.jpg"
import webImg from "../assets/web_dev.jpg"
import mlImg from "../assets/ML.jpg"
import pentestImg from "../assets/pentesting.jpg"
import Hologram from "../components/Hologram"

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [glitch, setGlitch] = useState(false);

  const holograms = [kernelImg, webImg, mlImg, pentestImg];
  const scales = [1.5, 1.5, 1.3, 1.4];

  const handleSlideChange = (newIndex) => {
    setGlitch(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => setGlitch(false), 200);
    }, 200);
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-neutral-950 flex flex-col justify-center pt-28 pb-10 md:pt-20 md:pb-0">

      <div className="absolute inset-0 z-20 pointer-events-none">
        <Hologram />
      </div>

      <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-8 content-center lg:content-normal items-center max-w-7xl mx-auto px-6">
          
        <div className="relative z-30 flex flex-col justify-center items-start font-mono font-bold">
          
          <div className="flex items-center gap-2 text-cyan-500 text-lg lg:text-xl tracking-widest mb-4">
            <span className="animate-pulse">{'>_'}</span> 
            <span>SYSTEM_ONLINE</span>
          </div>

          <span className='text-neutral-400 text-2xl'>Greetings User!</span>
          
          <div className='flex gap-4 mt-2 mb-3'>
            <span className='text-white text-5xl lg:text-7xl tracking-tight'>I'm</span>
            <span className='text-cyan-400 text-5xl lg:text-7xl tracking-tight drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]'>
              Sid
            </span>
          </div>

          <span className="text-white text-2xl lg:text-3xl">
            Specializing in
          </span>
          
          <div className='h-[80px] lg:h-[100px] flex items-start'>
            <TypeAnimation
              sequence={[
                'Kernel Development.', 2000, () => handleSlideChange(1),
                'Full Stack Web.', 2000, () => handleSlideChange(2),
                'Machine Learning.', 2000, () => handleSlideChange(3),
                'Pentesting.', 2000, () => handleSlideChange(0)
              ]}
              wrapper="span"
              speed={50}
              className="text-4xl lg:text-6xl text-cyan-400 drop-shadow-[0_10px_10px_rgb(6,182,212)]"
              repeat={Infinity}
            />
          </div>

          <p className="text-neutral-400 mt-3 lg:mt-6 max-w-lg leading-relaxed text-lg lg:text-xl border-l-3 border-cyan-500/80 pl-4">
            Building high-performance systems, securing networks, and developing scalable web applications.
          </p>
        </div>
         

        <div className="flex-1 flex justify-center items-center relative z-10 perspective-1000 mt-6 lg:mt-0">
          <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] flex items-center justify-center">
              
            <div 
              className="absolute z-30 inset-0 border-2 border-cyan-500 rounded-full border-t-transparent border-l-transparent animate-spin" 
              style={{ animationDuration: '10s' }}
            ></div>
            <div 
              className="absolute z-30 inset-6 border-2 border-cyan-500 rounded-full border-r-transparent border-b-transparent animate-spin" 
              style={{ animationDuration: '15s', animationDirection: 'reverse' }}
            ></div>

              <div className="relative w-full h-full flex items-center justify-center group mask-[radial-gradient(ellipse_at_center,black_60%,transparent_100%)]">
                  <img 
                    src={holograms[currentIndex]} 
                    alt="Hologram" 
                    style={{transform: `scale(${scales[currentIndex]})`}}
                    className={`relative z-10 w-4/5 h-4/5 object-contain transition-all duration-200 ${glitch ? 'opacity-80' : 'opacity-100'} rounded-full`}
                  />
                  <img 
                    src={holograms[currentIndex]} 
                    alt="glitch-layer-1" 
                    style={{transform: `scale(${scales[currentIndex]})`}}
                    className={`absolute inset-0 w-4/5 h-4/5 object-contain opacity-0 mix-blend-color-dodge ${glitch ? 'opacity-100 animate-glitch-1' : ''}`}
                  />
                  <img 
                    src={holograms[currentIndex]} 
                    alt="glitch-layer-2"
                    style={{transform: `scale(${scales[currentIndex]})`}}
                    className={`absolute inset-0 w-4/5 h-4/5 object-contain opacity-0 mix-blend-color-dodge ${glitch ? 'opacity-100 animate-glitch-2' : ''}`}
                  />
              </div>
          </div>  
        </div>

      </div>
    </section>
  )
}

export default Home;