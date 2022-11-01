import React from 'react'
import MenuItem from './MenuItem'
import { AiFillHome, AiOutlineAppstoreAdd } from "react-icons/ai"
import { BiCategory, BiShoppingBag } from "react-icons/bi"
import { RiAddFill } from "react-icons/ri"
import { FiShoppingCart } from "react-icons/fi"

function SidebarComponent() {

    const menudata = [
        {
            name: "Dashboard",
            icon: <AiFillHome />,
            link: "/admin/"
        },
        {
            name: "Catagory",
            icon: <BiCategory />,
            link: "/admin/catagory"
        },
        {
            name: "Products",
            icon: <BiShoppingBag />,
            children: [
                {
                    name: "Show",
                    icon: <BiShoppingBag />,
                    link: "/admin/products"
                },
                {
                    name: "Add",
                    icon: <RiAddFill />,
                    link: "/admin/products/create"
                }
            ]
        },
        {
            name: "Orders",
            icon: <FiShoppingCart />,
            link: "/admin/orders"
        }
    ]
    return (
        <div className=' h-screen pt-14 fixed top-0 left-0 w-[180px] bg-white shadow-sm'>
            {
                menudata.map((item, index) => {
                    return (
                        <MenuItem item={item} key={index} />
                    )
                })
            }
        </div>
    )
}

export default SidebarComponent