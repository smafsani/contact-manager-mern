import React, { useEffect, useState } from 'react'
import { deleteContactApi, getContacts, searchByNumber } from '../services/api';
import { Button, Card, FormGroup, FormControl, Grid, InputAdornment, Paper, Table, TableBody, TableCell, TableRow, TextField, Typography, styled, MenuItem, Select, InputLabel } from '@mui/material';
import { AccountCircle, Add, ArrowDropDown, ArrowDropUp, Delete, Edit, HelpOutline, Person, Search } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { CustomModal } from './Common/Modal';
import CustomizedSnackbars from './Common/ShortAlert';

const StyledCard = styled(Card)`
  & {
    background-color: transparent; 
    color: #fff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    width: 100%;  
    padding: 5px 0; 
    height: fit-content !important;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  & .icon{
    font-size: 28px;
    color: #aaa;
    width: 30px;
    height: 100%;
  }
  & .data{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 7px;
    position: relative;
    width: calc(100% - 35px);
    z-index: 1;
  }

  & .data .info{
    max-height: 0;
    overflow: hidden;
    transition: all 0s ease;
  }
  
  & .data .info.active {
    max-height: 1000px;
    transition: all 0.3s ease;
  }

  & .data .info div{
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  }
  & .data .info .first{
    margin-top: 10px;
  }
  & .data .info .last{
    margin-bottom: 10px;
  }

  & .title{
    font-size: 14px !important;
    font-weight: bold;
  }
  & .number{
    font-size: 12px !important;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const StyledGrid = styled(Grid)`
  min-width: 250px !important;
  width: 380px !important;
  background: transparent;
  border-radius: 6px;
  height: 70vh !important;
  box-shadow: inset 0 0 6px 0 #000;
  padding: 20px 10px 10px 10px !important;
`;

const StyledTextField = styled(TextField)`
 
  
`;

export const Histories = () => {
    const paperStyle = {
        padding: '2%', width: '100%', margin: 'auto', display: 'flex',
        backgroundColor: '#0a0b0e', minHeight: '80vh', justifyContent: 'center',
    };
    const headerStyle = { color: "#fff", textAlign: 'left', textTransform: 'uppercase' };

    const [contacts, setContacts] = useState({});
    const [to, setTo] = useState('');
    const [type, setType] = useState('');

    const fetchData = async () => {
        try {
            const response = await getContacts();
            if (response[0] === 200) {
                setContacts(response[1]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <StyledGrid container sx={{ overflowY: 'auto' }}>
                    <Grid item sx={{ width: '100%', height: '10%', display: "flex", alignItems: 'center', flexDirection: 'column' }}>
                        <h4 style={headerStyle}>History</h4>
                    </Grid>
                    <Grid item sx={{ width: '100%', height: '85%', display: "flex", flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                            <span><Add sx={{ color: "#000", backgroundColor: "#fff", fontSize: '18px', cursor: 'pointer' }} /> </span>
                        </div>
                        <StyledCard>
                            <FormGroup sx={{ width: '100%' }} >
                                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', padding: '5px 10px', color: "#1976d2" }}>
                                    Add History
                                </Typography>
                                <FormControl sx={{ width: '100%' }}>
                                    <InputLabel id="demo-simple-select-label" sx={{ color: "#fff" }}>Contact</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={to}
                                        label="Contact"
                                        sx={{ width: '100%', color: "#fff", "& svg": {color: "#fff"} }} // Set the width to 100%
                                        onChange={(e) => setTo(e.target.value)} 
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                <InputLabel id="demo-simple-select-label" sx={{ color: "#fff" }}>Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={type}
                                        label="Type"
                                        sx={{ width: '100%', color: "#fff", "& svg": {color: "#fff"} }} // Set the width to 100%
                                        onChange={(e) => setType(e.target.value)} 
                                    >
                                        <MenuItem value="Call">Call</MenuItem>
                                        <MenuItem value="Message">Message</MenuItem>
                                    </Select>
                                </FormControl>
                            </FormGroup>
                        </StyledCard>
                        {contacts.length > 0 &&
                            contacts.map((contact, index) => (
                                <StyledCard key={index} sx={{ overflow: 'inherit' }}>
                                    <div className="icon">
                                        <AccountCircle />
                                    </div>
                                    <div className="data">
                                        <div className="title" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>{contact.name}</div>
                                        <span className="number">{contact.phone[0]}</span>
                                    </div>
                                </StyledCard>
                            ))
                        }
                    </Grid>

                </StyledGrid >
            </Paper >
        </Grid >
    )
}
