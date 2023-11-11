import React from 'react';

import { useContactsQuery } from './services/contactApi';
import NavBar from './layout/NavBar';
import ContactDetail from './components/contactDetail';

function App() {
  const { data, error, isLoading, isFetching, isSuccess } = useContactsQuery();

  return (
    <>
      <NavBar />
      <main className='relative flex-grow flex flex-col justify-between items-center'>
        {/* Contacts loading state */}
        {isLoading && (<svg className="mx-auto my-auto animate-spin h-16 w-16 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>)}

        {/* Contacts fetching state */}
        {isFetching && (<h2>Contacts fetching</h2>)}

        {/* display errors */}
        {error && (
          <div className="mx-auto my-auto flex flex-col items-center text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <h4 className="text-2xl font-medium text-red-400 mt-5">Something went wrong</h4>
          </div>
        )}

        {/* List Contacts */}
        {isSuccess && (
          <ul role="list" className="divide-y sm:divide-none divide-gray-200 sm:grid sm:grid-cols-3 md:grid-cols-4 sm:gap-x-5">
            {data?.map((contact) => (
              <li key={contact.email} className="flex min-w-0 gap-x-4 py-5">
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={`https://source.unsplash.com/random/${contact.id}?person,avatar`} alt="" />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{contact.name}</p>
                  <span className="mt-0.5 truncate text-xs leading-5 text-gray-500">
                    <ContactDetail id={contact.id}/>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}

export default App;
