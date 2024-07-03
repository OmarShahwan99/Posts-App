import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  AuthState,
  SignInPayload,
  SignUpPayload,
  AuthResponse,
} from "../../types/auth";

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user")!) ?? null,
  token: localStorage.getItem("accessToken"),
  status: "idle",
  error: null,
};

export const signIn = createAsyncThunk<AuthResponse, SignInPayload>(
  "auth/signIn",
  async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const token = await userCredential.user.getIdToken();
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(userCredential.user));

    return { user: userCredential.user, token };
  }
);

export const signUp = createAsyncThunk<AuthResponse, SignUpPayload>(
  "auth/signUp",
  async ({ email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(userCredential.user));
    return { user: userCredential.user, token };
  }
);

export const signOutUser = createAsyncThunk<void, void>(
  "auth/signOut",
  async () => {
    await signOut(auth);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        signIn.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.status = "succeeded";
        }
      )
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        signUp.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.status = "succeeded";
        }
      )
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(signOutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = "idle";
      });
  },
});
export const { resetError } = authSlice.actions;

export default authSlice.reducer;
