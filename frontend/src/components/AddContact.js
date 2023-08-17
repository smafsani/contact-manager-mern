import React, { useEffect, useState } from 'react'
import { Grid, Paper, FormGroup, TextField, Button, styled, Typography, useMediaQuery, InputAdornment, Alert } from '@mui/material'
import {
    Person, AlternateEmail as EmailIcon, Phone as PhoneIcon,
    Lock as LockIcon,
    LocationOn,
    Save,
    Send,
    Add
} from '@mui/icons-material';
import { addContact } from '../services/api';

const StyledTextField = styled(TextField)`
  & {
    border: 0.15rem solid #2196f3;
    border-radius: 3px;
    z-index: 1;
    color: #2196f3;
  }
  & input{
    font-size: 14px;
    background-color: #0a0b0e;
    padding-left: 10px;
    color: #fff;
  }
  & fieldset{
    border: none;
  }
  & label{
    background-color: #0a0b0e;
    z-index: 100;
    padding: 0 10px 0 5px;
    color: #2196f3 !important;
  }
  & input:-internal-autofill-selected{
    background-color: #f00 !important;
    appearance: none;
  }
`;

const defaultContact = {
    name: '',
    email: '',
    phone: '',
    address: '',
}

export const AddContact = () => {
    const paperStyle = {
        padding: '2% 4%', width: '100%', margin: 'auto',
        backgroundColor: '#0a0b0e'
    };
    const headerStyle = { color: "#fff", textAlign: 'left', marginBottom: '15px' };

    const [contact, setContact] = useState(defaultContact);
    const [error, setError] = useState({ status: 0, message: '' });
    const [success, setSuccess] = useState({ status: 0, message: '' });

    const loadTextField = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }

    const handleSubmitForm = async () => {
        setSuccess({ status: 0, message: '' });
        setError({ status: 0, message: '' });

        if(!contact.phone){
            setError({ status: 1, message: 'You must provide a phone number.' });
        }
        const response = await addContact(contact);
        if (response[0] === 200) {
            setSuccess({ status: 1, message: "Contact added successfully!" });
            setContact(defaultContact);
        }
        else {
            setError({ status: 1, message: response[1] });
        }
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid container sx={{ width: '100%' }}>
                    <Grid item sx={{ width: '100%', display: "flex", justifyContent: 'center' }}>
                        <FormGroup sx={{ minWidth: '200px', width: '100%', maxWidth: '400px' }}>
                            <h4 style={headerStyle}>ADD CONTACT</h4>

                            {
                                error.status === 1 &&
                                <Alert severity='error'>{error.message}</Alert>
                            }
                            {
                                success.status === 1 &&
                                <Alert severity='success'>{success.message}</Alert>
                            }

                            <StyledTextField label="Name" value={contact.name} name='name' margin="normal" onChange={loadTextField}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person sx={{ fontSize: '18px', color: '#fff' }} />
                                        </InputAdornment>
                                    ),
                                }} />
                            <StyledTextField label="Phone" value={contact.phone} name='phone' margin="normal" onChange={loadTextField}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon sx={{ fontSize: '18px', color: '#fff' }} />
                                        </InputAdornment>
                                    ),
                                }} />
                            <StyledTextField label="Email" value={contact.email} name='email' margin="normal" onChange={loadTextField}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon sx={{ fontSize: '18px', color: '#fff' }} />
                                        </InputAdornment>
                                    ),
                                }} />
                            <StyledTextField label="Address" value={contact.address} name='address' margin="normal" onChange={loadTextField}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOn sx={{ fontSize: '18px', color: '#fff' }} />
                                        </InputAdornment>
                                    ),
                                }} />
                            <Button variant='contained' sx={{ marginTop: '5px', width: '100%' }} onClick={handleSubmitForm}>
                                <Add sx={{ fontSize: '18px', marginRight: '5px' }} /> Add To Contact
                            </Button>
                        </FormGroup>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}