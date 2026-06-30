import React from 'react';

const VDP = () => {
    const art = `                                                                                                             
     @@@  @@@   @@@@@@   @@@       @@@           @@@@@@   @@@@@@@@     @@@@@@@@   @@@@@@   @@@@@@@@@@   @@@@@@@@  
     @@@  @@@  @@@@@@@@  @@@       @@@          @@@@@@@@  @@@@@@@@     @@@@@@@@  @@@@@@@@  @@@@@@@@@@@  @@@@@@@@  
    @@!  @@@  @@!  @@@  @@!       @@!          @@!  @@@  @@!          @@!       @@!  @@@  @@! @@! @@!  @@!       
    !@!  @!@  !@!  @!@  !@!       !@!          !@!  @!@  !@!          !@!       !@!  @!@  !@! !@! !@!  !@!       
    @!@!@!@!  @!@!@!@!  @!!       @!!          @!@  !@!  @!!!:!       @!!!:!    @!@!@!@!  @!! !!@ @!@  @!!!:!    
   !!!@!!!!  !!!@!!!!  !!!       !!!          !@!  !!!  !!!!!:       !!!!!:    !!!@!!!!  !@!   ! !@!  !!!!!:    
  !!:  !!!  !!:  !!!  !!:       !!:          !!:  !!!  !!:          !!:       !!:  !!!  !!:     !!:  !!:       
  :!:  !:!  :!:  !:!   :!:       :!:         :!:  !:!  :!:          :!:       :!:  !:!  :!:     :!:  :!:       
 ::   :::  ::   :::   :: ::::   :: ::::     ::::: ::   ::           ::       ::   :::  :::     ::    :: ::::`;
    return (
        <div className="flex flex-col grow bg-black py-20 px-6 font-mono text-sm md:text-base">
            <div className="max-w-7xl mx-auto w-full">
                
                <h1 className="text-4xl font-bold text-white mb-4">
                    <span className="text-cyan-500">~/</span>security
                </h1>

                <div className='flex gap-1 text-white font-sans text-xl md:text-3xl border-b-3 border-cyan-600 w-fit mb-2 items-center'>
                    <span className='text-cyan-400 font-bold text-2xl md:text-4xl'>{"<"}</span>
                    <div>Vulnerability Disclosure Program</div>
                    <span className='text-cyan-400 font-bold text-2xl md:text-4xl'>{">"}</span>

                </div>  

                <p className="text-neutral-300 mb-16 max-w-3xl">
                    As a security enthusiast, I believe working with skilled researchers is crucial in identifying potential vulnerabilities. A VDP would help both offensive and defensive sides of cybersecurity to grow together. If you believe you've found a security issue, please report via email to <span className='text-neutral-500'>[</span><a href="mailto:siddheshkm25@iitk.ac.in?subject=Vulnerability Disclosure Report" className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-500/30 hover:decoration-cyan-400 underline-offset-4 transition-colors font-semibold">siddheshkm25@iitk.ac.in</a><span className='text-neutral-500'>]</span>. Responsible disclosure is higly valued but any kind of destructive testing is prohibited.
                </p>

                <div className="mb-16">
                    <h2 className="text-base md:text-xl text-white font-semibold">In Scope Assets</h2>
                    <div className="text-xs md:text-sm text-neutral-400 mb-5 flex items-center gap-1">
                        <span className="text-cyan-500 font-bold self-start">$</span>
                        <span>psql -c "SELECT targets FROM rules WHERE status='IN_SCOPE';"</span>
                    </div>
                    
                    <ul className="list-[square] ml-5 space-y-2 text-white">
                        <li className="">
                            <span className='text-sm md:text-base'>Primary Web Application (*skm183.is-a.dev):</span>
                            <p className="text-neutral-300 text-xs md:text-sm">Given the site's currently limited functionality, the most probable attack vectors are DOM-based XSS, CORS misconfigurations, and sensitive data exposure within client bundles. However, the scope is not restricted to these. Any valid security flaw discovered now or as new features are introduced is fully in scope.</p>
                        </li>
                        <li className="">
                            <span className='text-sm md:text-base'>Backend & Database (Firebase):</span>
                            <p className="text-neutral-300 text-xs md:text-sm">Security rule misconfigurations, unauthorized data read/writes, authentication bypass, and privilege escalation.</p>
                            <div className='text-xs md:text-sm text-neutral-400'>
                                The exact firestore rules can be found here: 
                                <a href="https://github.com/skm183/skm183.github.io/blob/main/firestore.rules" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-400 underline decoration-cyan-500/30 hover:decoration-cyan-400 underline-offset-4 transition-colors">firestore.rules</a>
                            </div>
                        </li>
                        <li className="">
                            <span className='text-sm md:text-base'>Cloud Infrastructure (Azure VM / Nginx):</span>
                            <p className="text-neutral-300 text-xs md:text-sm">Server-side misconfigurations, exposed sensitive endpoints, directory traversal, and subdomain takeovers.</p>
                        </li>
                    </ul>
                </div>

                <div className="mb-16">
                    <h2 className="text-base md:text-xl text-white font-semibold">Out of Scope</h2>
                    <div className="text-xs md:text-sm text-neutral-400 mb-5 flex items-center gap-1">
                        <span className="text-cyan-500 font-bold">$</span>
                        <span>psql -c "SELECT violation FROM rules WHERE status='RESTRICTED';"</span>
                    </div>
                    
                    <ul className="list-[square] ml-5 space-y-2 text-white">
                        <li className="">
                            <span className='text-sm md:text-base'>Prohibited Attack Vectors:</span>
                            <p className="text-neutral-300 text-xs md:text-sm">Denial of Service (DoS/DDoS), resource exhaustion, automated scanner noise (e.g., Nessus, Acunetix), social engineering (phishing), and physical security testing.</p>
                        </li>
                        <li className="">
                            <span className='text-sm md:text-base'>Low-Impact/Informational Vulnerabilities</span>
                            <p className="text-neutral-300 text-xs md:text-sm">Clickjacking, Self-XSS, CSRF, missing HTTP security headers, and descriptive error messages without demonstrating considerable impact.</p>
                        </li>
                        <li className="">
                            <span className='text-sm md:text-base'>Third-Party Integrations:</span>
                            <p className="text-neutral-300 text-xs md:text-sm">Vulnerabilities originating from external vendors, upstream providers, or Firebase/Azure core services. Only my specific implementations and configurations are in scope.</p>
                        </li>
                    </ul>
                </div>

                <div className="mb-16">
                    <div className="py-1 text-neutral-300 text-xs md:text-base bg-neutral-800 p-2 rounded">
                        <span className='text-white mr-2'>Note:</span>
                        There will be NO monetary rewards for finding vulnerabilities. Valid findings are rewarded exclusively with formal recognition in the Hall of Fame below.
                    </div>
                </div>

                <div className="w-full flex items-center justify-center gap-4 mt-10 mb-5">
                    <div className="h-[2px] w-1/3 bg-linear-to-r from-transparent to-cyan-500/40"></div>
                    <span className="text-cyan-500/90 font-mono text-[10px] md:text-sm tracking-[0.3em]">
                        HONORS.LOG
                    </span>
                    <div className="h-[2px] w-1/3 bg-linear-to-l from-transparent to-cyan-500/40"></div>
                </div>

                <div className='flex flex-col justify-center items-center text-xs md:text-base'>
                    <div className="relative mb-9 group">
                        <div className="absolute -inset-1 bg-linear-to-r from-[#373737] via-[#606060] to-[#363636] rounded-xl blur-lg opacity-80 animate-[pulse_2.5s_ease-in-out_infinite]"></div>
                            <pre className="relative text-[4px] md:text-[10px] font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-200 via-cyan-500 to-cyan-300 border border-white/10 bg-neutral-950/80 backdrop-blur-xl text-center p-6 w-fit leading-none tracking-widest rounded-xl shadow-2xl">
                                {art}
                            </pre>
                        </div>
                    
                    <p className='text-neutral-400'>It's empty for now. Either the site is secure or you haven't tried hard enough...</p>
                    <p className='text-cyan-400'>Picture yourself here?</p>
                </div>

            </div>
        </div>
    );
};

export default VDP;