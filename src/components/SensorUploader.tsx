import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import SensorsIcon from "@mui/icons-material/Sensors";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Typography from "@mui/material/Typography";
import { MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { MuiFileInput } from "mui-file-input";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

function getCurrentRFC3339DateTime(): string {
  const now = new Date();
  const isoString = now.toISOString();

  // Remove the milliseconds part and 'Z' suffix
  const trimmedISOString = isoString.slice(0, -5) + "Z";

  return trimmedISOString;
}

function SensorUploader() {
  const [dataFile, setDataFile] = useState<File | null>(null);
  const handleDataChange = (newValue: File | null) => {
    setDataFile(newValue);
  };

  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleImageChange = (newValue: File | null) => {
    setImageFile(newValue);
  };

  const [sensorType, setSensorType] = useState("");

  const navigate = useNavigate();

  // Handle submit button press
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    // Get form data, if not available set to empty string
    const latitude = +(form.get("latitude") || 0);
    const longitude = +(form.get("longitude") || 0);

    if (latitude == 0 || longitude == 0 || sensorType == "") {
      alert("Please fill out all required fields");
      return;
    }

    if (dataFile == null) {
      alert("Please select a .csv file with sensor data");
      return;
    }

    const timestamp = getCurrentRFC3339DateTime();

    // Read CSV data from file:
    const reader = new FileReader();

    reader.onload = async () => {
      const data = reader.result as string;

      // Request to server
      const response = await fetch("http://localhost:8080/sensordata/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude,
          longitude,
          sensorType,
          data,
          timestamp,
        }),
      });

      // Handle response from server, maybe some errors was missed
      await response.json();
      if (!response.ok) {
        alert("Failed to send sensor data to server");
      } else {
        navigate("/");
      }
    };

    reader.onerror = () => {
      alert(reader.error);
    };
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#1F3559" }}>
          <SensorsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Sensor Data
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, height: "100%" }}
        >
          <Grid container columnSpacing={3}>
            <Grid item xs={6}>
              <TextField
                helperText="The position's latitude coordinate"
                required
                fullWidth
                type="number"
                margin="normal"
                id="latitude"
                name="latitude"
                label="Latitude"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                helperText="The position's longitude coordinate."
                required
                fullWidth
                type="number"
                margin="normal"
                id="longitude"
                label="Longitude"
                name="longitude"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
              id="type"
              required
              select
              label="Select a sensor type"
              margin="normal"
              fullWidth
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSensorType(event.target.value);
              }}
              helperText="Please select your sensor type"
            >
              <MenuItem value="Pressure">Pressure</MenuItem>
              <MenuItem value="Temperature">Temperature</MenuItem>
              <MenuItem value="Acceleration">Acceleration</MenuItem>
              <MenuItem value="Gyro">Gyro</MenuItem>
              <MenuItem value="Angle">Angle</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField></Grid>
            <Grid item xs={6}>
            <MuiFileInput
              fullWidth
              margin="normal"
              placeholder="Upload an image"
              value={imageFile}
              onChange={handleImageChange}
              inputProps={{ accept: ".jpg, .jpeg, .png" }}
              clearIconButtonProps={{
                title: "Remove",
                children: <CloseIcon fontSize="small" />,
              }}
              InputProps={{
                startAdornment: <AttachFileIcon />,
              }}
            /></Grid>
            <Grid item xs={6}>
            <MuiFileInput
              fullWidth
              margin="normal"
              placeholder="Upload .csv file"
              value={dataFile}
              onChange={handleDataChange}
              inputProps={{ accept: ".csv" }}
              clearIconButtonProps={{
                title: "Remove",
                children: <CloseIcon fontSize="small" />,
              }}
              InputProps={{
                startAdornment: <AttachFileIcon />,
              }}
            />
            </Grid>
            <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SensorUploader;
