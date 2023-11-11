import React from 'react'

const NavBar = () => {
    return (
        <nav className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                            <h1 className='ml-3 text-base font-bold text-gray-500'>React Redux RTK Query</h1>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;