import { Menu } from '@mui/icons-material';
import { Button, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

export const DrawerComp = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const PAGES = [["Contacts", '/contacts'], ["Add Contact", '/add-contact'],
    ["History", '/history'], ["About", '/about']]

    return (
        <React.Fragment>
            <Drawer open={openDrawer} sx={{ "& .MuiPaper-root": { backgroundColor: "#0a0b0e", minWidth: '200px' } }}
                onClose={() => setOpenDrawer(false)}>
                <List>
                    <ListItemButton>
                        <ListItemIcon sx={{ width: '100%', padding: '0' }}>
                            <ListItemText sx={{ width: '100%' }}>
                                <Typography component={NavLink} to='/'
                                    sx={{
                                        color: "#fff", width: '100%', display: 'block', textDecoration: 'none',
                                        padding: '5px', fontWeight: 'bold', marginBottom: '20px', fontSize: '16px'
                                    }}>Contact Manager</Typography>
                            </ListItemText>
                        </ListItemIcon>
                    </ListItemButton>

                    {
                        PAGES.map((value, index) => (
                            <ListItemButton key={index}>
                                <ListItemIcon sx={{ width: '100%', padding: '0' }}>
                                    <ListItemText sx={{ width: '100%' }}>
                                        <Typography component={NavLink} to={value[1]}
                                            sx={{
                                                color: "#fff", width: '100%', display: 'block', textDecoration: 'none',
                                                padding: '8px', fontSize: '14px', borderRadius: "6px",
                                                "&:hover": { backgroundColor: "#54565a", transition: 'all 0.3s ease' }
                                            }}>{value[0]}</Typography>
                                    </ListItemText>
                                </ListItemIcon>
                            </ListItemButton>
                        ))
                    }
                </List>
            </Drawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                <Menu sx={{ display: { xs: 'inline', sm: 'none' }, color: "#fff" }} />
            </IconButton>
        </React.Fragment>
    )
}
