import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ItemListContext } from "../components/contexts/itemListContext";
import { TextField, Button, Stack, Typography, Paper } from "@mui/material";

const EditPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { items, updateItem } = useContext(ItemListContext);

  const post = items.find((p) => String(p.id) === postId);

  const [formData, setFormData] = useState({
    title: post?.title || "",
    body: post?.body || "",
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateItem(post.id, formData);
    navigate(`/posts/${post.id}`);
  };

  if (!post) return <Typography>Post not found</Typography>;

  return (
    <Paper elevation={1}
    sx={{
      mt: 4,
      p: 3,
      bgcolor: "primary.50",
      border: "1px solid",
      borderColor: "primary.200",
    }}>

    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Title"
          value={formData.title}
          onChange={handleChange("title")}
          fullWidth
          required
        />
        <TextField
          label="Body"
          value={formData.body}
          onChange={handleChange("body")}
          multiline
          rows={4}
          fullWidth
        />
        <Button type="submit" variant="contained">
          Save Changes
        </Button>
      </Stack>
    </form>
    </Paper>
  );
};

export default EditPostPage;
