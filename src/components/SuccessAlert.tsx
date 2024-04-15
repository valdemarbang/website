import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

/**
 * SuccessAlertProps interface for the SuccessAlert component
 */
interface SuccessAlertProps {
  open: boolean;
  onClose: () => void;
  message: string; 
}

/**
 * SuccessAlert component displays a success alert when an action is successful.
 * @param open - Boolean to open or close the alert
 * @param onClose - Function to close the alert
 * @param message - Message to display in the alert
 * @returns 
 */
const SuccessAlert: React.FC<SuccessAlertProps> = ({ open, onClose, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessAlert;