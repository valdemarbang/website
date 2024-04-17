import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import SensorsIcon from '@mui/icons-material/Sensors';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Typography from "@mui/material/Typography";
import { MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState} from "react";
import { MuiFileInput } from "mui-file-input";

function SensorUploader() {
  const [typeFile, setTypeFile] = useState<File | null>(null)
  const handleTypeChange = (newValue: File | null) => {
    setTypeFile(newValue)
  }

  const [imageFile, setImageFile] = useState<File | null>(null)
  const handleImageChange = (newValue: File | null) => {
    setImageFile(newValue)
  }

  // Handle submit button press
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);

    // Get form data, if not available set to empty string
    const latitude = (data.get("latitude") || "") as string;
    const longitude = (data.get("longitude") || "") as string;
    const type = (data.get("type") || "") as string;

    if (typeFile == null) {
      return
    }

    const timestamp = Date.now()

    // Request to server
    const response = await fetch("http://localhost:8080/add-sensor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ latitude, longitude, type, typeFile, imageFile, timestamp }),
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
          <TextField
            id="type"
            required
            select
            label="Select a sensor type"
            margin="normal"
            fullWidth
            helperText="Please select your sensor type">
              <MenuItem value={1}>Pressure</MenuItem>
              <MenuItem value={2}>Temperature</MenuItem>
              <MenuItem value={3}>Acceleration</MenuItem>
              <MenuItem value={4}>Gyro</MenuItem>
              <MenuItem value={5}>Angle</MenuItem>
              <MenuItem value={6}>Other</MenuItem>
          </TextField>
          <MuiFileInput
            fullWidth
            margin="normal"
            placeholder="Upload an image"
            value={imageFile} onChange={handleImageChange} inputProps={{ accept: '.jpg, .jpeg, .png' }} 
            clearIconButtonProps={{
              title: "Remove",
              children: <CloseIcon fontSize="small"/>
            }}
            InputProps={{
            startAdornment: <AttachFileIcon />
            }}
          />
          <MuiFileInput
            fullWidth
            margin="normal"
            placeholder="Select a .csv file to upload"
            value={typeFile} onChange={handleTypeChange} inputProps={{ accept: '.csv' }} 
            clearIconButtonProps={{
              title: "Remove",
              children: <CloseIcon fontSize="small"/>
            }}
            InputProps={{
            startAdornment: <AttachFileIcon />
            }}
          />
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
