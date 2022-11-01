import axios from "axios";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { HOST } from "../../data"
// import { GetServerSideProps } from 'next'

function Profile() {
    // const admin = props.data.data
    type admin = {
        firstName: string,
        lastName: string,
        email: string,
        mobileNumber: string
    }
    const [admin, setAdmin] = useState<admin | null>(null);
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

    return (
        <div className='w-full flex justify-center relative px-5'>
            <div className=' pt-3'>
                <div className=" w-full sm:w-[700px] bg-white shadow p-5 rounded mt-2">
                    <p className=" font-medium text-gray-700 text-center mb-2">Admin Details</p>
                    <p className=" text-sm font-medium text-gray-700 mb-2 capitalize">Name : {admin?.firstName} {admin?.lastName} </p>
                    <p className=" text-sm font-medium text-gray-700 mb-2">Email : {admin?.email}</p>
                    <p className=" text-sm font-medium text-gray-700 mb-1">Mobile Number : {admin?.mobileNumber}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile


// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const cookies: any = context.req.cookies['token']
//     const res = await fetch(`${HOST}/api/admin`, {
//         headers: {
//             "Authorization": `Bearer ${cookies}`
//         }
//     })
//     const data = await res.json()
//     return { props: { data } }
// }


