import React, { useEffect, useState } from 'react'
import { deleteContactApi, getContacts, searchByNumber } from '../services/api';
import { Button, Card, FormGroup, Grid, InputAdornment, Paper, Table, TableBody, TableCell, TableRow, TextField, Typography, styled } from '@mui/material';
import { AccountCircle, ArrowDropDown, ArrowDropUp, Delete, Edit, HelpOutline, Search } from '@mui/icons-material';
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

export const Contacts = () => {
  const paperStyle = {
    padding: '2%', width: '100%', margin: 'auto', display: 'flex',
    backgroundColor: '#0a0b0e', minHeight: '80vh', justifyContent: 'center',
  };
  const headerStyle = { color: "#fff", textAlign: 'left', textTransform: 'uppercase' };

  const [contacts, setContacts] = useState({});
  const [search, setSearch] = useState('');

  const [currentInfoIdx, setCurrentInfoIdx] = useState(-1);

  const [deleteContact, setDeleteContact] = useState([0, -1]);
  const [deleteStatus, setDeleteStatus] = useState([0, '']);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // Short Alert Message
  const [alertOpen, setAlertOpen] = useState(false);
  const handleAlertOpen = () => setAlertOpen(true);
  const handleAlertClose = () => setAlertOpen(false);

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

  const handleContactInfoTab = (index) => {
    setCurrentInfoIdx((prevIndex) => {
      if (index === prevIndex) {
        return -1;
      }
      return index;
    });
  };

  const deleteContactById = async () => {
    setDeleteStatus([0, '']);

    if (deleteContact[0] === 1) {
      try {
        const response = await deleteContactApi(deleteContact[1]);
        if (response[0] === 200) {
          setDeleteStatus([1, "Contact deleted successfully!"]);
        }
        else {
          setDeleteStatus([2, "Failed to delete!"]);
        }
        setAlertOpen(true);

      } catch (error) {
        setDeleteStatus([2, "Failed to delete!"]);
        setAlertOpen(true);
      }

      setModalOpen(false);
      fetchData();
    }
  };

  const searchNumber = (e) => {
    setSearch(e.target.value);
  }
  useEffect(() => {
    (async () => {
      if(search.length > 0){
        const response = await searchByNumber(search);
        if (response[0] === 200) {
          setContacts(response[1]);
        }
      }
      else{
        const response = await getContacts();
        if (response[0] === 200) {
          setContacts(response[1]);
        }
      }
    })();
  }, [search]);

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <StyledGrid container sx={{ overflowY: 'auto' }}>
          <Grid item sx={{ width: '100%', height: '15%', display: "flex", alignItems: 'center', flexDirection: 'column' }}>
            <h4 style={headerStyle}>Contacts</h4>
            <StyledTextField value={search} name='search' margin="normal" onChange={searchNumber}
  
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search sx={{ fontSize: '18px', color: '#fff' }} />
                  </InputAdornment>
                ),
              }} />
          </Grid>
          <Grid item sx={{ width: '100%', height: '80%', display: "flex", flexDirection: 'column', justifyContent: 'flex-start', marginTop: '20px'}}>
            {contacts.length > 0 &&
              contacts.map((contact, index) => (
                <StyledCard key={index} sx={{ overflow: 'inherit' }}>
                  <div className="icon">
                    <AccountCircle />
                  </div>
                  <div className="data">
                    <div className="title" onClick={() => handleContactInfoTab(index)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>{contact.name} {currentInfoIdx === index ? <ArrowDropUp /> : <ArrowDropDown />}</div>
                    <span className="number">{contact.phone[0]}</span>
                    <div className={`info ${currentInfoIdx === index ? 'active' : ''}`} >
                      <div className='first' style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.5)' }}>
                        <span>Info</span>
                        <span>
                          <NavLink to={`/edit-contact/${contact._id}`}><Edit sx={{ fontSize: '16px', cursor: 'pointer', color: '#fff', '&:hover': { color: "#1976d2" } }} /></NavLink>
                          <Delete
                            sx={{ fontSize: '16px', cursor: 'pointer', color: '#fff', marginLeft: '5px', '&:hover': { color: "#f00" } }}
                            onClick={() => {
                              setDeleteContact([1, contact._id]);
                              setModalOpen(true);
                            }} />
                        </span>
                      </div>
                      <div style={{ marginTop: '5px' }}>
                        <span>Name: </span>
                        <span>{contact.name}</span>
                      </div>
                      {
                        contact.phone.length > 0 &&
                        contact.phone.map((phoneNumber, idx) => (
                          <div key={idx}>
                            <span>Phone: </span>
                            <span>{phoneNumber}</span>
                          </div>
                        ))
                      }
                      <div>
                        <span>Email: </span>
                        <span>{contact.email ? contact.email : "-"}</span>
                      </div>
                      <div className='last'>
                        <span>Address: </span>
                        <span>{contact.address ? contact.address : '-'}</span>
                      </div>
                    </div>
                  </div>
                </StyledCard>
              ))
            }
          </Grid>

        </StyledGrid>

        {
          deleteContact[0] === 1 &&
          (<CustomModal open={modalOpen} handleClose={handleModalClose} >
            <Grid container sx={{ alignItems: 'center' }}>

              <Grid item xs={12} sx={{ height: 'fit-content', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '24px' }}>Delete Contact</Typography>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <HelpOutline sx={{ fontSize: '128px', color: '#F49859' }} />
              </Grid>
              <div style={{ textAlign: 'center', width: '100%', marginTop: '15px' }}>
                <Typography sx={{ userSelect: 'none' }}>
                  Do you really want to delete this number?
                </Typography>
                <Button variant='contained' sx={{ backgroundColor: '#999', marginRight: '5px' }} onClick={handleModalClose} >No</Button>
                <Button variant='contained' sx={{ backgroundColor: 'crimson' }} onClick={deleteContactById} >Yes</Button>
              </div>

            </Grid>
          </CustomModal>)
        }
      </Paper>
      {
        (deleteStatus[0] === 1 || deleteStatus[0] === 2) &&
        (<CustomizedSnackbars open={alertOpen} handleClose={handleAlertClose} type={deleteStatus[0] === 1 ? "success" : "warning"} message={deleteStatus[1]} />)
      }
    </Grid>
  )
}
