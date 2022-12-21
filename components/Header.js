import React, { useState } from 'react'
import AccountDropdown from './AccountDropdown'
import AccountModal from './AccountModal'

export default function Header() {
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            {openModal && <AccountModal setOpenModal={setOpenModal} />}
            <div className="sticky top-0 w-full left-0 bg-inherit flex items-center justify-between p-4 border-b border-solid border-white">
                <h1 className="text-3xl select-none sm:text-5xl duration-300">
                    AppName
                </h1>
                <AccountDropdown />
                <i
                    onClick={() => setOpenModal(true)}
                    className="sm:hidden block fa-solid fa-user relative text-xl duration-300 hover:opacity-40 cursor-pointer sm:text-3xl"
                ></i>
            </div>
        </>
    )
}
