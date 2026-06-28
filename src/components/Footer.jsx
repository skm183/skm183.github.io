import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t border-neutral-900/50 text-[12px] md:text-sm font-mono text-neutral-400 flex flex-col gap-2 m-5 justify-center items-center">
        <div className="flex justify-center items-center gap-2 text">
            <span>There is no place like</span>
            <span className="text-cyan-500 font-bold text-lg">~/</span>
        </div>
        <div className='flex flex-col md:flex-row justify-between text-xs md:text-sm mt-3 bg-neutral-800 p-5 md:px-10 rounded w-full gap-5'>
            <div className='flex flex-col items-start'>
                <div className='md:self-start text-white'>Quick links</div>
                <div className='flex gap-4'>
                    <Link to='changelog' className='hover:underline hover:text-cyan-400'>Changelog</Link>
                    <Link to='security' className='hover:underline hover:text-cyan-400'>Security</Link>
                </div>
            </div>
            <div className='self-end'>
                © {new Date().getFullYear()} skm183
            </div>
        </div>
    </footer>
  )
}

export default Footer