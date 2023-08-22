import React, { useEffect, useState } from 'react'
import { deleteContactApi, getContacts, getMostUsedContacts, getRecentContacts, getRecentHistories, searchByNumber } from '../services/api';
import { Button, Card, FormGroup, Grid, InputAdornment, Paper, Table, TableBody, TableCell, TableRow, TextField, Typography, styled } from '@mui/material';
import { AccountCircle, ArrowDropDown, ArrowDropUp, Delete, Edit, HelpOutline, History, Search } from '@mui/icons-material';
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
  & {
    border-radius: 3px;
    z-index: 1;
    color: #2196f3;background-color: rgba(255,255,255,0.1);
  }
  & input {
    padding: 7px 10px;
    font-size: 13px;
    color: #fff;
    border-radius: 10px;
  }
  
`;

export const Home = () => {
    const paperStyle = {
        padding: '2%', width: '100%', margin: 'auto', display: 'flex',
        backgroundColor: '#0a0b0e', minHeight: '80vh', justifyContent: 'center',
    };
    const headerStyle = { color: "#fff", textAlign: 'left', textTransform: 'uppercase' };

    const [contacts, setContacts] = useState({});

    // Modal
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const [recentAddedContact, setRecentAddedContact] = useState([]);
    const [recentHistories, setRecentHistories] = useState([]);
    const [mostUsedContacts, setMostUsedContacts] = useState([]);


    const recentContact = async () => {
        try {
            const response = await getRecentContacts();
            if (response[0] === 200) {
                setRecentAddedContact(response[1]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const mostUsedContact = async () => {
        try {
            const response = await getMostUsedContacts();
            if (response[0] === 200) {
                setMostUsedContacts(response[1]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const recentHistory = async () => {
        try {
            const response = await getRecentHistories();
            if (response[0] === 200) {
                setRecentHistories(response[1]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        recentContact();
        mostUsedContact();
        recentHistory();
    }, []);



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
                    <Grid item sx={{ width: '100%', height: '15%', display: "flex", alignItems: 'center', flexDirection: 'column' }}>
                        <h4 style={headerStyle}>Contact Manager</h4>
                    </Grid>
                    <Grid item sx={{ padding: '0 10px', width: '100%', height: '80%', display: "flex", flexDirection: 'column', justifyContent: 'flex-start', marginTop: '0px' }}>
                        <div style={{ width: '100%' }}>
                            <Typography sx={{ marginBottom: '10px' ,color: "#fff", textAlign: 'left', fontSize: '18px', fontWeight: 'bold', borderBottom: '1px solid #fff' }}>
                                Recent Contacts
                            </Typography>
                            <div style={{ padding: '0 10px', width: '100%' }}>
                                {recentAddedContact.length > 0 &&
                                    recentAddedContact.map((contact, index) => (
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
                            </div>
                        </div>

                        <div style={{ width: '100%', marginTop: '30px' }}>
                            <Typography sx={{ marginBottom: '10px' ,color: "#fff", textAlign: 'left', fontSize: '18px', fontWeight: 'bold', borderBottom: '1px solid #fff' }}>
                                Recent Histories
                            </Typography>
                            <div style={{ padding: '0 10px', width: '100%' }}>
                            {recentHistories.length > 0 &&
                                recentHistories.map((history, index) => (
                                <StyledCard key={index} sx={{ overflow: 'inherit' }}>
                                    <div className="icon">
                                        <History />
                                    </div>
                                    <div className="data">
                                        <div className="title" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}><span>{history.receiver.name}</span></div>
                                        <span className="number">{history.date ? getDateAsLocale(history.date) : ''}</span>
                                        
                                    </div>
                                </StyledCard>
                            ))
                        }
                            </div>
                        </div>

                        <div style={{ width: '100%', marginTop: '30px' }}>
                            <Typography sx={{ marginBottom: '10px' ,color: "#fff", textAlign: 'left', fontSize: '18px', fontWeight: 'bold', borderBottom: '1px solid #fff' }}>
                                Most Used Contacts
                            </Typography>
                            <div style={{ padding: '0 10px', width: '100%', marginBottom: '30px' }}>
                                {mostUsedContacts.length > 0 &&
                                    mostUsedContacts.map((contact, index) => (
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
                            </div>
                        </div>
                    </Grid>

                </StyledGrid>

            </Paper>
        </Grid>
    )
}
