import { Container, Typography } from "@mui/material";
import CreateItemForm from "../components/apiDemo/CreateItemForm";

const CreatePostPage = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create New Post
      </Typography>
      <CreateItemForm />
    </Container>
  );
};

export default CreatePostPage;
