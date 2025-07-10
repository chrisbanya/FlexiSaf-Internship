import { useState } from "react";
import { useContext } from "react";
import { ItemListContext } from "../contexts/itemListContext";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Box,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";

const ItemCard = ({ item }) => {
  const { loading, deleteItem, updateItem } = useContext(ItemListContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: item?.title || "",
    body: item?.body || "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleUpdate = async () => {
    try {
      await updateItem(item.id, editData);
      setIsEditing(false);
    } catch (error) {
      console.log(error)
      // Error handling is done in the parent component
    }
  };

  const handleCancel = () => {
    setEditData({ title: item.title, body: item.body });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await deleteItem(item.id);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.log(error);
      // Error handling is done in the parent component
    }
  };

  const handleChange = (field) => (e) => {
    setEditData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <>
      <Card elevation={1} sx={{ mb: 2 }}>
        <CardContent>
          {isEditing ? (
            // Edit Mode
            <Stack spacing={2}>
              <TextField
                label="Title"
                value={editData.title}
                onChange={handleChange("title")}
                disabled={loading}
                fullWidth
                required
              />
              <TextField
                label="Body"
                value={editData.body}
                onChange={handleChange("body")}
                disabled={loading}
                multiline
                rows={3}
                fullWidth
              />
            </Stack>
          ) : (
            // View Mode
            <>
              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="flex-start"
                mb={1}
              >
                <Typography variant="h6" component="h3">
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
            </>
          )}
        </CardContent>
        <CardActions>
          {isEditing ? (
            <Stack direction="row" spacing={1}>
              <Button
                onClick={handleUpdate}
                disabled={loading}
                variant="contained"
                color="primary"
                startIcon={<Save />}
                size="small"
              >
                {loading ? "Saving..." : "Save"}
              </Button>
              <Button
                onClick={handleCancel}
                disabled={loading}
                variant="outlined"
                startIcon={<Cancel />}
                size="small"
              >
                Cancel
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1}>
              <Button
                onClick={() => setIsEditing(true)}
                disabled={loading}
                variant="outlined"
                color="warning"
                startIcon={<Edit />}
                size="small"
              >
                Edit (PUT)
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
          )}
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
