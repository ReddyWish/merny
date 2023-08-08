import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../api/axios.js";

const initialState = {
  users: [],
  status: "idle",
  error: null,
  userPosts: []
}

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axiosPrivate.get("/users")
  return response.data
})

export const getUserPosts = createAsyncThunk("users/getUserPosts", async (userId) => {
  const response = await axiosPrivate.get(`/users/${userId}`);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  try {
    console.log(id)
    const { data } = await axiosPrivate.delete("/users", { data: id } )
    return data
  } catch (err) {
    console.error(err)
  }
})

export const updateUser = createAsyncThunk('users/updateUser', async (initialUser) => {
  try {
    const { data } = await axiosPrivate.patch("/users", initialUser, { headers: { "Content-Type": "multipart/form-data" } } )
    return data
  } catch (err) {
    console.error(err)
  }
})

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deletePostOfTheUser(state, action) {
      state.userPosts = state.userPosts.filter(userPost => userPost._id !== action.payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.users = action.payload
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userPosts = action.payload.posts;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload.id);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { _id } = action.payload
        const users = state.users.filter(user => user._id !== _id);
        state.users = [...users, action.payload];
      })
  }
})

export const selectAllUsers = (state) => state.users.users;
export const { deletePostOfTheUser } = usersSlice.actions

export const selectUsersPosts = (state) => state.users.userPosts;
export const getStatus = (state) => state.users.status;
export const getError = (state) => state.users.error;

export const selectUserById = (state, id) =>
  state.users.users.find(user => user._id === id)

export default usersSlice.reducer
