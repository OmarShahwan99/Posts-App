import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Grid, Box } from "@mui/material";

import { AppDispatch, RootState } from "../store/store";
import { fetchPosts } from "../store/slices/postsSlice";
import usePagination from "../utils/use-pagination";
import { useInView } from "react-intersection-observer";
import { PostModel } from "../types/post";
import PostCard from "../components/Posts/PostCard";
import PostCardSkeleton from "../components/Posts/PostCardSkeleton";
import PostsHeader from "../components/Posts/PostsHeader";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const posts = useSelector((state: RootState) => state.posts);
  const { page, perPage, setPage } = usePagination(8);

  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const [myPosts, setMyPosts] = useState<PostModel[]>([]);

  const [ref, inView] = useInView();

  const hasMore = myPosts.length < posts?.posts?.total!;

  useEffect(() => {
    if (hasMore && inView) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore]);

  useEffect(() => {
    if (posts.posts) {
      setMyPosts((prev) => [...prev, ...posts.posts?.posts!]);
    }
  }, [page]);

  useEffect(() => {
    dispatch(fetchPosts({ perPage, page }));
  }, [dispatch, page, perPage]);

  const handleLayoutChange = (_: any, newLayout: "grid" | "list") => {
    if (newLayout !== null) {
      setLayout(newLayout);
    }
  };

  const breakPoints =
    layout === "grid"
      ? {
          xs: 12,
          md: 6,
          lg: 4,
          xl: 3,
        }
      : {
          xs: 12,
        };

  return (
    <Container component="main" maxWidth="lg" sx={{ py: 8 }}>
      <PostsHeader
        total={posts.posts?.total}
        layout={layout}
        handleLayoutChange={handleLayoutChange}
      />

      <Grid container spacing={3}>
        {myPosts.map((post) => (
          <Grid item {...breakPoints} key={post.id}>
            <PostCard layout={layout} post={post} />
          </Grid>
        ))}
        {posts.status === "loading" &&
          Array.from(new Array(10)).map((_, index) => (
            <Grid item {...breakPoints} key={index}>
              <PostCardSkeleton />
            </Grid>
          ))}
      </Grid>

      {posts.status !== "loading" && <Box ref={ref}></Box>}

      {posts.status === "failed" && (
        <Typography color="error">{posts.error}</Typography>
      )}
    </Container>
  );
};

export default HomePage;
