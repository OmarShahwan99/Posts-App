import { Card, CardContent, Skeleton, Stack, Box } from "@mui/material";

const PostCardSkeleton = () => {
  return (
    <Card
      style={{
        marginBottom: "1em",
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "270px",
        }}
      >
        <Box>
          <Skeleton variant="text" width="100%" height={40} />
          <Skeleton variant="text" width="20%" height={40} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="100%" height={20} />
        </Box>
        <Stack
          mt={2}
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Skeleton variant="rounded" width={60} height={24} />
            <Skeleton variant="rounded" width={60} height={24} />
            <Skeleton variant="rounded" width={60} height={24} />
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width={20} height={24} />
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width={20} height={24} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PostCardSkeleton;
