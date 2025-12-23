import { useState } from 'react';
import { FaGithub, FaCheck, FaLock } from 'react-icons/fa';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "siddheshkm25@iitk.ac.in"; 

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    { icon: FaGithub, link: "https://github.com/skm183", label: "GITHUB" }
  ];

  return (
    <section className="relative w-full mt-32 py-32 px-6 bg-neutral-950">
      
      <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-neutral-950/0 to-neutral-950 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center">
        
        <div className="flex items-center justify-center gap-4 mb-12 opacity-80">
            <div className="h-[2px] w-25 md:w-60 bg-linear-to-r from-transparent to-cyan-500"></div>
            <h2 className="text-2xl md:text-3xl font-bold font-mono text-white tracking-widest flex items-center gap-2">
                <span className="text-cyan-500">[</span> 
                Contact 
                <span className="text-cyan-500">]</span>
            </h2>
            <div className="h-[2px] w-25 md:w-60 bg-linear-to-l from-transparent to-cyan-500"></div>
        </div>

        <p className="text-neutral-400 font-mono mb-12 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
          Interested in collaborating? Or just want to reach out? Establish a secure connection via the email protocol:
        </p>

        <div className="relative group max-w-lg mx-auto mb-24">
            <div className="absolute inset-0 bg-cyan-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
            
            <button 
                onClick={handleCopy}
                className={`
                    relative w-full border transition-all duration-300 rounded p-8 flex flex-col items-center gap-4 group-hover:scale-[1.02]
                    ${copied 
                        ? 'bg-green-900/10 border-green-500/50' 
                        : 'bg-neutral-900/50 border-cyan-500/50 md:border-neutral-800 md:hover:border-cyan-500/50 hover:bg-neutral-900'}
                `}
            >
                <div className="flex items-center gap-3 font-mono text-xl md:text-2xl">
                    {copied ? (
                         <span className="text-green-400 flex items-center gap-2">
                            <FaCheck /> MAIL_ADDR_COPIED
                         </span>
                    ) : (
                         <span className="text-neutral-300 group-hover:text-white transition-colors flex items-center gap-3">
                            <FaLock className="text-cyan-500 text-sm mb-1" />
                            <span className="tracking-widest">***********</span>
                         </span>
                    )}
                </div>

                <div className={`
                    text-[10px] font-mono tracking-[0.2em] uppercase py-1 px-3 rounded border transition-colors
                    ${copied 
                        ? 'border-transparent text-green-500/80' 
                        : 'border-neutral-800 text-cyan-500 md:text-neutral-400 group-hover:text-cyan-500 group-hover:border-cyan-500/20'}
                `}>
                    {copied ? 'Ready to Paste' : 'Click to Decrypt & Copy'}
                </div>
            </button>
        </div>

        <div className="flex justify-center gap-6 mb-6">
            {socials.map((social, idx) => (
                <a 
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 bg-neutral-900/50 rounded border border-neutral-800 hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300"
                >
                    <social.icon className="text-xl text-neutral-400 group-hover:text-cyan-400 transition-colors" />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded">
                        {social.label}
                    </span>
                </a>
            ))}
        </div>

        <footer className="border-t border-neutral-900/50 pt-8 text-[12px] font-mono text-neutral-400 flex flex-col gap-2">
            <div className="flex justify-center items-center gap-2 text">
                <span>There is no place like</span>
                <span className="text-cyan-500 font-bold text-lg">~/</span>
            </div>
            <div>
                © {new Date().getFullYear()} skm183
            </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;