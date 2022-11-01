import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import { useCookies } from 'react-cookie'

interface LayoutProps {
    children: React.ReactNode;
}

function AdminLayout({ children }: LayoutProps) {

    const [cookie, setCookie] = useCookies(["token"])
    const router = useRouter()
    const path = router.pathname

    // console.log(cookie)

    useEffect(() => {
        if (cookie.token && (path.includes("/login") || path.includes("/register"))) {
            router.replace("/admin")
        }
        if (!cookie.token && (!path.includes("/login") && !path.includes("/register"))) {
            router.replace("/admin/login")
        }
    }, [path])

    if (path.includes("/login") || path.includes("/register")) {
        return (
            <>{children}</>
        )
    } else {
        return (
            <div className=' w-full min-h-screen bg-gray-100'>
                <Header />
                <Sidebar />
                <div className=' pt-14 pl-[180px]'>
                    {children}
                </div>
            </div>
        )
    }
}

export default AdminLayout