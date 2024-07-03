export interface PostModel {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}
export interface PostsModel {
  posts: PostModel[];
  limit: 30;
  skip: 0;
  total: 251;
}

export interface PostsState {
  posts: PostsModel | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
