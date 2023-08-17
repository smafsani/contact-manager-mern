import React, { useEffect, useState } from 'react'
import { Grid, Paper, FormGroup, TextField, Button, styled, Typography, useMediaQuery, Link } from '@mui/material'
import { Person } from '@mui/icons-material';
const StyledTextField = styled(TextField)`
  & input{
    border: 0.15rem solid #2196f3;
    border-radius: 3px;
    z-index: 1;
    color: #2196f3;
  }
  & label{
    background-color: #0a0b0e;
    z-index: 100;
    padding: 0 10px 0 5px;
    color: #2196f3;
  }
  & .MuiInputLabel-root:not(.Mui-focused):not(.MuiInputLabel-shrink) {
    opacity: 0.4;
  }
  & .Mui-focused.MuiInputLabel-root,
  & .MuiInputLabel-root.MuiInputLabel-shrink{
    opacity: 1 !important;
  }  
`;

const defaultUser = {
  name : '',
  email : '',
  phone : '',
  password : '',
  confirm_password : '' 
}

export const RegisterForm = () => {
  const paperStyle = {
    padding: '2% 4%', width: '100%', margin: 'auto',
    backgroundColor: '#0a0b0e'
  };
  const headerStyle = { color: "#fff", textAlign: 'left' };

  const [user, setUser] = useState(defaultUser);

  const loadTextField = (e) => {
    setUser({...user, [e.target.name] : e.target.value})
  }

  const handleSubmitForm = () => {
    console.log(user);
  }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid container sx={{ width: '100%' }}>
          <Grid item sm={12} md={7} sx={{ width: '100%', display: "flex", justifyContent: 'center' }}>
            <FormGroup sx={{ minWidth: '200px', width: '100%', maxWidth: '400px' }}>
              <h3 style={headerStyle}>SIGN UP</h3>
              <StyledTextField label="Name" value={user.name} name='name' margin="normal" onChange={(e) => loadTextField(e)} />
              <StyledTextField label="Email*" value={user.email} name='email' margin="normal" onChange={(e) => loadTextField(e)} />
              <StyledTextField label="Phone" value={user.phone} name='phone' margin="normal" onChange={(e) => loadTextField(e)} />
              <StyledTextField label="Password*" value={user.password} name='password' margin="normal" onChange={(e) => loadTextField(e)} />
              <StyledTextField label="Confirm Password*" value={user.confirm_password} name='confirm_password' margin="normal" onChange={(e) => loadTextField(e)} />
            </FormGroup>
          </Grid>
          <Grid item sm={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FormGroup sx={{ flex: '1', maxWidth: '400px' }}>
              <Typography className='small-screen' variant='h6'>
                Register To
              </Typography>
              <Typography className='small-screen' variant='h5' sx={{ fontWeight: 'bold', color: "#47b4fd", marginBottom: '30px'}}>
                Contact Manager
              </Typography>
              <Typography>
                Already have an account? <Link href="#">Sign In</Link>
              </Typography>
              <Button variant='contained' sx={{ marginTop: '5px', width: '100%' }} onClick={handleSubmitForm}>Sign Up</Button>
            </FormGroup>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}
