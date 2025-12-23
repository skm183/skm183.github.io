import { FaArrowRight, FaRegFileAlt, FaRegClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const logs = [
    {
      date: "22-12-2025",
      title: "the_ghost_print.md",
      excerpt: "Stealing my own fingerprints from a locked sensor chip.",
      category: "KERNEL",
      readTime: "6 min",
      link: "/blog/ghost_print"
    },
  ];

  return (
    <section className="relative w-full py-20 px-6 bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-end justify-between mb-12 pb-4">
            <div className="w-full">
                <h2 className="text-4xl md:text-5xl font-bold font-mono text-white mb-2">
                  <span className="text-cyan-500">/</span>research_logs
                </h2>
                
                <div className="h-1 w-full bg-linear-to-r from-cyan-500 to-transparent to-60% mb-2"></div>
                
                <p className="text-neutral-400 font-mono text-sm">
                   Recent write-ups and technical documentation.
                </p>
            </div>
            <div className="hidden md:block text-neutral-400 font-mono text-xs w-2xl text-right">
                ls -la | head -n 3
            </div>
        </div>

        <div className="flex flex-col gap-4 border p-4 rounded-[3px] border-neutral-700">
            
            <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-mono text-neutral-400 px-4 uppercase tracking-widest">
                <div className="col-span-2">Date</div>
                <div className="col-span-6">Subject</div> 
                <div className="col-span-2">Category</div>
                <div className="col-span-2 text-right">Metadata</div> 
            </div>

            {logs.map((log, index) => (
                <Link 
                  key={index}
                  to={log.link}
                  className="group relative grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center p-4 bg-neutral-900/30 border border-neutral-800 hover:border-cyan-500/50 hover:bg-neutral-900/80 transition-all duration-300 rounded"
                >
                    <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded"></div>

                    <div className="col-span-2 font-mono text-sm text-neutral-400 group-hover:text-cyan-400/80 transition-colors">
                        {log.date}
                    </div>

                    <div className="col-span-12 md:col-span-6 flex flex-col gap-1 z-10">
                        <h3 className="text-lg font-bold font-mono text-neutral-200 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                             <FaRegFileAlt className="text-neutral-500 group-hover:text-cyan-500 transition-colors text-sm shrink-0" />
                             
                             <span className="truncate">
                                <span className="text-cyan-500 opacity-50">./</span>{log.title}
                             </span>
                        </h3>
                        <p className="text-neutral-400 text-sm leading-relaxed line-clamp-1 md:line-clamp-2">
                            {log.excerpt}
                        </p>
                    </div>

                    <div className="col-span-6 md:col-span-2 mt-2 md:mt-0">
                        <span className="inline-block px-2 py-1 text-xs font-mono text-cyan-300 bg-cyan-900/20 border border-cyan-500/20 rounded">
                            {log.category}
                        </span>
                    </div>

                    <div className="col-span-6 md:col-span-2 text-right font-mono text-xs text-neutral-500 mt-2 md:mt-0 group-hover:text-white transition-colors flex items-center justify-end gap-3">
              
                         <span className="flex items-center gap-1.5">
                            <FaRegClock className="text-cyan-500/70" />
                            {log.readTime}
                         </span>
                    </div>
                </Link>
            ))}

        </div>

        <div className="mt-8 text-center">
            <Link to="/blog" className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-300 font-mono transition-colors group border border-cyan-400/50 p-2">
                View all <span className="group-hover:translate-x-1 transition-transform"><FaArrowRight /></span>
            </Link>
        </div>

      </div>
    </section>
  );
};

export default BlogList;