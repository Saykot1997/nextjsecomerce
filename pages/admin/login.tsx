import * as React from 'react';
import { FormEvent, useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminLoginSuccess, loading, adminLoginFailure } from "../../Redux/AdminSlice"
import { useDispatch } from "react-redux"
import { useRouter } from 'next/router';
import { useCookies } from "react-cookie"

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const router = useRouter()
    const [cookie, setCookie] = useCookies(["token"])

    const LoginFunc = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill all the fields');
        } else {
            try {
                const loginData = {
                    email,
                    password
                }
                const res = await axios.post(`/api/admin/login`, loginData);
                dispatch(adminLoginSuccess(res.data.data));
                setCookie("token", res.data.data.token, {
                    path: "/",
                    maxAge: 3600 * 24, // Expires after 24hr
                    sameSite: true,
                })
                router.push("/admin")
            } catch (error: any) {
                dispatch(adminLoginFailure)
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        <div className=' bg-gray-100 h-screen w-full flex justify-center relative px-5'>
            <div className=' w-full sm:w-[450px] mt-40'>
                <div className=' w-full sm:w-[450px] bg-white rounded-lg py-5 shadow shadow-gray-200'>
                    <h2 className=' text-center text-lg sm:text-2xl pt-5 font-semibold'>Admin Login</h2>

                    <form className=' w-full py-5 px-5 sm:px-10' onSubmit={LoginFunc}>
                        <div className=' w-full'>
                            <label htmlFor="" className=' text-sm sm:text-base font-medium'>Email</label>
                            <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" placeholder='Email' required={true} className='inputFild focus:outline-none' />
                        </div>
                        <div className=' w-full'>
                            <label htmlFor="" className=' text-sm sm:text-base font-medium'>Password</label>
                            <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" placeholder='Password' required={true} className='inputFild focus:outline-none' />
                        </div>
                        <div className=' w-full flex justify-center mt-2 sm:mt-5'>
                            <button type='submit' className=' w-full text-white font-semibold px-10 py-2 bg-blue-600 hover:bg-blue-700 rounded '>Login</button>
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

export default Login