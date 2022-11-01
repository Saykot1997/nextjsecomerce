import React, { useState } from 'react'
import { catagoryType } from '../../types/catagoty'

type catagotyProps = {
    catagory: catagoryType
}

function CatagoryItem({ catagory }: catagotyProps) {


    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    if (catagory.children && catagory.children.length > 0) {
        return (
            <div className=' mb-1'>
                <div className=' flex items-center'>
                    <span onClick={toggleOpen} className=' inline-flex h-6 w-6 mr-2 bg-gray-100 rounded items-center justify-center cursor-pointer font-medium'>{isOpen ? "-" : "+"}</span>
                    <p className=' text-gray-700'>{catagory.catagoryName}</p>
                </div>
                {
                    isOpen &&
                    <div className=' ml-8 py-1'>
                        {
                            catagory.children.map((it, index) => {
                                return (
                                    <CatagoryItem catagory={it} key={index} />
                                )
                            })
                        }
                    </div>
                }
            </div>
        )
    } else {
        return (
            <p className=' text-gray-700 ml-1'>{catagory.catagoryName}</p>
        )
    }
}

export default CatagoryItem