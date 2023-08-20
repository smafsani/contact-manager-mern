import React, { useEffect, useState } from 'react'
import { addToHistory, deleteContactApi, getContacts, getHistories, searchByNumber } from '../services/api';
import { Button, Card, FormGroup, FormControl, Grid, InputAdornment, Paper, Table, TableBody, TableCell, TableRow, TextField, Typography, styled, MenuItem, Select, InputLabel } from '@mui/material';
import { AccountCircle, Add, ArrowDropDown, ArrowDropUp, CalendarToday, Delete, Edit, HelpOutline, Person, Remove, Search, TypeSpecimenOutlined } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { CustomModal } from './Common/Modal';
import CustomizedSnackbars from './Common/ShortAlert';
import { getDateAsLocale } from '../services/utils';


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
    const [histories, setHistories] = useState({});
    const [to, setTo] = useState('');
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');
    const [date, setDate] = useState('');
    const [addHistory, setAddHistory] = useState(false);

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
    const fetchHistories = async () => {
        try {
            const response = await getHistories();
            if (response[0] === 200) {
                setHistories(response[1]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchHistories();
    }, []);

    const submitHandler = async () => {
        const data = { to, type, date, message }; 
        const response = await addToHistory(data);
        
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <StyledGrid container sx={{ overflowY: 'auto' }}>
                    <Grid item sx={{ width: '100%', height: '10%', display: "flex", alignItems: 'center', flexDirection: 'column' }}>
                        <h4 style={headerStyle}>History</h4>
                    </Grid>
                    <Grid item sx={{ width: '100%', height: '85%', display: "flex", flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                            <span>
                                {
                                    !addHistory ?
                                        (<Add sx={{ color: "#000", backgroundColor: "#fff", fontSize: '18px', cursor: 'pointer' }} onClick={() => setAddHistory(true)} />) :
                                        (<Remove sx={{ color: "#000", backgroundColor: "#fff", fontSize: '18px', cursor: 'pointer' }} onClick={() => setAddHistory(false)} />)
                                }
                            </span>
                        </div>{
                            addHistory &&
                            (<StyledCard sx={{ flexDirection: 'column', overflow: 'visible' }}>
                                <Typography sx={{ width: '100%', marginBottom: '10px', fontSize: '16px', fontWeight: 'bold', padding: '5px 10px', color: "#1976d2" }}>
                                    Add To History
                                </Typography>
                                <FormControl sx={{ width: '100%' }}>
                                    <InputLabel id="demo-simple-select-label" sx={{ color: "#fff", fontSize: '14px', "&.MuiInputLabel-shrink": { color: "#1976d2" } }}>Select Contact</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={to}
                                        label="Select Contact"
                                        sx={{
                                            width: '100%', color: "#fff",
                                            "& svg": { color: "#fff" },
                                            "& .MuiSelect-select": { fontSize: '14px' }
                                        }}
                                        onChange={(e) => setTo(e.target.value)}
                                    >
                                        {
                                            contacts.map((value, index) => {
                                                
                                            })
                                        }
                                        {contacts.length > 0 &&
                                            contacts.map((contact, index) => (
                                                <MenuItem key={index} value={contact._id}>{contact.name}</MenuItem>
                                            ))
                                        }

                                    </Select>
                                </FormControl>
                                <FormControl sx={{ width: '100%', marginTop: "10px" }}>
                                    <InputLabel id="demo-simple-select-label" sx={{ color: "#fff", fontSize: '14px', "&.MuiInputLabel-shrink": { color: "#1976d2" } }}>Select Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={type}
                                        label="Select Type"
                                        sx={{
                                            width: '100%', color: "#fff",
                                            "& svg": { color: "#fff" },
                                            "& .MuiSelect-select": { fontSize: '14px' }
                                        }}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <MenuItem value="Call">Call</MenuItem>
                                        <MenuItem value="Message">Message</MenuItem>
                                    </Select>
                                </FormControl>
                                {
                                    type === 'Message' &&
                                    (<FormControl sx={{ width: '100%', marginTop: "10px" }}>
                                        <StyledTextField label="Enter Message" value={message} onChange={(e) => setMessage(e.target.value)}
                                            sx={{
                                                width: '100%', color: "#fff",
                                                "& input": { width: '100%', color: "#fff", fontSize: "14px" },
                                                "& label": { color: "#fff", fontSize: '14px' },
                                                "& label.MuiInputLabel-shrink": { color: "#1976d2" }
                                            }}>
                                        </StyledTextField>
                                    </FormControl>)
                                }
                                <FormControl sx={{ width: '100%', marginTop: "10px" }}>
                                    <StyledTextField type="datetime-local" label="Enter Date" value={date} onChange={(e) => setDate(e.target.value)}
                                        sx={{
                                            width: '100%', color: "#fff",
                                            "& input": { width: '100%', color: "#fff", fontSize: "14px" },
                                            "& label": { color: "rgba(0, 0, 0 ,0)", fontSize: '14px' },
                                            "& label.MuiInputLabel-shrink": { color: "#1976d2" }
                                        }}>
                                    </StyledTextField>
                                </FormControl>
                                <FormControl>
                                    <Button onClick={submitHandler} variant='contained' sx={{ marginTop: '10px', textTransform: 'none', padding: '2px 15px' }}><Add sx={{ fontSize: '16px' }} /> Add To History</Button>
                                </FormControl>
                            </StyledCard>)
                        }
                        {histories.length > 0 &&
                            histories.map((history, index) => (
                                <StyledCard key={index} sx={{ overflow: 'inherit' }}>
                                    <div className="icon">
                                        <AccountCircle />
                                    </div>
                                    <div className="data">
                                        <div className="title" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>{history.receiver.name}</div>
                                        <span className="number">{getDateAsLocale(history.date)}</span>
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
