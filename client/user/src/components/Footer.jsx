import React from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
  
        <footer className='bg-[#0C0717] flex flex-col sm:flex-row justify-between p-4'>
            <div className='flex flex-col mx-6 my-4'>
                <h1 className='font-semibold text-white text-lg' >Naukri Marg</h1>
                <p className='text-slate-300'>Find your next job with Naukri Marg , connecting job seekers with top employers</p> 
                <div className='flex space-x-4 my-3'>
                <FaInstagram className='text-white text-2xl' />
                <FaLinkedin className='text-white text-2xl' />
                <FaTwitter className='text-white text-2xl' />
                    </div> 
                
            </div>
            <div className='flex flex-col mx-6 my-4'>
                <h1 className='text-white font-semibold text-lg'>Quick Links</h1>
                <a href="#" className='text-slate-300'>Privacy policy</a>
                <a href="#"className='text-slate-300' >Terms & Conditions</a>
                <a href="#" className='text-slate-300'>FAQ</a>
                <Link to="/contact" className='text-slate-300'>Contact</Link>
            </div>
            <div className='flex flex-col mx-6 my-4'>
            <h1 className='font-semibold text-white text-lg' >Contact Us</h1>
                <h1 className=' text-slate-300' >Email:info@naukrimarg.com</h1>
                <p className='text-slate-300'>Phone: +123 456 7890</p>
            </div>
        </footer>

  )
}

export default Footer