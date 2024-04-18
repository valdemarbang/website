import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import * as React from "react";

/**
 * SuccessAlertProps interface for the SuccessAlert component
 */
interface SuccessAlertProps {
  open: boolean;
  message: string;
}

/**
 * SuccessAlert component displays a success alert when an action is successful.
 * @param message - Message to display in the alert
 * @returns - A success alert component
 */
const SuccessAlert: React.FC<SuccessAlertProps> = ({
  open,
  message,
}) => {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ width: "95%" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: "95%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SuccessAlert;
