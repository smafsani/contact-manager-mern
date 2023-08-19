import React, { useEffect, useState } from 'react'
import { getContacts } from '../services/api';
import { Card, FormGroup, Grid, Paper, Table, TableBody, TableCell, TableRow, styled } from '@mui/material';
import { AccountCircle, ArrowDropDown, ArrowDropUp, Edit } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

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
    transition: all 0.3s ease-in-out;
  }
  
  & .data .info.active {
    max-height: 1000px;
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
    font-size: 16px !important;
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

export const Contacts = () => {
  const paperStyle = {
    padding: '2%', width: '100%', margin: 'auto', display: 'flex',
    backgroundColor: '#0a0b0e', minHeight: '80vh', justifyContent: 'center',
  };
  const headerStyle = { color: "#fff", textAlign: 'left', marginBottom: '15px', textTransform: 'uppercase' };

  const [contacts, setContacts] = useState({});

  const [currentInfoIdx, setCurrentInfoIdx] = useState(-1);

  useEffect(() => {
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

    fetchData();
  }, []);

  const handleContactInfoTab = (index) => {
    setCurrentInfoIdx((prevIndex) => {
      if(index === prevIndex) {
        return -1;
      }
      return index;
    });
  };


  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <StyledGrid container sx={{ overflowY: 'auto' }}>
          <Grid item sx={{ width: '100%', height: '10%', display: "flex", justifyContent: 'center' }}>
            <h4 style={headerStyle}>Contacts</h4>
          </Grid>
          <Grid item sx={{ width: '100%', height: '85%', display: "flex", flexDirection: 'column', justifyContent: 'flex-start', marginTop: '10px' }}>
            {contacts.length > 0 &&
              contacts.map((contact, index) => (
                <StyledCard key={index} sx={{ overflow: 'inherit' }} onClick={() => handleContactInfoTab(index)}>
                  <div className="icon">
                    <AccountCircle />
                  </div>
                  <div className="data">
                    <div className="title" style={{ display: 'flex', justifyContent: 'space-between' }}>{contact.name} {currentInfoIdx === index ? <ArrowDropUp /> : <ArrowDropDown />}</div>
                    <span className="number">{contact.phone[0]}</span>
                    <div className={`info ${currentInfoIdx === index ? 'active' : ''}`} >
                      <div className='first' style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.5)' }}>
                        <span>Info</span>
                        <span><NavLink to={`/edit-contact/${contact._id}`}><Edit sx={{ fontSize: '16px', cursor: 'pointer' }} /></NavLink></span>
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
                        <span>{contact.email}</span>
                      </div>
                      <div className='last'>
                        <span>Address: </span>
                        <span>{contact.address}</span>
                      </div>
                    </div>
                  </div>
                </StyledCard>
              ))
            }
          </Grid>

        </StyledGrid>
      </Paper>
    </Grid>
  )
}
