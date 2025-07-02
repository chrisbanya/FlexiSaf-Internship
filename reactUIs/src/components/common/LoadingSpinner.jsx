import { Box, CircularProgress, Typography } from "@mui/material";
const LoadingSpinner = ({ size = "medium", text = "Loading..." }) => {
  const sizeMap = {
    small: 20,
    medium: 40,
    large: 60,
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      p={2}
    >
      <CircularProgress size={sizeMap[size]} />
      {text && (
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
