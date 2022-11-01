
import axios from "axios";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux"
import { HOST } from "../../data";

function Update() {

    const [admin, setAdmin] = useState<any>(null);
    const [cookie, setCookie] = useCookies(["token"])

    useEffect(() => {
        (async function () {
            try {
                const res = await axios.get(`${HOST}/api/admin`, {
                    headers: {
                        "Authorization": `Bearer ${cookie.token}`
                    }
                })
                // console.log(res.data)
                setAdmin(res.data.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const updateAdmin = async () => {

        try {
            const res = await axios.put(`${HOST}/api/admin`, admin, {
                headers: {
                    "Authorization": `Bearer ${cookie.token}`
                }
            })
            setAdmin(res.data.data)
            window.alert("update success")
        } catch (error) {
            console.log(error)
            window.alert("update failer")
        }
    }

    const changeValue = (name: string, value: string) => {
        setAdmin({ ...admin, [name]: value })
    }

    return (
        <div className='w-full flex justify-center relative px-5'>
            <div className=' pt-3'>
                <div className=" w-full lg:w-[700px] bg-white shadow p-5 py-8 rounded mt-2">
                    {
                        admin &&
                        <div>
                            <p className=" font-medium text-gray-700 text-center mb-2">Update Details</p>
                            <div className=" mb-1 sm:mb-2">
                                <label htmlFor="" className=" font-medium text-gray-700 text-sm">First Name</label>
                                <input type="text" className=" w-full mt-1 rounded border p-2 focus:outline-none" placeholder="First Name" value={admin.firstName} onChange={(e) => { changeValue("firstName", e.target.value) }} />
                            </div>
                            <div className=" mb-1 sm:mb-2">
                                <label htmlFor="" className=" font-medium text-gray-700 text-sm">Last Name</label>
                                <input type="text" className=" w-full mt-1 rounded border p-2 focus:outline-none" placeholder="Last Name" value={admin.lastName} onChange={(e) => { changeValue("lastName", e.target.value) }} />
                            </div>
                            <div className=" mb-1 sm:mb-2">
                                <label htmlFor="" className=" font-medium text-gray-700 text-sm">Email</label>
                                <input type="email" className=" w-full mt-1 rounded border p-2 focus:outline-none" placeholder="Email" value={admin.email} onChange={(e) => { changeValue("email", e.target.value) }} />
                            </div>
                            <div className=" mb-1 sm:mb-2">
                                <label htmlFor="" className=" font-medium text-gray-700 text-sm">Mobile Number</label>
                                <input type="text" className=" w-full mt-1 rounded border p-2 focus:outline-none" placeholder="Mobile Number" value={admin.mobileNumber} onChange={(e) => { changeValue("mobileNumber", e.target.value) }} />
                            </div>
                            <div>
                                <button onClick={updateAdmin} className=" w-full mt-2 bg-blue-500 text-white rounded py-2">Update</button>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Update