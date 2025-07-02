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
                React UIs - Material UI
              </Typography>
            </Box>

            {/* Error Display */}
            <ErrorMessage />

            {/* Create Form */}
            <CreateItemForm />

            {/* Items List */}
            <ItemList />

            {/* React UI Info */}
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
                Most Popular React UIs
              </Typography>

              <List dense>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Chip label="MUI" color="info" size="small" />
                        <Typography variant="body2">
                          Implements Google’s Material Design; highly
                          customizable and well-documented.
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Chip label="Ant Design" color="success" size="small" />
                        <Typography variant="body2">
                          Enterprise-level UI components with a polished,
                          professional look.
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Chip label="Chakra UI" color="warning" size="small" />
                        <Typography variant="body2">
                          Focuses on accessibility and composability with a
                          modern design system.
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
                          label="React Bootstrap"
                          color="info"
                          size="small"
                        />
                        <Typography variant="body2">
                          Bootstrap components rebuilt for React; familiar and
                          responsive.
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
                React UI libraries are collections of pre-built, reusable
                components—like buttons, forms, modals, tables, and
                charts—designed to help developers build user interfaces faster
                and more consistently.
              </Typography>
            </Paper>
          </Container>
        </CreateItemContext.Provider>
      </ItemListContext.Provider>
    </ErrorContext.Provider>
  );
};

export default ApiDemo;
