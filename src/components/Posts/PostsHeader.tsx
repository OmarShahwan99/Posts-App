import {
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";

const PostsHeader = ({
  total,
  layout,
  handleLayoutChange,
}: {
  total: number | undefined;
  layout: "grid" | "list";
  handleLayoutChange: (_: any, newLayout: "grid" | "list") => void;
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      mb={2}
      flexWrap="wrap"
      gap={2}
    >
      <Box>
        <Typography variant="h4" component="span" mr={1}>
          Posts
        </Typography>
        <Typography variant="body2" component="span" color="#777">
          ({total} Posts found for you)
        </Typography>
      </Box>

      <ToggleButtonGroup
        value={layout}
        exclusive
        onChange={handleLayoutChange}
        aria-label="layout"
      >
        <ToggleButton value="grid" aria-label="grid layout">
          <ViewModuleIcon />
        </ToggleButton>
        <ToggleButton value="list" aria-label="list layout">
          <ViewListIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

export default PostsHeader;
