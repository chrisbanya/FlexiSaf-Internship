
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={RouterLink} to="/posts/new">
          Create
        </Button>
        <Button color="inherit" component={RouterLink} to="/posts">
          Posts
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
