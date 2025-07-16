import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import { Api } from "@mui/icons-material";

import ErrorMessage from "./ErrorMessage";

import ItemList from "./ItemList";


const ApiDemo = () => {


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Api color="danger" sx={{ fontSize: 40 }} />
        <Typography variant="h3" component="h1" color="primary">
         Posts
        </Typography>
      </Box>

      {/* Error Display */}
      <ErrorMessage />

      {/* Items List */}
      <ItemList />

      
    </Container>
  );
};

export default ApiDemo;
