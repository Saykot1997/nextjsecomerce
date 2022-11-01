import * as React from 'react';
import { FormEvent, useEffect, useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';

function Create({ toggleAdmode, catagories, setCatagories }: any) {
    const [catagoryName, setCatagoryName] = useState("")
    const [parentCatagory, setParentCatagory] = useState("")
    const [cookie, setCookie] = useCookies(["token"])
    const [image, setImage] = useState<any>(null)

    const clearImage = () => {
        setImage(null)
    }
    const selectImage = (file: File) => {
        setImage(file)
    }
    const createCatagory = async (e: FormEvent) => {
        e.preventDefault()
        try {
            type catagory = {
                catagoryName: string
                parant?: string,
                photo?: string
            }
            const data: catagory = {
                catagoryName
            }
            if (parentCatagory) {
                data.parant = parentCatagory
            }

            const formData = new FormData()
            formData.append(
                "file",
                image,
                image.name
            );
            const response = await axios.post(`/api/uploads`, formData, {
                headers: {
                    "Authorization": `Bearer ${cookie.token}`
                }
            });
            if (response.data.fileName) {
                data.photo = response.data.fileName
            }
            if (response) {
                const res = await axios.post(`/api/admin/catagories`, data, {
                    headers: {
                        "Authorization": `Bearer ${cookie.token}`
                    }
                });
                setCatagoryName("")
                setParentCatagory("")
                setCatagories([...catagories, res.data.data])
                setImage(null)
                toast.success("catagory created")
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }


    return (
        <div className='w-full flex justify-center mt-10 sm:mt-20 relative px-5'>
            <div className=' w-full sm:w-[450px]'>
                <div className=' w-full sm:w-[450px] bg-white rounded-lg py-5 shadow shadow-gray-200'>
                    <h2 className=' text-center text-lg sm:text-xl font-semibold'>Create Catagory</h2>
                    <div className=' flex justify-end pr-5 -translate-y-8'>
                        <button onClick={toggleAdmode} className="shadow shadow-red-300 p-1 rounded text-red-800 font-medium transition-all ease-linear duration-200 hover:scale-105">Close</button>
                    </div>
                    <form onSubmit={createCatagory} className=' w-full p-5' >
                        <div className=' w-full'>
                            <label className=' text-sm  font-medium text-gray-700' htmlFor="">Catagory Name : </label>
                            <input onChange={(e) => { setCatagoryName(e.target.value) }} value={catagoryName} type="text" placeholder='Catagory Name' required={true} className=' w-full rounded border focus:outline-none px-1 py-2 mb-2 mt-1' />
                        </div>
                        <div>
                            <label htmlFor="" className=' text-sm  font-medium text-gray-700'>Parent Catagory :</label>
                            <select value={parentCatagory} onChange={(e) => setParentCatagory(e.target.value)} name="" id="" className=' p-2 rounded border focus:outline-none w-full mt-1 mb-2'>
                                <option value="">Select Catagory</option>
                                {
                                    catagories.map((catagory: any, index: number) => {
                                        return (
                                            <option key={index} value={catagory._id}>{catagory.catagoryName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className=' relative'>
                            {
                                image &&
                                <button className=' absolute top-8 right-1 bg-red-500 px-2 py-[2px] rounded text-white' onClick={clearImage}>x</button>
                            }
                            <label htmlFor="file" className=' text-sm sm:text-base font-medium text-gray-700'>
                                <span className=' mb-1 block test-sm'>Catagory Photo :</span>
                                <span className=' block w-full h-32 border rounded'>
                                    {
                                        image &&
                                        <div className=' w-full h-full'>
                                            <img src={URL.createObjectURL(image)} alt="" className=' w-full h-full object-cover rounded' />
                                        </div>
                                    }
                                </span>
                            </label>
                            <input onChange={(e: any) => selectImage(e.target.files[0])} type="file" id='file' className=' w-full hidden' />
                        </div>
                        <div className=' w-full flex justify-center mt-2 sm:mt-3'>
                            <button type='submit' className=' w-full shadow shadow-blue-300 p-1 rounded text-blue-800 font-medium transition-all ease-linear duration-200 hover:scale-105'>Create</button>
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

export default Create