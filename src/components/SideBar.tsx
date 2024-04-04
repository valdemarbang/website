import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from './TopBar';
import { Expand } from '@mui/icons-material';

const drawerWidth = 240;

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(-5),
      marginRight: theme.spacing(-5),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, -1),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(3)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "10ch",
      },
    },
  }));

export default function PermanentDrawerLeft() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            marginTop: 8,
            boxSizing: 'border-box',
            bgcolor: '#1F2943',
            color: 'white',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
      

        <List sx={{marginLeft: 2, marginTop: -8}}>
        {['Sensors in listform'].map((text) => (
        <ListItem key={'Sensors in listform'} disablePadding>
            <ListItemButton>
                    <ListItemText primary={text} sx={{ fontSize: '1px' }}/>
                    <ListItemIcon>
                        <ExpandMore sx={{ color: 'white', marginLeft: 2}}/>
                    </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}

        </List>

        <List sx={{width: '46%', marginBottom: -2}}>
          {['Location'].map((text) => (
            <ListItemText primary={text} />
          ))}
        </List>
        
        <List sx={{ width: '50%', mx: 'auto' }}>
            <Search sx={{ display: 'flex', justifyContent: 'flex-start', flexGrow: 1 }}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase 
                    placeholder="Linköping, Sweden"
                    inputProps={{ "aria-label": "search" }}
                
                    
                />
            </Search>
        </List>

        <List sx={{width: '55%', marginBottom: -2}}>
          {['Sensortype'].map((text) => (
            <ListItemText primary={text} />
          ))}
        </List>
        
        <List sx={{ width: '50%', mx: 'auto' }}>
            <Search sx={{ display: 'flex', justifyContent: 'flex-start', flexGrow: 1 }}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase 
                    placeholder="Temperature"
                    inputProps={{ "aria-label": "search" }}     
                />
            </Search>
        </List>

        <List sx={{width: '100%', marginTop: -1.5, marginLeft: 1}}>
          {['+ Add filter'].map((text) => (
            <ListItem key={'Sensors in listform'} disablePadding>
            <ListItemButton>
                    <ListItemText primary={text} />

            </ListItemButton>
          </ListItem>
          ))}
        </List>

        <Divider sx={{ bgcolor: 'white', marginTop: '100px' }} />
      </Drawer>
    </Box>
  );
}
