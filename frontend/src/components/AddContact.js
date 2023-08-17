import React, { useEffect, useState } from 'react'
import { Grid, Paper, FormGroup, TextField, Button, styled, Typography, useMediaQuery, InputAdornment, Alert, Menu, MenuItem } from '@mui/material'
import {
    Person, AlternateEmail as EmailIcon, Phone as PhoneIcon,
    Lock as LockIcon,
    LocationOn,
    Save,
    Send,
    Add,
    ArrowDropUp,
    ArrowDropDown
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

const StyledHeader = styled('h3')`
  border-bottom: 2px solid #fff;
  width: fit-content;
`;

const defaultContact = {
    name: '',
    email: '',
    phone: '',
    address: '',
}

export const AddContact = () => {
    const paperStyle = {
        padding: '2%', width: '100%', margin: 'auto',
        backgroundColor: '#0a0b0e'
    };
    const headerStyle = { color: "#fff", textAlign: 'left', marginBottom: '15px' };

    const [contact, setContact] = useState(defaultContact);
    const [error, setError] = useState({ status: 0, message: '' });
    const [success, setSuccess] = useState({ status: 0, message: '' });
    const [existingContact, setExistingContact] = useState([0, {}]);

    const loadTextField = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }

    const handleSubmitForm = async () => {
        setSuccess({ status: 0, message: '' });
        setError({ status: 0, message: '' });

        if (!contact.phone) {
            setError({ status: 1, message: 'You must provide a phone number.' });
        }
        try {
            const response = await addContact(contact);
            if (response[0] === 200) {
                setSuccess({ status: 1, message: "Contact added successfully!" });
                setContact(defaultContact);
            }
            else if (response[0] === 300) {
                setExistingContact([1, response[2]]);
                setError({ status: 1, message: response[1] });
            }
            else {
                setError({ status: 1, message: response[1] });
            }
        } catch (error) {
            setError({ status: 1, message: "Upps! Something Went Wrong." });
        }
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid container sx={{ width: '100%' }}>
                    {
                        !existingContact[0] ?
                            (<Grid item sx={{ width: '100%', display: "flex", justifyContent: 'center' }}>
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
                            </Grid>) :
                            (<Grid item sx={{ color: "#fff", width: '100%', display: "flex", justifyContent: 'center' }}>

                                <Grid container>
                                    <Grid item xs={12} sx={{ marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                                        {
                                            error.status === 1 &&
                                            <Alert severity='error' sx={{ width: 'fit-content', minWidth: '200px', fontSize: '12px' }}>{error.message}</Alert>
                                        }
                                    </Grid>

                                    <Grid item xs={12} sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                                        <StyledHeader>Contact Info</StyledHeader>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button variant='contained' sx={{ display: 'flex', justifyContent: 'space-between', minWidth: '150px', width: '300px' }}
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                        >
                                            <span>{('name' in existingContact[1]) ? existingContact[1].name : 'Unknown'}</span>
                                            <span>{open ? <ArrowDropUp /> : <ArrowDropDown />}</span>
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <Typography sx={{ textAlign: 'center', fontSize: '14px' }}>Name {('name' in existingContact[1]) && existingContact[1].name}</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                {
                                                    ('phone' in existingContact[1]) &&
                                                    <>
                                                        {existingContact[1].phone.map((phoneNumber, index) => (
                                                            <Typography sx={{ textAlign: 'center', fontSize: '14px' }}>Phone   {phoneNumber}</Typography>
                                                        ))}
                                                    </>
                                                }
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <Typography sx={{ textAlign: 'center', fontSize: '14px' }}>Email {('email' in existingContact[1]) && existingContact[1].email}</Typography>
                                            </MenuItem>

                                            <MenuItem onClick={handleClose}>
                                                <Typography sx={{ textAlign: 'center', fontSize: '14px' }}>Address {('address' in existingContact[1]) && existingContact[1].address}</Typography>
                                            </MenuItem>
                                        </Menu>
                                    </Grid>
                                    
                                </Grid>
                            </Grid>)
                    }
                </Grid>
            </Paper>
        </Grid>
    )
}