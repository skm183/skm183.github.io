import { FaGithub, FaGitlab, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';

const ProjectList = () => {
  const projects = [
    {
      title: "Pulse",
      description: "A lightweight, multi-threaded CLI health monitoring utility written in Rust.",
      tech: ["Rust", "CLI", "Systemd"],
      status: "in-progress", 
      repoType: "github", 
      links: { demo: "", code: "https://github.com/skm183/pulse" }
    },
    {
      title: "My Portfolio",
      description: "This website.",
      tech: ["React.js", "TailwindCSS", "Vite"],
      status: "completed",
      repoType: "github",
      links: { demo: "", code: "https://github.com/skm183/skm183.github.io" }
    },
    {
      title: "Libfprint Fork",
      description: "Extending support to Focaltech FT9365 ESS (2808:6553) fingerprint sensor.",
      tech: ["C", "Drivers", "Kernel", "Linux"],
      status: "in-progress",
      repoType: "gitlab",
      links: { demo: "", code: "https://gitlab.freedesktop.org/sid1803/libfprint/-/tree/focaltech-support" }
    }
  ];

  return (
    <section className="relative w-full min-h-screen bg-neutral-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold font-mono text-white mb-4 flex items-center gap-3">
              <span className="text-cyan-500">/</span> 
              project_archives
            </h2>
            <div className="h-1 w-full bg-linear-to-r from-cyan-500 to-transparent to-60%"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group relative bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 active:border-cyan-500/50 transition-all duration-300 flex flex-col h-full hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(6,182,212,0.1)]"
            >
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                 <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-500/20 group-hover:bg-cyan-500 group-active:bg-cyan-500 transition-colors"></div>
              </div>

              <div className="p-8 relative flex flex-col grow">
                 
                 <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold font-mono text-white group-hover:text-cyan-400 transition-colors tracking-wide">
                        {project.title}
                    </h3>

                    {project.status === "in-progress" && (
                        <div className="flex items-center gap-2 px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded">
                           <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-yellow-500"></span>
                           </span>
                           <span className="text-[10px] font-mono font-bold text-yellow-400 tracking-wider">IN_DEVELOPMENT</span>
                        </div>
                    )}
                 </div>
                 
                 <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                    {project.description}
                 </p>

                 <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((t, i) => (
                        <span key={i} className="text-[10px] uppercase font-mono text-cyan-300/70 border border-cyan-900/30 px-2 py-1 bg-cyan-900/5 hover:bg-cyan-900/20 hover:border-cyan-500/30 transition-colors cursor-default">
                            {t}
                        </span>
                        ))}
                    </div>

                    <div className="h-px w-full bg-neutral-800 mb-4 group-hover:bg-cyan-500/20 transition-colors"></div>

                    <div className="flex items-center gap-4">
                        <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-xs font-mono group/link">
                            {project.repoType === 'gitlab' ? <FaGitlab size={16}/> : <FaGithub size={16}/>}
                            <span className="group-hover/link:underline">
                                {project.repoType === 'gitlab' ? 'GITLAB' : 'GITHUB'}
                            </span>
                        </a>
                        
                        {project.links.demo && (
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-neutral-400 hover:text-cyan-400 transition-colors text-xs font-mono group/link ml-auto">
                                <span className="group-hover/link:underline">DEPLOYMENT</span> 
                                <FaExternalLinkAlt className="text-[10px]"/>
                            </a>
                        )}
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
            <a href="https://github.com/skm183?tab=repositories" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-300 font-mono transition-colors group border border-cyan-400/50 p-2">
                View all <span className="group-hover:translate-x-1 transition-transform"><FaArrowRight /></span>
            </a>
        </div>

      </div>
    </section>
  );
};

export default ProjectList;