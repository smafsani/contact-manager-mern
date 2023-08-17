import axios from 'axios';

const URL = 'http://127.0.0.1:5005/contact';
export const getContacts = async () => {
    try {
        const response = await axios.get(`${URL}`);
        return [200, response.data.contacts];
    } catch (error) {
        return [400, error.response.data.error];
    }
};


export const addContact = async (data) => {
    try {
        const response = await axios.post(`${URL}/create`, data);
        return [200, response.data.contact];
    } catch (error) {
        return [400, error.response.data.error];
    }
};