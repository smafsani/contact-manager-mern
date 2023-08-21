import React, { useEffect, useState } from 'react'
import { addToHistory, deleteContactApi, deleteHistoryApi, getContacts, getHistories, searchByNumber } from '../services/api';
import { Button, Card, FormGroup, FormControl, Grid, InputAdornment, Paper, Table, TableBody, TableCell, TableRow, TextField, Typography, styled, MenuItem, Select, InputLabel } from '@mui/material';
import { AccountCircle, Add, ArrowDropDown, ArrowDropUp, CalendarToday, Delete, Edit, HelpOutline, History, Person, Remove, Search, TypeSpecimenOutlined } from '@mui/icons-material';
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
    const [historyAddStatus, setHistoryAddStatus] = useState([0, '']);

    const [deleteHistory, setDeleteHistory] = useState([0, -1]);

    const [currentInfoIdx, setCurrentInfoIdx] = useState(-1);

    const [alertOpen, setAlertOpen] = useState(false);
    const handleAlertOpen = () => setAlertOpen(true);
    const handleAlertClose = () => setAlertOpen(false);

    // Modal
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

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
        try {
            const response = await addToHistory(data);

            if (response[0] === 200) {
                setHistoryAddStatus([1, 'Added to history!']); 
                setHistories(response[1]);
                setAddHistory(false);
                setTo('');
                setType('');
                setMessage('');
                setDate('');

            }
            else {
                setHistoryAddStatus([2, response[1]]);
            }
        } catch (error) {
            setHistoryAddStatus([2, 'Failed to add contact history!']);
        }
        setAlertOpen(true);
    }

    const handleContactInfoTab = (index) => {
        setCurrentInfoIdx((prevIndex) => {
            if (index === prevIndex) {
                return -1;
            }
            return index;
        });
    };

    const deleteHistoryById = async () => {
        setHistoryAddStatus([0, '']);
        setCurrentInfoIdx(-1);

        if (deleteHistory[0] === 1) {
            try {
                const response = await deleteHistoryApi(deleteHistory[1]);
                if (response[0] === 200) {
                    setHistoryAddStatus([1, "History deleted successfully!"]);
                }
                else {
                    setHistoryAddStatus([2, "Failed to delete!"]);
                }
                setAlertOpen(true);

            } catch (error) {
                setHistoryAddStatus([2, "Failed to delete!"]);
                setAlertOpen(true);
            }

            setModalOpen(false);
            fetchHistories();
        }
    };

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
                                        <History />
                                    </div>
                                    <div className="data">
                                        <div className="title" onClick={() => handleContactInfoTab(index)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}><span>{history.receiver.name}</span> {currentInfoIdx === index ? <ArrowDropUp /> : <ArrowDropDown />}</div>
                                        <span className="number">{history.date ? getDateAsLocale(history.date) : ''}</span>
                                        <div className={`info ${currentInfoIdx === index ? 'active' : ''}`} >
                                            <div className='first' style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.5)' }}>
                                                <span>Info</span>

                                                <Delete
                                                    sx={{ fontSize: '16px', cursor: 'pointer', color: '#fff', marginLeft: '5px', '&:hover': { color: "#f00" } }}
                                                    onClick={() => {
                                                        setDeleteHistory([1, history._id]);
                                                        setModalOpen(true);
                                                    }} />
                                            </div>
                                            <div style={{ marginTop: '5px' }}>
                                                <span>Contact: </span>
                                                <span>{history.receiver.name}</span>
                                            </div>
                                            <div>
                                                <span>Contact Type: </span>
                                                <span>{history.contactType}</span>
                                            </div>
                                            <div>
                                                <span>Message: </span>
                                                <span>{history.message ? history.message : "-"}</span>
                                            </div>
                                            <div className='last'>
                                                <span>Date: </span>
                                                <span>{history.date ? getDateAsLocale(history.date) : '-'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </StyledCard>
                            ))
                        }
                    </Grid>

                </StyledGrid >

                {
                    deleteHistory[0] === 1 &&
                    (<CustomModal open={modalOpen} handleClose={handleModalClose} >
                        <Grid container sx={{ alignItems: 'center' }}>

                            <Grid item xs={12} sx={{ height: 'fit-content', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '24px' }}>Delete History</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <HelpOutline sx={{ fontSize: '128px', color: '#F49859' }} />
                            </Grid>
                            <div style={{ textAlign: 'center', width: '100%', marginTop: '15px' }}>
                                <Typography sx={{ userSelect: 'none' }}>
                                    Do you really want to delete this history?
                                </Typography>
                                <Button variant='contained' sx={{ backgroundColor: '#999', marginRight: '5px' }} onClick={handleModalClose} >No</Button>
                                <Button variant='contained' sx={{ backgroundColor: 'crimson' }} onClick={deleteHistoryById} >Yes</Button>
                            </div>

                        </Grid>
                    </CustomModal>)
                }

            </Paper >
            <CustomizedSnackbars open={alertOpen} handleClose={handleAlertClose} type={historyAddStatus[0] === 1 ? "success" : "warning"} message={historyAddStatus[1]} />
        </Grid >
    )
}
