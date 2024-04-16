import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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
      message={message}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
      />
    );
  }

export default SuccessAlert;