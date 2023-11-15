import { DocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export interface Contact {
  id: string;
  name: string;
  email: string;
}

export interface CreateContact {
  name: string;
  email: string;
}

// Firestore data converter
export const contactConverter = {
  toFirestore: (contact: Contact) => {
    return {
      name: contact.name,
      state: contact.email
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return { id: snapshot.id, ...data };
  }
};