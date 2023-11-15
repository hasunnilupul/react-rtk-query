import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase-init";
import {
  Contact,
  CreateContact,
  contactConverter,
} from "../models/contact.model";

export const contactsFirestore = createApi({
  reducerPath: "contactsFirestore",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    contacts: builder.query<Contact[], void>({
      queryFn: async () => {
        try {
          const contactsRef = collection(db, "contacts");
          const querySnapshot = await getDocs(contactsRef);
          let contacts: any[] = [];
          querySnapshot.forEach((contact) =>
            contacts.push({ id: contact.id, ...contact.data() })
          );
          return { data: contacts };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["Contact"],
    }),
    contact: builder.query<any, string>({
      queryFn: async (id) => {
        try {
          const contactRef = doc(db, "contacts", id).withConverter(
            contactConverter
          );
          const querySnapshot = await getDoc(contactRef);
          const contact = querySnapshot.data();
          return { data: contact };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["Contact"],
    }),
    createContact: builder.mutation<string, CreateContact>({
      queryFn: async (contact) => {
        try {
          await addDoc(collection(db, "contacts"), contact);
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Contact"],
    }),
    updateContact: builder.mutation<string, Contact>({
      queryFn: async ({id, ...rest}) => {
        try {
          await updateDoc(doc(db, "contacts", id), rest);
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Contact"],
    }),
    deleteContact: builder.mutation<string, string>({
      queryFn: async (id) => {
        try {
          await deleteDoc(doc(db, "contacts", id));
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useContactsQuery,
  useContactQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactsFirestore;
