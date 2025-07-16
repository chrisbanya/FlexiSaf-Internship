import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import ApiDemo from "./components/apiDemo";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import Navbar from "./components/layout/Navbar";
import { ItemListContext } from "./components/contexts/itemListContext";
import { CreateItemContext } from "./components/contexts/createItemContext";
import { ErrorContext } from "./components/contexts/errorContext";
import { useApi } from "../src/hooks/useApi";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    h3: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Disable uppercase transformation
        },
      },
    },
  },
});

function App() {
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ErrorContext.Provider value={{ error, clearError }}>
          <ItemListContext.Provider
            value={{ items, loading, fetchItems, deleteItem, updateItem }}
          >
            <CreateItemContext.Provider value={{ createItem, loading }}>
              <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Navigate to="/posts" />} />
                  <Route path="/posts" element={<ApiDemo />} />
                  <Route path="/posts/new" element={<CreatePostPage />} />
                  <Route path="/posts/:postId" element={<PostDetailsPage />} />
                  <Route
                    path="/posts/:postId/edit"
                    element={<EditPostPage />}
                  />
                </Routes>
              </Box>
            </CreateItemContext.Provider>
          </ItemListContext.Provider>
        </ErrorContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
