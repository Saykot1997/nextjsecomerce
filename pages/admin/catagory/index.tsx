
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CatagoryItem from '../../../components/admin/CatagoryItem';
import CreateCatagory from "../../../components/admin/CatagoryCreate"
import { catagoryType } from '../../../types/catagoty';


function index() {
    const [catagories, setCatagories] = useState<catagoryType[]>([])
    const [addMod, setAddMode] = useState(false)

    const toggleAdmode = () => {
        setAddMode(!addMod)
    }
    async function fatchCatagory() {
        const res = await axios.get(`/api/admin/catagories`);
        const catagoriesToSave: catagoryType[] = []
        const pushCatagory = (array: any) => {
            for (let i of array) {
                if (i.children?.length > 0) {
                    pushCatagory(i.children)
                }
                delete i.children
                catagoriesToSave.push(i)
            }
        }
        pushCatagory(res.data.data)
        setCatagories(catagoriesToSave)
    }
    useEffect(() => {
        fatchCatagory()
    }, [])

    console.log(catagories)


    return (
        <div className=' p-5'>
            {
                addMod &&
                <div className=' fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30 p-5 z-50 '>
                    <CreateCatagory toggleAdmode={toggleAdmode} catagories={catagories} setCatagories={setCatagories} />
                </div>
            }
            <div className=' w-full bg-white shadow rounded p-5 relative'>
                <p className=' text-center text-lg font-medium'>Catagories</p>
                <button onClick={toggleAdmode} className=' shadow shadow-blue-300 text-blue-800 p-1 absolute top-4 right-4 rounded hover:scale-105 transition-all ease-in duration-200 font-medium'>Add</button>
                <table className=' w-full mt-3'>
                    <thead>
                        <tr className=' bg-gray-100 '>
                            <th className=' font-medium p-1 text-gray-600 text-left'>Photo</th>
                            <th className=' font-medium p-1 text-gray-600'>Name</th>
                            <th className=' font-medium p-1 text-gray-600'>Parant</th>
                            <th className=' font-medium p-1 text-gray-600 text-right'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            catagories.map((catagory: catagoryType, index: number) => {
                                return (
                                    <tr className=' text-sm text-gray-700 border-b'>
                                        <td className=' p-1'>
                                            <div className=' h-10 w-10 rounded overflow-hidden'>
                                                {
                                                    catagory.photo &&
                                                    <img className=' h-full w-full object-cover' src={`/uploads/${catagory.photo}`} />
                                                }
                                            </div>
                                        </td>
                                        <td className=' text-center p-1'>{catagory.catagoryName}</td>
                                        <td className=' text-center p-1'>
                                            {
                                                catagory.parant &&
                                                <span>{catagory.parant.catagoryName}</span>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                {/* {
                    catagories.map((catagory: catagoryType, index: number) => {
                        return (
                            <CatagoryItem catagory={catagory} key={index} />
                        )
                    })
                } */}
            </div>
        </div>
    )
}

export default index