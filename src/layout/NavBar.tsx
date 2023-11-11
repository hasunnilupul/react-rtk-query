import React, { useState } from 'react'
import CreateNewContact from '../components/createNewContact';

const NavBar = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
            <nav className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=amber&shade=500" alt="Your Company" />
                                <h1 className='ml-3 text-base font-bold text-gray-500'>React Redux RTK Query</h1>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="flex flex-row justify-center items-center rounded-md bg-amber-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                            onClick={() => setShowModal(prevState => !prevState)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Create
                        </button>
                    </div>
                </div>
            </nav>
            <CreateNewContact open={showModal} setOpen={setShowModal} />
        </>
    )
}

export default NavBar;