import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CreateItemContext } from "../contexts/createItemContext";

const CreateItemForm = () => {
  const { createItem, loading } = useContext(CreateItemContext);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const myRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!loading && myRef.current) {
        myRef.current.focus();
      }
    }, 0);
    return () => clearTimeout(timeout);
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      await createItem(formData);
      setFormData({ title: "", body: "" });
      navigate("/posts"); 
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: "grey.50" }}>
      <Typography variant="h6" gutterBottom>
        Create New Item (POST)
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            placeholder="Enter item title"
            value={formData.title}
            onChange={handleChange("title")}
            disabled={loading}
            required
            fullWidth
            inputRef={myRef}
          />

          <TextField
            label="Body"
            placeholder="Enter item description"
            value={formData.body}
            onChange={handleChange("body")}
            disabled={loading}
            multiline
            rows={3}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={loading || !formData.title.trim()}
            startIcon={<Add />}
            sx={{ alignSelf: "flex-start" }}
          >
            {loading ? "Creating..." : "Create Item"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default CreateItemForm;
