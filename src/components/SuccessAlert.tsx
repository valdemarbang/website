import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SuccessAlertProps {
  open: boolean;
  onClose: () => void;
  message: string; 
}

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