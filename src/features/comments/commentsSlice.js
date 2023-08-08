import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../api/axios.js";

const COMMENTS_URL = "/comments"

const initialState = {
  comments: [],
  status: "idle",
  error: null
}

export const addNewComment = createAsyncThunk('comments/addNewComment', async ({comment, id, user}) => {
  const response = await axiosPrivate.post(`${COMMENTS_URL}/${id}`, { comment, user })
  console.log(response.data)
  return response.data
})

export const getPostComments = createAsyncThunk('comments/getPostComments', async (id) => {
  const response = await axiosPrivate.get(`${COMMENTS_URL}/${id}`)
  return response.data
})

export const updateComment = createAsyncThunk('comments/updateComment', async (initialComment) => {
   // const { id, comment } = initialComment;
  try {
    const response = await axiosPrivate.patch(COMMENTS_URL, initialComment)
    console.log(response.data)
    return response.data
  } catch (err) {
    console.error(err)
  }
})

export const deleteComment = createAsyncThunk('comments/deleteComment', async ( id ) => {
  try {
    console.log( id )
    const response = await axiosPrivate.delete(COMMENTS_URL, { data: { id } })
    return response.data
  } catch (err) {
    console.error(err)
  }
})


const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.comments.push(action.payload)
      })
      .addCase(getPostComments.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getPostComments.fulfilled, (state, action) => {
        state.comments = action.payload
        state.status = "succeeded"
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        if (!action.payload?._id) {
          console.log("update could not be complete")
          return;
        }
        const { _id } = action.payload
        const comments = state.comments.filter(comment => comment._id !== _id);
        state.comments = [...comments, action.payload];
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter((comment) => comment._id !== action.payload.id)
      })
  }
})

export const selectComments = (state) => state.comments.comments;
export const getCommentsStatus = (state) => state.comments.status;

export default commentsSlice.reducer