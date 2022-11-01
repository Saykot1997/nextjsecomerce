import Link from 'next/link'
import React, { useState } from 'react'

function MenuItem({ item }: any) {
    // console.log(item)
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    if (item.children) {
        return (
            <>
                <div onClick={toggleOpen} className=' flex items-center p-2 px-3 hover:bg-gray-100 cursor-pointer'>
                    {item.icon}
                    <span className=' ml-1'>{item.name}</span>
                </div>
                {
                    isOpen &&
                    <div className=' ml-3'>
                        {
                            item.children.map((chil: any, index: number) => {
                                return (
                                    <MenuItem item={chil} key={index} />
                                )
                            })
                        }
                    </div>
                }
            </>
        )

    } else {
        return (
            <Link href={item.link}>
                <a>
                    <div className=' flex items-center p-2 px-3 hover:bg-gray-100'>
                        {item.icon}
                        <span className=' ml-1'>{item.name}</span>
                    </div>
                </a>
            </Link>

        )
    }
}

export default MenuItem