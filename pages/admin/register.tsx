import * as React from 'react';
import { FormEvent, useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiFillFacebook } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()

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
                const res = await axios.post(`/api/admin/register`, loginData);
                router.push("/admin/login")
                console.log(res.data.data)

            } catch (error: any) {
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        <div className=' bg-gray-100 h-screen w-full relative px-5'>
            <div className=' w-full pt-40 flex justify-center'>
                <div className=' w-full sm:w-[350px] p-5 rounded-md bg-white shadow'>
                    <h2 className=' text-lg font-semibold mb-2'>Sign Up</h2>
                    <form className=' w-full mt-2' onSubmit={LoginFunc}>
                        <div className=' w-full relative'>
                            <MdEmail className=' absolute top-3 left-2 text-sm text-gray-500' />
                            <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" placeholder='Email' required={true} className=' w-full p-2 rounded focus:outline-none border pl-8 placeholder:text-sm placeholder:font-medium' />
                        </div>
                        <div className=' w-full relative mt-3'>
                            <RiLockPasswordFill className=' absolute top-3 left-2 text-sm text-gray-500' />
                            <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" placeholder='Password' required={true} className=' w-full p-2 rounded focus:outline-none border pl-8 placeholder:text-sm placeholder:font-medium' />
                        </div>
                        <div className=' flex justify-between mt-3'>
                            <p className=' text-[12px] leading-5 text-gray-500'>By signing up, you confirm that you've read and accepted our <span className=' text-blue-500 '> User Notice</span> and <span className=' text-blue-500 '>Private Policy</span></p>
                        </div>
                        <div className=' w-full flex justify-center mt-4'>
                            <button type='submit' className=' w-full text-white font-semibold py-1 bg-blue-600 hover:bg-blue-700 rounded '>Sign In</button>
                        </div>
                        <p className=' text-sm text-center mb-2 mt-4 text-gray-500'>or Login with</p>
                        <div className=' flex items-center gap-2 mt-4'>
                            <div className=' flex flex-1 items-center rounded border p-1 cursor-pointer'>
                                <AiFillFacebook className=' text-blue-500 mr-2' />
                                <span className=' font-medium text-sm'>Facebook</span>
                            </div>
                            <div className=' flex flex-1 items-center rounded border p-1 cursor-pointer'>
                                <FcGoogle className=' text-blue-500 mr-2' />
                                <span className=' font-medium text-sm'>Google</span>
                            </div>
                        </div>
                        <div className=' my-5'>

                            <p className=' text-center font-medium text-sm text-gray-600'>Already have an account?
                                <Link href="/admin/login">
                                    <a>
                                        <span className=' text-blue-600 font-medium ml-1'>Sign In</span>
                                    </a>
                                </Link>
                            </p>
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