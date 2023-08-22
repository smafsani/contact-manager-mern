import { AppBar, Button, Toolbar, Typography, useMediaQuery, useTheme, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { DrawerComp } from './DrawerComp';

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

  const theme = useTheme();
  const isDrawerTurn = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent' }}>
      <Toolbar>
        {!isDrawerTurn ?
          <>
            <Typography component={NavLink}
              variant="h6"
              sx={{
                textDecoration: 'none',
                mr: 2,
                textTransform: 'uppercase',
                fontSize: '16px',
                fontWeight: 'bold',
                display: { xs: 'none', sm: 'flex' },
                color: 'inherit',
                userSelect: 'none',
              }}
              to='/'
            >
              Contact Manager
            </Typography>

            <div>
              <StyledButton sx={{ display: { xs: 'none', sm: 'inline' } }} className='tabButton' component={NavLink} to='/contacts' label="Contacts">Contacts</StyledButton>
              <StyledButton sx={{ display: { xs: 'none', sm: 'inline' } }} className='tabButton' component={NavLink} to='/add-contact' label="Add Contact">Add Contact</StyledButton>
              <StyledButton sx={{ display: { xs: 'none', sm: 'inline' } }} className='tabButton' component={NavLink} to='/history' label="History">History</StyledButton>
              <StyledButton sx={{ display: { xs: 'none', sm: 'inline' } }} className='tabButton' component={NavLink} to='/about' label="About">About</StyledButton>
            </div>
          </> :
          <DrawerComp />
        }

      </Toolbar>


    </AppBar>
  )
}
