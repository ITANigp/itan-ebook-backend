"use client"

import React, { useState } from 'react'
import Link from 'next/link'

import { registerAuthor } from "@/utils/api";


const signUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await registerAuthor(email, password);
            setMessage("Registration successfully! You can now log in.");
        } catch (error) {
      if(!error.response) {
         return {
           success: false,
           message: setError(
             "Cannot connect to the server. Please try again later."
           ),
         };
      } else {
        return { success: false, message: setMessage(error.response?.data?.message || "Registration failed. Try again.")}
      }
    } 
    };

  return (
    <div className='bg-gray-200 grid grid-cols-2 m-10 rounded-2xl'>
        <div className='m-8'>
         <img src='/images/logo.png' className='w-12 h-7'/>
         <h2 className='mt-24 m-2 text-2xl font-bold'>
         Your Stories, Your <br />Voice
         </h2>
         <p className='w-96'>Itan is a revolutionary publishing
             platform designed specifically for 
             writers like you to seamlessly publish your 
             work to a global audience, retaining creative 
             control and ownership every step of the way.</p>
            <div className='mt-40'>
            <img src='/images/community_img.png' className='w-32'/>
            <p>Share your story with the world.  Join our community of authors today!</p>
            <div>
                <div className='flex  items-center h-9'>
                <img src='/images/check.png' className='w-5 h-4 mr-3'/>
                <p className=''>Reach readers worldwide with your work </p>
                </div>
                <div className='flex  items-center h-9'>
                <img src='/images/check.png' className='w-5 h-4 mr-3'/>
                <p className=''>Monetize your writing, amplify your impact </p>
                </div>
                <div className='flex  items-center h-9'>
                <img src='/images/check.png' className='w-5 h-4 mr-3'/>
                <p className=''>Become part of a supportive and inspiring author community </p>
                </div>
            </div>
            </div>
        </div>
        <div className='bg-white rounded-2xl p-10 mr-7 my-5'>
            <div className=''>
            <p className='text-2xl font-bold '>Welcome!</p>
            <p className='text-sm mb-4'>Already have an account? <Link href="/authors/sign_in" className='font-bold cursor-pointer hover:text-blue-700'><span>Log In</span> </Link></p>
            </div>
     <form onSubmit={handleSignup}>
     <div className=''>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
            <input type="text" id="name" className="h-14 text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required />
        </div>
        <div className='mt-4'>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
            <input
               type="text" 
               id="email" 
               className="h-14 text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Johndoe@gmail.com" required 
               value={email}
               onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className='mt-4'>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
            <input type="text" id="phone" className="h-14 text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="(+234) 8149984458" required />
        </div>
        <div className='my-4'>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input 
              type="password" 
              id="password" 
              className="h-14 text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
        </div>
         <div>
         <button type="submit" className="h-14 text-2xl font-bold bg-[#E50913] rounded-lg  px-5 py-2.5 text-center me-2 mb-2 w-full">Sign Up</button>
         <button type="button" className="h-14 hover:text-white text-[#4e4c4c] space-x-5 flex w-full  px-3 py-2 font-medium text-center items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300">
<img src='/images/google.png' className='w-6 h-6'/>
<p className=''>Continue with Google</p>
</button>
         </div>
     </form>
        </div>
    </div>
  )
}

export default signUp