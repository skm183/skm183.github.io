import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();
  let path = location.pathname;
  try {
    path = decodeURIComponent(path);
  } catch (e) {
    console.warn("Malformed URI detected")
  }

  return (
    <section className="flex flex-col items-center justify-center grow bg-neutral-950 px-6 font-mono text-center relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      {/* FIXED: Added 'w-full max-w-2xl' to strictly constrain the width */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl">
        <h1 className="text-8xl md:text-[150px] font-bold text-transparent bg-clip-text bg-linear-to-b from-neutral-400 to-neutral-800 drop-shadow-[0_0_10px_rgba(6,182,212,0.2)] mb-4 tracking-tighter">
          404
        </h1>
        
        {/* FIXED: Added 'w-full' so it respects the parent's boundaries */}
        <div className="flex flex-col gap-2 mb-12 text-sm md:text-base w-full">
            <p className="text-neutral-400 w-full truncate px-4">
                <span className="text-cyan-400">root@skm183:~$</span> cd {path}
            </p>
            <p className="text-neutral-400 w-full truncate px-4">
                cd: no such file or directory: {path}
            </p>
            
            <p className="text-neutral-500 mt-4">
                Intrusion attempt. Tracing origin IP...
            </p>
            <p className='text-neutral-500'>(Just kidding)</p>
        </div>

        <span className='text-neutral-400'>Return home? <span className="w-2 h-4 bg-cyan-500 animate-[pulse_1s_step-end_infinite] inline-block translate-y-0.5"></span></span>
        <Link 
            to="/" 
            className="group relative px-4 py-2 md:px-6 md:py-3 border border-neutral-600 hover:border-cyan-500/50 bg-neutral-800/50 hover:bg-neutral-800/80 transition-all duration-300 rounded flex items-center gap-3 text-neutral-400 hover:text-cyan-400 mt-2">
            <span className="text-cyan-500/50 group-hover:text-cyan-500 transition-colors">cd</span>
            <span className="tracking-widest">~/</span>
        </Link>
      </div>

    </section>
  );
};

export default NotFound;