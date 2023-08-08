import authReducer from "../features/auth/authSlice"
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice"
import postsReducer from "../features/posts/postsSlice"
import commentsReducer from "../features/comments/commentsSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers(
  {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    auth: authReducer
  }
);

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store)