import React, { createContext, useState } from 'react';
import { AuthContext } from '../contexts.jsx';
import {
  Outlet,
  NavLink,
} from "react-router-dom";
import drone from '../drone.svg';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import WorkIcon from '@mui/icons-material/Work';

const drawerWidth = 250;

const CustomNavLink = React.forwardRef((props, _) => (
  <NavLink 
    {...props}
  />
));

export default function Root() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  console.log('from root ' + currentUser);

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
              backgroundColor: '#595959',
              color: '#fff'
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <div className="App-logo-div">
            <img src={drone} className="App-logo" alt="logo" />
          </div>
          <Divider sx={{backgroundColor: '#cddc39'}}/>
          <List>
          <ListItem  sx={{padding: 0}}>
              <ListItemButton component={CustomNavLink} to={'/'}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={'Home'} />
              </ListItemButton>
            </ListItem>
            <ListItem  sx={{padding: 0}}>
              <ListItemButton component={CustomNavLink} to={'pilots'}>
                <ListItemIcon>
                  <VideogameAssetIcon />
                </ListItemIcon>
                <ListItemText primary={'Pilots'} />
              </ListItemButton>
            </ListItem>
            <ListItem  sx={{padding: 0}}>
              <ListItemButton component={CustomNavLink} to={'missions'}>
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText primary={'Missions'} />
              </ListItemButton>
            </ListItem>
          </List>
          <List style={{ marginTop: `auto` }}>
          <Divider style={{marginBottom: 8}} sx={{backgroundColor: '#cddc39'}}/>
            <ListItem  sx={{padding: 0}}>
              {currentUser == null &&
              <ListItemButton component={CustomNavLink} to={'login'}>
                <ListItemText primary={'Login'} />
              </ListItemButton>}
              {currentUser != null &&
              <ListItemButton component={CustomNavLink} to={'user/1234'}>
                <ListItemText primary={'Profile'} />
              </ListItemButton>}
            </ListItem>
          </List>
        </Drawer>  
      </div>
      <div id="detail">
        <AuthContext.Provider value={setCurrentUser}>
          <Outlet />
        </AuthContext.Provider>
      </div>
    </>
  );
}
