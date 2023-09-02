import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterReducer";
import user from "../features/Auth/userReducer";

export const store = configureStore({
  reducer: { user, counterReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
