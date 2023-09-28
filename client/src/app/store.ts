import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterReducer";
import user from "../features/Auth/userReducer";
import organizations from "../features/Organizations/organizationSlice";

export const store = configureStore({
  reducer: { user, organizations, counterReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
