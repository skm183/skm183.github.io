import { useState } from 'react';
import { SiC, SiCplusplus, SiRust, SiPython, SiJavascript, SiReact, SiTailwindcss, SiGit, SiGnubash, SiBurpsuite, SiWireshark, SiArchlinux, SiVite } from "react-icons/si";
import { FaChessKnight, FaMusic, FaTableTennis, FaBrain } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


const About = () => {
  const [activeCard, setActiveCard] = useState(null);

  const TechCard = ({ title, children, className = "", index }) => (
    <div
      className={`relative p-6 bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm transition-all duration-300 group overflow-hidden ${className} ${activeCard === index ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : ''}`}
      onMouseEnter={() => setActiveCard(index)}
      onMouseLeave={() => setActiveCard(null)}
    >
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500 md:opacity-50 group-hover:opacity-100 transition-opacity group-active:opacity-100"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500 md:opacity-50 group-hover:opacity-100 transition-opacity group-active:opacity-100"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500 md:opacity-50 group-hover:opacity-100 transition-opacity group-active:opacity-100"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500 md:opacity-50 group-hover:opacity-100 transition-opacity group-active:opacity-100"></div>

      <h3 className="text-cyan-400 font-mono text-sm tracking-widest mb-4 uppercase opacity-80 flex items-center gap-2">
        <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
        {title}
      </h3>
      {children}
    </div>
  );

  return (
    <section className="relative w-full min-h-screen bg-neutral-950 py-20 px-6 flex items-center justify-center">

      <div className="max-w-7xl w-full">

        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">
            <span className="text-cyan-500">/</span>about_me
          </h2>
          <div className="h-1 w-full bg-linear-to-r from-cyan-500 to-transparent to-60%"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

          <div className="md:col-span-2 flex flex-col gap-6">
            <TechCard title="USER_PROFILE" className="flex flex-col gap-4" index={0}>
              <div className="mb-2">
                <p className="text-neutral-300 font-mono text-lg md:text-xl leading-relaxed">
                  Hello World! I am an undergraduate at <span className="text-cyan-400">IIT Kanpur</span>.
                </p>
                <p className="text-neutral-400 font-mono text-sm mt-4 leading-relaxed">
                  I am driven by a curiosity for the science behind the screen. I thrive close to the <span className="text-cyan-400">hardware</span>, where abstract <span className="text-cyan-400">code</span> translates into <span className="text-cyan-400">physical signals</span>, building the bridge between <span className="text-cyan-400">Silicon</span> and <span className="text-cyan-400">Software</span>.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-auto">
                <div className="px-4 py-2 bg-neutral-800/50 border border-cyan-500/20 text-cyan-400 font-mono text-xs rounded tracking-wider">
                  DEPT: ELECTRICAL ENG.
                </div>
                <div className="px-4 py-2 bg-neutral-800/50 border border-neutral-700 text-neutral-400 font-mono text-xs rounded tracking-wider">
                  YEAR: FRESHMAN (1st)
                </div>
              </div>
            </TechCard>

            <TechCard title="ACTIVE_MODULES" className="flex flex-col" index={2}>
              <div className="flex flex-wrap gap-x-4 gap-y-8 md:gap-y-4 mb-6 align-start content-start">
                {[
                  { Icon: SiPython, name: "Python" },
                  { Icon: SiJavascript, name: "JS" },
                  { Icon: SiRust, name: "Rust" },
                  { Icon: SiC, name: "C" },
                  { Icon: SiCplusplus, name: "C++" },
                  { Icon: SiReact, name: "React" },
                  { Icon: SiTailwindcss, name: "Tailwind" },
                  { Icon: SiVite, name: "Vite" },
                  { Icon: SiGit, name: "Git" },
                  { Icon: SiGnubash, name: "Bash" },
                  { Icon: SiBurpsuite, name: "Burp" },
                  { Icon: SiWireshark, name: "Wireshark" },
                  { Icon: FaEye, name: "Nmap" },
                ].map((item, i) => (
                  <div key={i} className="group/icon relative flex flex-col items-center">
                    
                    <div className="p-2 bg-neutral-800/50 border border-neutral-700 rounded text-neutral-400 group-hover/icon:text-cyan-400 group-hover/icon:border-cyan-500/50 transition-all duration-300 group-active/icon:border-cyan-500/50 group-active/icon:text-cyan-400">
                      <item.Icon size={20} />
                    </div>

                    <span className="absolute -bottom-4 text-[10px] font-mono text-cyan-500 opacity-100 md:opacity-0 md:group-hover/icon:opacity-100 transition-opacity whitespace-nowrap">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-neutral-700">
                <div className="bg-neutral-800/50 border border-neutral-700 flex gap-2 p-2 items-center w-fit hover:border-cyan-500/50 transition-colors">
                  <SiArchlinux className="text-cyan-500" size={24} />
                  <span className="font-mono text-sm text-neutral-300">I use Arch btw</span>
                </div>
              </div>
            </TechCard>
          </div>

          <div className="md:col-span-1 flex flex-col gap-6">

            <TechCard title="SYSTEM_METRICS" index={1}>
              <ul className="space-y-4 font-mono text-neutral-300">
                <li className="flex justify-between border-b border-neutral-800 pb-2">
                  <span>Uptime</span>
                  <span className="text-cyan-400">18 Years</span>
                </li>
                <li className="flex justify-between border-b border-neutral-800 pb-2">
                  <span>Coffee</span>
                  <span className="text-cyan-400">Infinite</span>
                </li>
                <li className="flex justify-between border-b border-neutral-800 pb-2">
                  <span>Social Life</span>
                  <span className="text-cyan-400">Deprecated</span>
                </li>
              </ul>
            </TechCard>

            <TechCard title="BACKGROUND_PROCESSES" index={3} className="overflow-hidden">
              <div className="flex flex-col gap-4">
                {[
                  { name: "Chess", cmd: "process: strategy", load: 50, icon: FaChessKnight },
                  { name: "Music", cmd: "driver: audio_out", load: 70, icon: FaMusic },
                  { name: "Sports", cmd: "process: agility", load: 30, icon: FaTableTennis },
                  { name: "Overthinking", cmd: "task: recursion_loop", load: 99, icon: FaBrain },
                ].map((proc, i) => {
                  const filledCount = Math.round(proc.load / 10);
                  const emptyBar = "-".repeat(10 - filledCount);
                  return (
                    <div key={i} className="flex items-center justify-between text-xs font-mono group/proc">
                      
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded bg-neutral-800 text-white md:text-neutral-400 group-hover/proc:text-white transition-colors">
                          <proc.icon size={14} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white md:text-neutral-400 group-hover/proc:text-white font-bold transition-colors">
                            {proc.name}
                          </span>
                          <span className="text-[10px] text-neutral-500 group-hover/proc:text-neutral-400">
                            {proc.cmd}
                          </span>
                        </div>
                      </div>

                      <div className="flex text-neutral-500 text-[10px]">
                        <span>[</span>
                        <span className={`${proc.load > 90 ? "text-red-500" : "text-white md:text-neutral-400"} group-hover/proc:${proc.load > 90 ? "": "text-white"} transition-colors`}>
                            {"#".repeat(filledCount)}
                        </span>
                        <span>{emptyBar}]</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TechCard>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;