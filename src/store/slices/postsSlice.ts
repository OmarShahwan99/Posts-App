import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/instance";
import { PostsModel, PostsState } from "../../types/post";

const initialState: PostsState = {
  posts: null,
  status: "idle",
  error: null,
};

// @ts-ignore
export const fetchPosts: any = createAsyncThunk<PostsModel, void>(
  "blogs/fetchPosts",
  async ({ perPage, page }: any) => {
    let url = `/posts/search?limit=${perPage}&skip=${page}`;

    const response = await axiosInstance.get(url);
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<PostsModel>) => {
          state.posts = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default postsSlice.reducer;
