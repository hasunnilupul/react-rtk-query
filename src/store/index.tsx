import {configureStore} from '@reduxjs/toolkit';

import { contactsFirestore } from '../services/contactFirstore';

export const store = configureStore({
    reducer: {
        [contactsFirestore.reducerPath]: contactsFirestore.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(contactsFirestore.middleware)
});