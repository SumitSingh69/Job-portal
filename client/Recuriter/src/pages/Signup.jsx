import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
  
const Signup = () => {
    const[formData,setFormData] = useState({
        password:"",
        Fname:"", 
        email:"",
        username:"",
    });
    
    const handleInputChange=(e)=>{
        const{name,value,files} = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:files?files[0]:value,
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
      };

    return (
        <div className='w-screen h-screen bg-gradient-to-br from-sky-900 via-sky-600 to-sky-300 flex flex-col justify-center items-center'>
            <h1 className="text-5xl font-bold text-white mt-14 sm:mt-24 px-4 text-center">Online Job Portal</h1>
            <div class="w-screen h-screen  p-12  text-white flex flex-col sm:flex-row items-center justify-center relative overflow-hidden">
                
                <div className="absolute w-32 h-32 rounded-full bg-white/10 -top-10 -right-10"></div>
                <div className="absolute w-24 h-24 rounded-full bg-white/10 bottom-10 -left-10"></div>
                <div className="absolute w-16 h-16 rounded-full bg-white/10 top-1/2 right-10"></div>
                
                <div className=' bg-sky-300 w-96 h-96 sm:rounded-e-none p-3 sm:p-0 rounded-b-none rounded-xl flex flex-col items-center justify-center'>
                
                <h1 className="text-3xl font-bold mb-4 ">Welcome Back!</h1>
                <p className="text-center mb-8 ">Already have account?</p>
                 <button className="border-2 border-white px-10 py-2 rounded-full hover:bg-white/10 transition-colors relative z-10">
                    <Link to="/login">Login</Link>
                </button>
                </div>
                
    
            <div className="bg-white sm:rounded-s-none rounded-t-none rounded-lg shadow-lg w-96 h-96 max-w-md p-6">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 flex flex-col justify-center items-center">
                    <h1 className='text-black text-xl font-bold'>Signup</h1>
                        <input
                            type="email"
                            name='email'
                            value={FormData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Full Name"
                            name='Fname'
                            value={FormData.Fname}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            required
                        />
                        <input
                            type="text"
                            name='username'
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            required
                        />
                        <input
                            type="password"
                            name='password'
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            required
                        />
                    </div>

                    <div className="mt-6">
                        <button
                        type='submit'
                         className="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50  overflow-hidden h-16 w-64 rounded-md bg-sky-200 p-2 flex justify-center items-center font-extrabold">
                            <div className="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
                            <div className="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-sky-800"></div>
                            <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-sky-700"></div>
                            <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-sky-600"></div>
                            <p className="z-10">Signup</p>
                        </button>
                    </div>

                </form>
        
          </div>
        </div>
        </div>
    );
};

export default Signup;