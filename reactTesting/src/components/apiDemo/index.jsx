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
import { useApi } from "../../hooks/useApi";
import ErrorMessage from "./ErrorMessage";
import CreateItemForm from "./CreateItemForm";
import ItemList from "./ItemList";
import { ErrorContext } from "../contexts/errorContext";
import { ItemListContext } from "../contexts/itemListContext";
import { CreateItemContext } from "../contexts/createItemContext";

const ApiDemo = () => {
  const {
    items,
    loading,
    error,
    clearError,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
  } = useApi();

  return (
    <ErrorContext.Provider value={{ error, clearError }}>
      <ItemListContext.Provider
        value={{ items, loading, fetchItems, deleteItem, updateItem }}
      >
        <CreateItemContext.Provider value={{ createItem, loading }}>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box display="flex" alignItems="center" gap={2} mb={4}>
              <Api color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h3" component="h1" color="primary">
                React Testing App
              </Typography>
            </Box>

            {/* Error Display */}
            <ErrorMessage />

            {/* Create Form */}
            <CreateItemForm />

            {/* Items List */}
            <ItemList />

            {/* React Testing App Info */}
            <Paper
              elevation={1}
              sx={{
                mt: 4,
                p: 3,
                bgcolor: "primary.50",
                border: "1px solid",
                borderColor: "primary.200",
              }}
            >
              <Typography variant="h6" color="primary.main" gutterBottom>
                Most Popular React Testing Libraries
              </Typography>

              <List dense>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Chip
                          label="Unit Testing"
                          color="success"
                          size="small"
                        />
                        <Typography variant="body2">
                          - Tests small, isolated functions or components (e.g.,
                          a button’s onClick behavior).
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Chip
                          label="Integration Testing"
                          color="warning"
                          size="small"
                        />
                        <Typography variant="body2">
                          Tests the collaboration between components (e.g., a
                          form and its validation logic).
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Chip
                          label="End to End Testing"
                          color="info"
                          size="small"
                        />
                        <Typography variant="body2">
                          Tests full user flows in the browser (e.g., logging in
                          or submitting a form).
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              </List>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 2, display: "block" }}
              >
                Testing is a crucial aspect that ensures the reliability and
                stability of our applications. React testing focuses on
                verifying components behave as expected—visually, functionally,
                and interactively. Testing ensures your UI remains robust
                through changes.
              </Typography>
            </Paper>
          </Container>
        </CreateItemContext.Provider>
      </ItemListContext.Provider>
    </ErrorContext.Provider>
  );
};

export default ApiDemo;
