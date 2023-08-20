import React, { useEffect, useState } from 'react'
import { Grid, Paper, FormGroup, TextField, Button, styled, Typography, useMediaQuery, InputAdornment, Alert, Menu, MenuItem, Card } from '@mui/material'
import {
    Person, AlternateEmail as EmailIcon, Phone as PhoneIcon,
    Lock as LockIcon,
    LocationOn,
    Save,
    Send,
    Add,
    ArrowDropUp,
    ArrowDropDown,
    ArrowRightAlt,
    Remove
} from '@mui/icons-material';
import { addContact, editContact, getContactById } from '../services/api';
import { useParams } from 'react-router-dom';

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

const StyledMenu = styled(Menu)({
    "& > .MuiPaper-root": {
        // backgroundColor: '#0a0b0e',
        // color: '#fff',
        minWidth: '150px',
        width: '300px',
        maxHeight: '200px',
    },
    "& .MuiPaper-root li": {
        border: '1px solid #fff',
    },
    "& .MuiPaper-root li p": {
        fontWeight: 'bold',
    }
});


const defaultContact = {
    name: '',
    email: '',
    phone: [],
    address: '',
}
const paperStyle = {
    padding: '2%', width: '100%', margin: 'auto',
    backgroundColor: '#0a0b0e', minHeight: '70vh'
};
const headerStyle = { color: "#fff", textAlign: 'left', marginBottom: '15px' };


export const EditContact = () => {

    const [contact, setContact] = useState(defaultContact);
    const [error, setError] = useState({ status: 0, message: '' });
    const [success, setSuccess] = useState({ status: 0, message: '' });
    const [existingContact, setExistingContact] = useState([0, {}]);
    const queryParams = useParams();
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        const {id} = queryParams;
        const fetchData = async (id) => {
            try {
                const response = await getContactById(id);
                if (response[0] === 200) {
                    const {name, email, phone, address} = response[1];
                    setContact({name:(name || ''), email: (email || ''), phone: (phone || []), address: (address || '')});
                }
            } catch (error) {
                setContact(defaultContact);                
            } finally {
                setIsLoading(false); // Data fetched, set loading to false
            }
        }

        fetchData(id);

    }, []);

    const loadTextField = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }

    const loadNumberField = (e, idx) => {
        const updatedPhoneNumbers = [...contact.phone];
        updatedPhoneNumbers[idx] = e.target.value;
        setContact(prevContact => ({...prevContact, phone : updatedPhoneNumbers}));
    }

    const handleNumberFields = (action, idx=-1) => {
        let updatedPhoneNumbers = contact.phone;
        if(action === 'remove' && idx !== -1){
            updatedPhoneNumbers = updatedPhoneNumbers.filter((value, index) => {
                return index !== idx;
            })
        }
        else{
            updatedPhoneNumbers.push('');
        }
        setContact({...contact, phone: updatedPhoneNumbers});
    }

    const handleSubmitForm = async () => {
        setSuccess({ status: 0, message: '' });
        setError({ status: 0, message: '' });

        if (contact.phone.length === 0) {
            setError({ status: 1, message: 'You must provide a phone number.' });
            return;
        }
        let hasNumber = 0;
        contact.phone.forEach(element => {
            if(element.length > 0){hasNumber = 1; return;}
        });
        if (hasNumber === 0) {
            setError({ status: 1, message: 'You must provide a phone number.' });
            return;
        }

        try {
            const {id} = queryParams;
            
            const response = await editContact(id, contact);
            // console.log(response);
            if (response[0] === 200) {
                setSuccess({ status: 1, message: "Contact updated successfully!" });
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

    const handleBackButton = () => {
        setExistingContact([0, '']);
        setContact(defaultContact);
        setError({ status: 0, message: '' });
    };

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid container sx={{ width: '100%' }}>
                    {
                        !isLoading && 
                        (<Grid item sx={{ width: '100%', display: "flex", justifyContent: 'center' }}>
                                <FormGroup sx={{ minWidth: '200px', width: '100%', maxWidth: '400px' }}>
                                    <h4 style={headerStyle}>ADD CONTACT</h4>

                                    {
                                        error.status === 1 &&
                                        <Alert severity='error' sx={{ fontSize: '12px' }}>{error.message}</Alert>
                                    }
                                    {
                                        success.status === 1 &&
                                        <Alert severity='success' sx={{ fontSize: '12px' }}>{success.message}</Alert>
                                    }

                                    <StyledTextField label="Name" value={contact.name} name='name' margin="normal" onChange={loadTextField}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Person sx={{ fontSize: '18px', color: '#fff' }} />
                                                </InputAdornment>
                                            ),
                                        }} />
                                    {
                                        contact.phone.length > 0 &&
                                        contact.phone.map((phoneNum, idx) => 
                                        (<StyledTextField key={idx} label="Phone" value={phoneNum} name='phone' margin="normal" onChange={(e) => loadNumberField(e, idx)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PhoneIcon sx={{ fontSize: '18px', color: '#fff' }} />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <Remove onClick={() => handleNumberFields('remove', idx)} sx={{ 
                                                            fontSize: '18px', color: '#fff', cursor: 'pointer',
                                                            backgroundColor: 'rgba(255, 0, 0, 1)', borderRadius: '50%' }} />
                                                    </InputAdornment>
                                                ),
                                            }} />))
                                    }
                                    <Button sx={{ textTransform: 'none', fontSize: '14px' }} onClick={() => handleNumberFields('add')} ><Add sx={{ fontSize: 'inherit' }} /> Add new phone</Button>
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
                                        Update Contact
                                    </Button>
                                </FormGroup>
                        </Grid>)
                    }
                </Grid>
            </Paper>
        </Grid>
    )
}