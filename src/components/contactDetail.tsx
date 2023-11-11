import React from 'react'
import { useContactQuery } from '../services/contactApi';

type ContactDetailProps = {
    id: string;
}

const ContactDetail = ({ id }: ContactDetailProps) => {
    const { data } = useContactQuery(id);

    return (
        <pre>
            {JSON.stringify(data, undefined, 2)}
        </pre>
    )
}

export default ContactDetail;