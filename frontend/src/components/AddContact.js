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
    ArrowRightAlt
} from '@mui/icons-material';
import { addContact, checkIfExist } from '../services/api';
import { CustomModal } from './Common/Modal';

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
    phone: '',
    address: '',
}
const paperStyle = {
    padding: '2%', width: '100%', margin: 'auto',
    backgroundColor: '#0a0b0e', minHeight: '70vh'
};
const headerStyle = { color: "#fff", textAlign: 'left', marginBottom: '15px' };


export const AddContact = () => {

    const [contact, setContact] = useState(defaultContact);
    const [error, setError] = useState({ status: 0, message: '' });
    const [success, setSuccess] = useState({ status: 0, message: '' });
    const [existingContact, setExistingContact] = useState([0, {}]);

    // Modal
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const loadTextField = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }

    const handleSubmitForm = async () => {
        setSuccess({ status: 0, message: '' });
        setError({ status: 0, message: '' });
        setExistingContact([0, {}]);

        if (!contact.phone) {
            setError({ status: 1, message: 'You must provide a phone number.' });
            return;
        }
        try {
            const isExist = await checkIfExist(contact.phone);
            if(isExist[0] === 200){
                setExistingContact([1, isExist[1]]);
                setError({ status: 1, message: "Phone number already added." });
                handleModalOpen();
            }
            else{
                addContactData();
            }
        } catch (error) {
            setError({ status: 1, message: "Upps! Something Went Wrong." });
        }
    };
    const addContactData = async () => {
        setSuccess({ status: 0, message: '' });
        setError({ status: 0, message: '' });
        setExistingContact([0, {}]);
        try {
            const response = await addContact(contact);
            if (response[0] === 200) {
                setSuccess({ status: 1, message: "Contact added successfully!" });
                setContact(defaultContact);
            }
            else {
                setError({ status: 1, message: response[1] });
            }
        } catch (error) {
            setError({ status: 1, message: "Upps! Something Went Wrong." });
        }
    };

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
                        <Grid item sx={{ width: '100%', display: "flex", justifyContent: 'center' }}>
                            <FormGroup sx={{ minWidth: '200px', width: '100%', maxWidth: '400px' }}>
                                <h4 style={headerStyle}>ADD CONTACT</h4>

                                {
                                    error.status === 1 &&
                                    <Alert severity={existingContact[0] ? 'warning' : 'error'} sx={{ fontSize: '12px' }}>{error.message} {existingContact[0] && <Button sx={{ textTransform: 'none',fontSize: '12px', textDecoration: 'underline' }} onClick={handleModalOpen} >View</Button>}</Alert>
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
                    }
                    {
                        existingContact[0] &&
                        <CustomModal open={modalOpen} handleClose={handleModalClose} >
                            <Grid container sx={{ alignItems: 'center' }}>
                                <Grid item xs={12} sx={{ marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                                    {
                                        error.status === 1 &&
                                        <Alert severity={existingContact[0] ? 'warning' : 'error'} sx={{ width: 'fit-content', minWidth: '200px', fontSize: '12px', height: 'fit-content' }}>{error.message}</Alert>
                                    }
                                </Grid>

                                <Grid item xs={12} sx={{ height: 'fit-content', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                                    <StyledHeader>Contact Info</StyledHeader>
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button variant='contained' sx={{ height: 'fit-content', display: 'flex', justifyContent: 'space-between', minWidth: '150px', width: '300px' }}
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <span>{('name' in existingContact[1]) ? existingContact[1].name : 'Unknown'}</span>
                                        <span>{open ? <ArrowDropUp /> : <ArrowDropDown />}</span>
                                    </Button>
                                    <StyledMenu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        {
                                            ('phone' in existingContact[1]) &&
                                            existingContact[1].phone.map((phoneNumber, index) => (
                                                <MenuItem onClick={handleClose} key={index} className={contact.phone === phoneNumber ? 'phoneMatched' : ''}>
                                                    <Card sx={{ paddingX: '10px', width: '100%' }}>
                                                        <Typography sx={{ fontSize: '14px' }}>Phone</Typography>
                                                        <Typography sx={{ fontSize: '14px' }}>{phoneNumber}</Typography>
                                                    </Card>
                                                </MenuItem>
                                            ))

                                        }
                                        <MenuItem onClick={handleClose}>
                                            <Card sx={{ paddingX: '10px', width: '100%' }}>
                                                <Typography sx={{ fontSize: '14px' }}>Email</Typography>
                                                <Typography sx={{ fontSize: '14px' }}>{('email' in existingContact[1]) && existingContact[1].email ? existingContact[1].email : '--'}</Typography>
                                            </Card>
                                        </MenuItem>

                                        <MenuItem onClick={handleClose}>
                                            <Card sx={{ paddingX: '10px', width: '100%' }}>
                                                <Typography sx={{ fontSize: '14px' }}>Address</Typography>
                                                <Typography sx={{ fontSize: '14px' }}>{('address' in existingContact[1]) && existingContact[1].address ? existingContact[1].address : '--'}</Typography>
                                            </Card>
                                        </MenuItem>
                                    </StyledMenu>
                                </Grid>
                                <div style={{ textAlign: 'center', width: '100%', marginTop: '15px' }}>
                                    <Typography>
                                        Do you really want to add this number?
                                    </Typography>
                                    <Button variant='contained' sx={{ backgroundColor: '#999', marginRight: '5px' }} onClick={handleModalClose} >No</Button>
                                    <Button variant='contained' sx={{ backgroundColor: 'crimson' }} onClick={addContactData} >Yes</Button>
                                </div>

                            </Grid>
                        </CustomModal>
                    }
                </Grid>
            </Paper>
        </Grid>
    )
}