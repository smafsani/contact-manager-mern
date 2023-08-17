import { AppBar, Button, Toolbar, Typography, } from '@mui/material'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledButton = styled(Button)`
    color : #fff;
    font-size: 12px;
    padding: 5px;
    min-height: 0;
    min-width: 0;
    position: relative;
    z-index: 1000;
    margin: 0 5px;
    &::before{
      content: "";
      position: absolute;
      height: 2px;
      left: 50%;
      bottom: 0;
      width: 0%;
      background-color: #fff;
      transition: all 0.3s ease;
    }
    &:hover::before{
      width: 100%;
      left: 0%;
    }
    &.Mui-selected{
      color: #fff;
    }
    &.Mui-selected::before{
      background-color: #fff;
      width: 100%;
      left: 0;
    }
`;

export const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent' }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            mr: 2,
            textTransform: 'uppercase',
            fontSize: '16px',
            fontWeight: 'bold',
            display: { xs: 'none', md: 'flex' },
            color: 'inherit',
            userSelect: 'none',
          }}
        >
          Contact Manager
        </Typography>

        <div>
          <StyledButton className='tabButton' component={NavLink} to='/contacts' label="Contacts">Contacts</StyledButton>
          <StyledButton className='tabButton' component={NavLink} to='/add-contact' label="Add Contact">Add Contact</StyledButton>
          <StyledButton className='tabButton' component={NavLink} to='/history' label="History">History</StyledButton>
          <StyledButton className='tabButton' component={NavLink} to='/about' label="About">About</StyledButton>
        </div>

        <Button className='authButton' component={NavLink} to='/' variant='contained' sx={{ marginLeft: 'auto', marginRight: '10px', backgroundColor: "#47b4fd" }}>Profile</Button>
      </Toolbar>
    </AppBar>
  )
}
