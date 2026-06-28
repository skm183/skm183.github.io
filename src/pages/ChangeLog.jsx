import React from 'react'

const ChangeLog = () => {
    const logs = [
    {
      version: "v2.0.0",
      date: "28-06-2026",
      changes: [
        "Migrated hosting from static github pages to a cloud VM",
        "Aquired a new custom (sub)domain registry for the site",
        "Established a Vulnerability Disclosure Program.",
        "Added this change log page",
        "Introduced comment section for blogs",
        "New 404 page",
        "Footer with quicklinks to this changelog and VDP",
        "Minor fixes and UI improvements"
      ]
    },
    {
      version: "v1.0.0",
      date: "23-12-2025",
      changes: [
        "Website Launched."
      ]
    }
  ];
  return (
    <div className="flex flex-col grow bg-black py-20 px-6 font-mono text-sm md:text-base">
        <div className="max-w-7xl mx-auto w-full">
            <div className="mb-16">
                <h1 className="text-4xl font-bold text-white mb-4">
                    <span className="text-cyan-500">~/</span>change_logs
                </h1>
                <div className="h-[2px] w-25 md:w-60 bg-linear-to-l from-transparent to-cyan-500 mb-2"></div>
                
                <p className="text-neutral-30 text-sm md:text-base mt-4 tracking-wider">
                    SYS.LOGS - System Updates and Release Notes
                </p>
                </div>
                <p className='text-cyan-400 text-sm md:text-base mb-2'>What's new?</p>

                <div className="flex flex-col gap-10">
                {logs.map((log, index) => (
                    <div 
                    key={log.version} 
                    className="relative pl-6 md:pl-8 border-l border-neutral-800 hover:border-cyan-500/50 transition-colors duration-300 group"
                    >
                    <div className="absolute -left-[4px] top-1.5 h-2 w-2 bg-neutral-800 group-hover:bg-cyan-500 rounded-full transition-colors duration-300 shadow-[0_0_10px_rgba(6,182,212,0)] group-hover:shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                    
                    <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 mb-4">
                        <h2 className="text-cyan-400 font-mono font-bold text-lg">
                        {log.version}
                        </h2>
                        <span className="text-neutral-400 font-mono text-xs">
                        [{log.date}]
                        </span>
                    </div>

                    <ul className="flex flex-col gap-2">
                        {log.changes.map((change, i) => (
                        <li key={i} className="text-neutral-400 font-mono text-sm flex items-start gap-3">
                            <span className="text-cyan-500/40 mt-0.5">{">"}</span>
                            <span className="leading-relaxed group-hover:text-neutral-300 transition-colors">
                            {change}
                            </span>
                        </li>
                        ))}
                    </ul>
                    </div>
                ))}
                </div>
                
                <div className="mt-16 text-neutral-400 font-mono text-xs md:text-sm flex items-center gap-2">
                <span>[EOF]</span>
                <div className="h-[2px] grow bg-neutral-700 border-dashed border-t border-neutral-800"></div>
            </div>
        </div>
    </div>
  )
}

export default ChangeLog