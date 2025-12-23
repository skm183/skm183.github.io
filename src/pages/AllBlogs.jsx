import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegFileAlt, FaRegClock, FaSearch } from 'react-icons/fa';
import { getBlogs } from '../utils/blogLoader';


const AllBlogs = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLogs(getBlogs());
  }, []);

  const filteredLogs = logs.filter(log => 
    log.title.toLowerCase().includes(search.toLowerCase()) ||
    log.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-950 py-20 px-6 font-mono">
      <div className="max-w-7xl mx-auto">

        <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              <span className="text-cyan-500">~/</span>research_logs
            </h1>
            
            <div className="flex items-center gap-2 bg-neutral-900/50 border border-neutral-800 p-3 rounded w-full md:w-1/2 focus-within:border-cyan-500/50 transition-colors">
                <span className="text-cyan-500">$</span>
                <span className="w-25 text-white text-sm md:text-inherit">grep -i</span>
                <input 
                    type="text" 
                    placeholder='"search_query"' 
                    className="bg-transparent border-none outline-none text-neutral-300 w-full placeholder:text-neutral-500"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <FaSearch className="text-neutral-400"/>
            </div>
        </div>

        <div className="hidden md:grid grid-cols-12 gap-4 text-xs text-neutral-400 px-4 uppercase tracking-widest border-b border-neutral-800 pb-2 mb-4">
            <div className="col-span-2">Date</div>
            <div className="col-span-6">Subject</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2 text-right">Metadata</div>
        </div>

        <div className="flex flex-col gap-2">
            {filteredLogs.map((log) => (
                <Link 
                  key={log.slug} 
                  to={`/blog/${log.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center p-3 hover:bg-neutral-900/40 border border-transparent hover:border-neutral-800 rounded transition-all"
                >
                    <div className="col-span-2 text-sm text-neutral-400 group-hover:text-cyan-400/80">
                        {log.date}
                    </div>

                    <div className="col-span-12 md:col-span-6 flex items-center gap-3">
                         <FaRegFileAlt className="text-neutral-400 group-hover:text-cyan-500 transition-colors text-xs" />
                         <span className="text-neutral-300 group-hover:text-cyan-400 font-bold truncate">
                            {log.title}
                         </span>
                    </div>

                    <div className="col-span-6 md:col-span-2">
                        <span className="text-xs text-cyan-300/80 bg-cyan-900/10 px-2 py-0.5 rounded border border-cyan-500/10">
                            {log.category}
                        </span>
                    </div>

                    <div className="col-span-6 md:col-span-2 text-right text-xs text-neutral-400 flex items-center justify-end gap-3">
                         <span>{log.size}</span>
                         <span className="text-cyan-500/30">|</span>
                         <span className="flex items-center gap-1.5">
                            <FaRegClock className="text-cyan-500/50" />
                            {log.readTime}
                         </span>
                    </div>
                </Link>
            ))}
            
            {filteredLogs.length === 0 && (
                <div className="text-neutral-500 py-8 text-center">
                    No matching files found in current directory.
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default AllBlogs;