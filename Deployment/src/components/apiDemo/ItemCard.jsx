import { useState, useContext } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { ItemListContext } from "../contexts/itemListContext";

const ItemCard = ({ item }) => {
  const { loading, deleteItem } = useContext(ItemListContext);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteItem(item.id);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card elevation={1} sx={{ mb: 2 }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={1}
          >
            <Typography
              variant="h6"
              component={RouterLink}
              to={`/posts/${item.id}`}
              sx={{ textDecoration: "none", color: "primary.main" }}
            >
              {item.title}
            </Typography>
            <Chip
              label={`ID: ${item.id}`}
              size="small"
              variant="outlined"
              color="primary"
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {item.body}
          </Typography>
        </CardContent>

        <CardActions>
          <Stack direction="row" spacing={1}>
            <Button
              component={RouterLink}
              to={`/posts/${item.id}`}
              variant="outlined"
              startIcon={<Visibility />}
              size="small"
            >
              View Post
            </Button>
            <Button
              onClick={() => setDeleteDialogOpen(true)}
              disabled={loading}
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              size="small"
            >
              Delete (DELETE)
            </Button>
          </Stack>
        </CardActions>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{item.title}"? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ItemCard;
