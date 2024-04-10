import { LineChart } from '@mui/x-charts/LineChart';
import data from "../assets/CONT_LOG.json";
import { Label } from '@mui/icons-material';

const keyToLabel: { [key: string]: string } = {
  Roll: 'Roll (°)',
  Pitch: 'Pitch (°)', 
  Yaw: 'Yaw (°)',
};
const colors: { [key: string]: string } = {
  Roll: "red",
  Pitch: "blue",
  Yaw: "green"
};

const stackStrategy = {
  stack: 'total',
  area: false,
  stackOffset: 'none', // To stack 0 on top of others
} as const;

const customize = {
  height: 300,
  legend: { hidden: true },
  margin: { top: 5 },
  stackingOrder: 'descending',
};

function formatTimeFromTimestamp(timestamp: string | number | Date) {
  const dateObject = new Date(timestamp); // Create a Date object from the timestamp
  const hours = ('0' + dateObject.getHours()).slice(-2); // Get hours and pad with leading zero if needed
  const minutes = ('0' + dateObject.getMinutes()).slice(-2); // Get minutes and pad with leading zero if needed
  const seconds = ('0' + dateObject.getSeconds()).slice(-2); // Get seconds and pad with leading zero if needed
  return `${hours}:${minutes}:${seconds}`; // Combine hours, minutes, and seconds in HH:mm:ss format
}

export default function LineDataset() {
  const updatedData = data.map((item) => {
    // Assuming the time attribute format is 'HH:mm:ss'
    const timeParts = item.Time.split(':'); // Split the time string into parts
    const dateObject = new Date(); // Create a new Date object
    dateObject.setHours(parseInt(timeParts[0], 10)); // Set hours
    dateObject.setMinutes(parseInt(timeParts[1], 10)); // Set minutes
    dateObject.setSeconds(parseInt(timeParts[2], 10)); // Set seconds
    return {
      ...item,
      Time: dateObject.getTime(), // Convert Date object to timestamp
    };
  });
  
  return (
    <LineChart
      yAxis={[{ label: 'Angle (°)' }]}
      xAxis={[
        {
          dataKey: 'Time',
          valueFormatter: (value) => formatTimeFromTimestamp(value),
          label: 'Time',
        },
      ]}
      series={Object.keys(keyToLabel).map((key) => ({
        dataKey: key,
        label: keyToLabel[key],
        color: colors[key],
        showMark: false,
        ...stackStrategy,
      }))}
      dataset={updatedData}
      {...customize}
    />
  );
}