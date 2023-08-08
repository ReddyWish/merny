import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../api/axios.js";

const POSTS_URL = "/posts"

const initialState = {
  posts: [],
  status: "idle",
  error: null
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axiosPrivate.get("/posts")
  return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  const response = await axiosPrivate.post(POSTS_URL, initialPost, { headers: { "Content-Type": "multipart/form-data" } })
  console.log(response.data)
  return response.data
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
  try {
    const response = await axiosPrivate.patch(POSTS_URL, initialPost, { headers: { "Content-Type": "multipart/form-data" } })
    console.log(response.data)
    return response.data
  } catch (err) {
    console.error(err)
  }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  console.log(id)
  try {
    const { data } = await axiosPrivate.delete(`${POSTS_URL}/${id}`, id)
    return data
     } catch (err) {
    console.error(err)
  }
})


const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        console.log(action.payload)
        state.posts.push(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        console.log(action.payload)
        if (!action.payload?._id) {
          console.log("update could not be complete")
          return;
        }
        console.log(action.payload)
        const { _id } = action.payload
        const posts = state.posts.filter(post => post._id !== _id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload.id)
      })
  }
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const selectPostById = (state, id) =>
  state.posts.posts.find(post => post._id === id)

export default postsSlice.reducer