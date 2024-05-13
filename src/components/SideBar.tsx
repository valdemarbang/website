import * as React from "react";
import { alpha, styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import { AccountCircle } from "@mui/icons-material";
import InputBase from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from '@mui/material/InputAdornment';

const Search = styled("div")(({ theme }) => ({
  position: "sticky",
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
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
  },
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      height="100%"
      sx={{ width: "auto", bgcolor: "#1F2943", color: "white" }}
    >
      <Box
        height="100%"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "auto",
          bgcolor: "rgba(255, 255, 255, 0.1)", // Button background color
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          size="small" // Set the size to small
          sx={{
            p: 0, // Remove padding
            m: 0, // Remove margin
            ...(open && { display: "none" }), // Conditionally hide when the drawer is open
          }}
        >
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </Box>

      <Box
        sx={{
          display: open ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "240px",
          width: "30px", // Adjust width as needed
          bgcolor: "rgba(255, 255, 255, 0.1)", // Button background color
        }}
      >
        <IconButton
          color="inherit"
          aria-label="close drawer"
          onClick={handleDrawerClose}
          edge="end"
          size="small" // Set the size to small
          sx={{
            p: 0, // Remove padding
            m: 0, // Remove margin
          }}
        >
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </Box>
      <Divider />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={sensorLibrary}
        sx={{
          "& .MuiAutocomplete-inputRoot": {
            color: "white",
            textAlign: "center",
          },
          "& .MuiAutocomplete-clearIndicator": {
            color: "white",
          },
          "& .MuiAutocomplete-popupIndicator": {
            color: "white",
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Sensor Library"
            variant="filled"
            InputLabelProps={{
              style: { color: "white", fontSize: "1.1pc" },
            }}
            sx={{ alignItems: "center", textAlign: "center", color: "white" }}
          />
        )}
      />

      <List sx={{ display: "flex", justifyContent: "center" }}>
        <ListItem disablePadding sx={{ width: "90%" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Linköping, Sweden"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </ListItem>
      </List>

      <List sx={{ display: "flex", justifyContent: "center" }}>
        <ListItem disablePadding sx={{ width: "90%" }}>
          <TextField
            id="input-with-icon-textfield"
            label="TextField"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="filled"
          />
        </ListItem>
      </List>

      <List sx={{ width: "100%" }}>
        <ListItem disablePadding>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Temperature"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </ListItem>
      </List>

      <List sx={{ width: "100%" }}>
        {["+ Add filter"].map((text) => (
          <ListItem key={"text"} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ bgcolor: "white", marginTop: "70px" }} />

      <List sx={{ width: "100%" }}>
        <ListItem disablePadding>
          <Search
            sx={{
              "&:hover": {
                outline: "none",
                backgroundColor: "permanent",
                color: "inherit",
              },
            }}
          >
            {["Latest uploaded sensors"].map((text) => (
              <ListItem key={"text"} disablePadding>
                <ListItemText primary={text} />
              </ListItem>
            ))}

            {["Sensor 1", "Sensor 2", "Sensor 3", "Sensor 4"].map((text) => (
              <ListItem key={"text"} disablePadding>
                <ListItemIcon>
                  <AccountCircle
                    sx={{
                      variamt: "permanent",
                      color: "white",
                      marginLeft: 2,
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </Search>
        </ListItem>
      </List>

      <List sx={{ width: "100%" }}>
        {["Help"].map((text) => (
          <ListItem key={"text"} disablePadding>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

      <List sx={{ width: "100%" }}>
        {["About us"].map((text) => (
          <ListItem key={"text"} disablePadding>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

const sensorLibrary = [
  { label: "Sensor 1", year: 1994 },
  { label: "Sensor 2", year: 1972 },
  { label: "Sensor 3", year: 1974 },
  { label: "Sensor 4", year: 2008 },
  { label: "Sensor 5", year: 1994 },
  { label: "Sensor 6", year: 1972 },
  { label: "Sensor 7", year: 1974 },
  { label: "Sensor 8", year: 2008 },
  { label: "Sensor 9", year: 1974 },
  { label: "Sensor 10", year: 2008 },
];
