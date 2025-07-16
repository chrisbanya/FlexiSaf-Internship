import { useContext } from "react";
import { ErrorContext } from "../contexts/errorContext";
import { Alert, AlertTitle, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const ErrorMessage = () => {
  const { error, clearError } = useContext(ErrorContext);
  if (!error) return null;

  return (
    <Alert
      severity="error"
      sx={{ mb: 2 }}
      action={
        clearError && (
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={clearError}
          >
            <Close fontSize="inherit" />
          </IconButton>
        )
      }
    >
      <AlertTitle>Error</AlertTitle>
      {error}
    </Alert>
  );
};

export default ErrorMessage;
