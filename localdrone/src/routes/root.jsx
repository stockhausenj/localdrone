import React from 'react';
import {
  Outlet,
  NavLink,
} from "react-router-dom";
import drone from '../drone.svg';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const drawerWidth = 300;

const CustomNavLink = React.forwardRef((props, ref) => (
  <NavLink innerRef={ref} {...props} />
));

export default function Root() {
  return (
    <>
      <div>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <div className="App-logo-div">
            <img src={drone} className="App-logo" alt="logo" />
          </div>
          <Divider />
          <List>
            <ListItem  sx={{padding: 0}}>
              <ListItemButton component={CustomNavLink} to={'pilots'}>
                <ListItemText primary={'Pilots'} />
              </ListItemButton>
            </ListItem>
            <ListItem  sx={{padding: 0}}>
              <ListItemButton component={CustomNavLink} to={'missions'}>
                <ListItemText primary={'Missions'} />
              </ListItemButton>
            </ListItem>
          </List>
          <List style={{ marginTop: `auto` }}>
          <Divider style={{marginBottom: 8}}/>
            <ListItem  sx={{padding: 0}} alignToBottom>
              <ListItemButton component={CustomNavLink} to={'login'}>
                <ListItemText primary={'Login'} />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>  
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
