import { Box } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Typography from "@mui/material/Typography";

/**
 * DownloadProps interface for the Download component
 */
interface DownloadProps {
  markerID: number;
  sensorName: string;
  sxDesign: any;
}

/**
 * Download a json file from the server
 * @param data : Data from the server
 * @param filename : Name of the file downloaded
 */
function downloadJsonFile(data:any, filename:string) {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function Download({ markerID, sensorName, sxDesign }: DownloadProps) {
  const handleDownload = async () => {
    const response = await fetch(`http://localhost:8080/download/${markerID}`);
    const data = await response.json();
    downloadJsonFile(data, `${sensorName}.json`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={sxDesign}
      onClick={handleDownload}
    >
      <FileDownloadIcon/>
      <Typography
        variant="caption"
        sx={{ fontFamily: "Outfit", fontSize: "8px" }}
      >
        Download
      </Typography>
    </Box>
  );
}

export default Download;
