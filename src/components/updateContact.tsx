import React, { useState, Fragment, useRef, ChangeEvent, FormEvent, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { useUpdateContactMutation } from '../services/contactFirstore';
import { Contact } from '../models/contact.model';

type UpdateContactProps = {
    open: boolean;
    setOpen: (state: boolean) => void;
    contact: Contact;
}

const UpdateContact = ({ open, setOpen, contact }: UpdateContactProps) => {
    const cancelButtonRef = useRef(null)
    const [updatedContact, setUpdatedContact] = useState<Contact>({ id: '', name: '', email: '' });
    const [updateContact] = useUpdateContactMutation();

    useEffect(() => setUpdatedContact(prevState => contact), [contact]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => setUpdatedContact(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    // update contact
    const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await updateContact(updatedContact).then(resp => {
            setOpen(false);
            setUpdatedContact({ id: '', name: '', email: '' });
        });
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <form method="POST" onSubmit={handleOnSubmit}>
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-bold leading-6 text-gray-900">
                                                    Edit Contact
                                                </Dialog.Title>
                                                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                                                    {/* Name */}
                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Name
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                id="fullName"
                                                                value={updatedContact.name}
                                                                onChange={handleOnChange}
                                                                autoComplete="full-name"
                                                                required
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* Email address */}
                                                    <div className="col-span-full">
                                                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Email
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="email"
                                                                id="emailAddress"
                                                                value={updatedContact.email}
                                                                onChange={handleOnChange}
                                                                autoComplete="email-address"
                                                                required
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="submit"
                                            className="inline-flex w-full justify-center rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 sm:ml-3 sm:w-auto"
                                        >
                                            Update
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default UpdateContact;