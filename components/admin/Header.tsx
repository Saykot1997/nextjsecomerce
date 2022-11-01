import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { adminLogout } from "../../Redux/AdminSlice"

function Header() {
    const [cookie, setCookie] = useCookies(["token"])
    const dispatch = useDispatch()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()
    const path = router.pathname
    const toggleMenuMode = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    const logoutFunc = () => {
        dispatch(adminLogout())
        setCookie("token", "", {
            path: "/",
            maxAge: -1, // Expires now
            sameSite: true,
        })
        router.push("/admin/login")
    }
    useEffect(() => {
        document.addEventListener("mouseup", (e: any) => {
            if (isMenuOpen) {
                const toggleBTN = document.getElementById("toggleBTN")
                const menu = document.getElementById("menu");
                if (!menu?.contains(e.target) && toggleBTN !== e.target) {
                    setIsMenuOpen(false)
                }
            }
        })
    }, [isMenuOpen])

    return (
        <div className=' w-full h-14 bg-white shadow-sm z-10 fixed top-0 left-0'>
            <div className=' w-full flex justify-between items-center px-10 py-3 relative'>
                <Link href="/admin/">
                    <a>
                        <span className=' cursor-pointer font-medium text-gray-700'>logo</span>
                    </a>
                </Link>
                <p onClick={toggleMenuMode} id="toggleBTN" className=' cursor-pointer font-medium text-gray-700'>Admin</p>
                {
                    isMenuOpen &&
                    <div id='menu' className={` py-2 px-1 bg-white shadow-sm absolute top-10 right-2`}>
                        <Link href="/admin/profile">
                            <a className=' block'>
                                <span className={` py-1 block hover:bg-gray-100 rounded px-5 my-1 cursor-pointer  text-gray-700 font-medium text-sm ${path.includes("profile") && "bg-gray-100"} `}>Profile</span>
                            </a>
                        </Link>
                        <Link href="/admin/update">
                            <a className=' block'>
                                <span className={` py-1 block hover:bg-gray-100 rounded px-5 my-1 cursor-pointer  text-gray-700 font-medium text-sm ${path.includes("update") && " bg-gray-100"}`}>Update</span>
                            </a>
                        </Link>
                        <p onClick={logoutFunc} className=' py-1 hover:bg-red-100 hover:text-red-800 rounded px-5 my-1 cursor-pointer  text-red-400 font-medium text-sm '>Logout</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header