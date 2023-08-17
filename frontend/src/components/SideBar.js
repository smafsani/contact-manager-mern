import { Drawer } from '@mui/material';
import React, {useState} from 'react';

export const SideBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
            {/* Content for the Drawer */}
            <div>
                <h2>Drawer Content</h2>
                {/* Add your Sidebar component or any other content here */}
                
            </div>
        </Drawer>
    );
}