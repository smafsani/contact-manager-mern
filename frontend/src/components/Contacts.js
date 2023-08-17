import React, { useEffect, useState } from 'react'
import { getContacts } from '../services/api';

export const Contacts = () => {
  const [contacts, setContacts] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getContacts();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>Contacts</div>
  )
}
