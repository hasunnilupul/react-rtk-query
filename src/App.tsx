import React, { useState } from "react";

import {
  useContactsQuery,
  useDeleteContactMutation,
} from "./services/contactFirstore";
import NavBar from "./layout/NavBar";
import ContactDetail from "./components/contactDetail";
import { Contact } from "./models/contact.model";
import UpdateContact from "./components/updateContact";

function App() {
  const { data, isError, isLoading, isFetching, isSuccess } =
    useContactsQuery();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editingContact, setEditingContact] = useState<Contact>({
    id: "",
    name: "",
    email: "",
  });
  const [deleteContact] = useDeleteContactMutation();

  // show contact edit modal
  const openEditModal = (contact: Contact) => {
    setEditingContact(contact);
    setShowEditModal(true);
  };

  // close contact edit modal
  const closeEditModal = (open: boolean) => {
    setEditingContact({ id: "", name: "", email: "" });
    setShowEditModal(open);
  };

  // delete contact
  const handleOnDelete = async (id: string) => {
    if (window.confirm("Do you wanna delete this contact?")) {
      await deleteContact(id);
    }
  };

  return (
    <>
      <NavBar />
      <main className="relative flex-grow flex flex-col justify-between items-center">
        {/* Contacts loading state */}
        {isLoading && (
          <svg
            className="mx-auto my-auto animate-spin h-16 w-16 text-amber-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}

        {/* Contacts fetching state */}
        {isFetching && <h2>Contacts fetching</h2>}

        {/* display errors */}
        {isError && (
          <div className="mx-auto my-auto flex flex-col items-center text-red-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <h4 className="text-2xl font-medium text-red-400 mt-5">
              Something went wrong
            </h4>
          </div>
        )}

        {/* List Contacts */}
        {isSuccess && (
          <ul className="divide-y sm:divide-none divide-gray-200 sm:grid sm:grid-cols-3 md:grid-cols-4 sm:gap-x-5">
            {data?.map((contact) => (
              <li key={contact.id} className="flex min-w-0 gap-x-4 py-5">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={`https://source.unsplash.com/random/${contact.id}?person,avatar`}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {contact.name}
                    <button
                      onClick={(e) => openEditModal(contact)}
                      className="inline-flex w-full justify-center rounded-md text-gray-600 text-sm font-semibold hover:text-gray-500 sm:ml-3 sm:w-auto"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => handleOnDelete(contact.id)}
                      className="inline-flex w-full justify-center rounded-md text-red-600 text-sm font-semibold hover:text-red-500 sm:ml-3 sm:w-auto"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </p>
                  <span className="mt-0.5 truncate text-xs leading-5 text-gray-500 line-clamp-5">
                    <ContactDetail id={contact.id} />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Contact edit modal */}
        <UpdateContact
          open={showEditModal}
          setOpen={closeEditModal}
          contact={editingContact}
        />
      </main>
    </>
  );
}

export default App;
