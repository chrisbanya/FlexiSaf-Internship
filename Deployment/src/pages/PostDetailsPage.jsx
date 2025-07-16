import { useParams, Link as RouterLink } from "react-router-dom";
import { useContext } from "react";
import { ItemListContext } from "../components/contexts/itemListContext";
import { Button, Paper, Typography } from "@mui/material";

const PostDetailsPage = () => {
  const { postId } = useParams();
  const { items } = useContext(ItemListContext);

  const post = items.find((p) => String(p.id) === postId);

  if (!post) return <Typography>Post not found</Typography>;

  return (
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
      <Typography variant="h4">{post.title}</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {post.body}
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        component={RouterLink}
        to={`/posts/${post.id}/edit`}
      >
        Edit Post
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 2, ml: 2 }}
        component={RouterLink}
        to="/posts"
      >
        Back to Posts
      </Button>
    </Paper>
  );
};

export default PostDetailsPage;
