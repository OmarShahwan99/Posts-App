import { ThumbDownOutlined, ThumbUpOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { PostModel } from "../../types/post";
import Truncate from "../../utils/truncate";

const PostCard = ({
  post,
  layout,
}: {
  post: PostModel;
  layout: "grid" | "list";
}) => {
  return (
    <Card
      sx={{
        "&:hover": {
          transform: "translateY(-5px)",
        },
        transition: "transform .3s ease",
        animation: "slideFadeIn 1s ease-out",
        "@keyframes slideFadeIn": {
          "0%": {
            opacity: 0,
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: layout === "grid" ? "270px" : "auto",
        }}
      >
        <Box>
          <Typography variant="h5">{post.title}</Typography>
          <Typography mt={1} variant="body1" color="#777">
            <Truncate>{post.body}</Truncate>
          </Typography>
        </Box>
        <Stack
          mt={2}
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            {post.tags.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <ThumbUpOutlined fontSize="small" />
            <Typography variant="body2">{post.reactions.likes}</Typography>
            <ThumbDownOutlined fontSize="small" />
            <Typography variant="body2">{post.reactions.dislikes}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PostCard;
