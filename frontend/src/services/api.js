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

export const getContactById = async (id) => {
    try {
        const response = await axios.get(`${URL}/find/${id}`);
        return [200, response.data.contact];
    } catch (error) {
        return [400, error.response.data.error];
    }
}


export const addContact = async (data) => {
    try {
        const response = await axios.post(`${URL}/create`, data);
        return [200, response.data.contact];
    } catch (error) {
        return [400, error.response.data.error];
    }
};

export const editContact = async (id, data) => {
    try {
        const response = await axios.post(`${URL}/update/${id}`, data);
        return [200, response.data.contact];
    } catch (error) {
        return [400, error.response.data.error];
    }
}


export const checkIfExist = async (number) => {
    try {
        const response = await axios.get(`${URL}/check/${number}`);
        if(('data' in response) && (response.data.status === 200)){
            return [200, response.data.contact];
        }
        return [400, "Not Found"];
    } catch (error) {
        return [400, "Not Found"];
    }
}


export const deleteContactApi = async (id) => {
    try {
        const response = await axios.get(`${URL}/delete/${id}`);
        return [200, "Contact deleted successfully!"];
    } catch (error) {
        return [400, "Failed To Delete!"];
    }
};

export const searchByNumber = async (value) => {
    try {
        const response = await axios.get(`${URL}/search/${value}`);
        return [200, response.data.contacts];
    } catch (error) {
        console.log(error);
        return [400, "No Data Found"];
        
    }
};