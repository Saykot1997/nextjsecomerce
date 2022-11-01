import * as React from 'react';
import { FormEvent, useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const router = useRouter()

    const LoginFunc = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password || !firstName || !lastName || !mobileNumber) {
            toast.error('Please fill all the fields');
        } else {

            try {
                const loginData = {
                    firstName,
                    lastName,
                    mobileNumber,
                    email,
                    password
                }
                const res = await axios.post(`/api/admin/register`, loginData);
                router.push("/admin/login")
                console.log(res.data.data)

            } catch (error: any) {
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        <div className=' bg-gray-100 h-screen w-full flex justify-center items-center relative px-5'>
            <div className=' w-full sm:w-[450px]'>
                <div className=' w-full sm:w-[450px] bg-white rounded-lg py-5 shadow shadow-gray-200'>
                    <h2 className=' text-center text-lg sm:text-2xl pt-5 font-semibold'>Admin Login</h2>
                    <form className=' w-full py-5 px-5 sm:px-10' onSubmit={LoginFunc}>
                        <div className=' w-full'>
                            <label className=' text-sm sm:text-base font-medium' htmlFor="">First Name</label>
                            <input onChange={(e) => { setFirstName(e.target.value) }} value={firstName} type="text" placeholder='First Name' required={true} className='inputFild focus:outline-none' />
                        </div>
                        <div className=' w-full'>
                            <label className=' text-sm sm:text-base font-medium' htmlFor="">Last Name</label>
                            <input onChange={(e) => { setLastName(e.target.value) }} value={lastName} type="text" placeholder='Last Name' required={true} className='inputFild focus:outline-none' />
                        </div>
                        <div className=' w-full'>
                            <label className=' text-sm sm:text-base font-medium' htmlFor="">Email</label>
                            <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" placeholder='Email' required={true} className='inputFild focus:outline-none' />
                        </div>
                        <div className=' w-full'>
                            <label className=' text-sm sm:text-base font-medium' htmlFor="">Password</label>
                            <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" placeholder='Password' required={true} className='inputFild focus:outline-none' />
                        </div>
                        <div className=' w-full'>
                            <label className=' text-sm sm:text-base font-medium' htmlFor="">Mobile Number</label>
                            <input onChange={(e) => { setMobileNumber(e.target.value) }} value={mobileNumber} type="number" placeholder='Mobile Number' required={true} className='inputFild focus:outline-none' />
                        </div>
                        <div className=' w-full flex justify-center mt-2 sm:mt-5'>
                            <button type='submit' className=' w-full text-white font-semibold px-10 py-2 bg-blue-600 hover:bg-blue-700 rounded '>Register</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                className="w-72"
            />
        </div>
    )
}

export default Register