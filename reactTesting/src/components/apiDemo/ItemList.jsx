import { Box, Typography, Button, Stack, Divider, Paper } from "@mui/material";
import { Refresh, List } from "@mui/icons-material";

import ItemCard from "./ItemCard";
import LoadingSpinner from "../common/LoadingSpinner";
import { useContext } from "react";
import { ItemListContext } from "../contexts/itemListContext";

const ItemList = () => {
  const { items, fetchItems, loading } = useContext(ItemListContext);
  return (
    <Box>
      {/* Header with refresh button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <List color="primary" />
          <Typography variant="h6">Items ({items.length})</Typography>
        </Box>
        <Button
          onClick={fetchItems}
          disabled={loading}
          variant="contained"
          startIcon={<Refresh />}
        >
          {loading ? "Loading..." : "Refresh (GET)"}
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Loading state for initial load */}

      {loading && items.length === 0 && (
        <Paper elevation={0} sx={{ p: 4, textAlign: "center" }}>
          <LoadingSpinner size="large" text="Loading items..." />
        </Paper>
      )}

      {/* Items */}

      <Stack spacing={2}>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            // onUpdate={onUpdate}
            // onDelete={onDelete}
            // loading={loading}
          />
        ))}
      </Stack>

      {/* Empty state */}
      {!loading && items.length === 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            bgcolor: "grey.50",
            border: "2px dashed",
            borderColor: "grey.300",
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No items found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create your first item using the form above!
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ItemList;
