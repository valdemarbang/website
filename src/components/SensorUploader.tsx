import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import SensorsIcon from '@mui/icons-material/Sensors';
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import { InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState} from "react";
import { MuiFileInput } from "mui-file-input";

function SensorUploader() {
  const [file, setFile] = useState<File | null>(null)
  const handleChange = (newValue: File | null) => {
    setFile(newValue)
  }

  // Handle submit button press
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);

    // Get form data, if not available set to empty string
    const longitude = (data.get("longitude") || "") as string;
    const latitude = (data.get("latitude") || "") as string;
    const type = (data.get("type") || "") as string;

    if (file == null) {
      return
    }

    // Request to server
    const response = await fetch("http://localhost:8080/add-sensor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ longitude, latitude, type, file }),
    });

    // Handle response from server, maybe some errors was missed
    const responseData = await response.json();
    if (!response.ok) {
      // Lol, smile
    } else {
      // Workeed
    }
  };



  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#1F3559" }}>
          <SensorsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Sensor Data
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            helperText="The position's longitude coordinate."
            required
            fullWidth
            margin="normal"
            id="longitude"
            label="Longitude"
            name="longitude"
            autoFocus
          />
          <TextField
            helperText="The position's latitude coordinate"
            required
            fullWidth
            margin="normal"
            id="latitude"
            name="latitude"
            label="Latitude"
          />
          <InputLabel id="type-label">Sensor type</InputLabel>
          <Select
            labelId="type-label"
            required
            id="type"
            label="Type">
            <MenuItem value={0}>Pressure</MenuItem>
            <MenuItem value={1}>Temperature</MenuItem>
            <MenuItem value={2}>Acceleration</MenuItem>
            <MenuItem value={3}>Gyro</MenuItem>
            <MenuItem value={4}>Angle</MenuItem>
            <MenuItem value={5}>Other</MenuItem>
          </Select>
          <Box>
            <InputLabel id="data-label">Import data from .csv file</InputLabel>
            <MuiFileInput
            value={file} onChange={handleChange} inputProps={{ accept: '.csv' }} 
            clearIconButtonProps={{
              title: "Remove",
              children: <CloseIcon fontSize="small"/>
            }}/>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SensorUploader;
