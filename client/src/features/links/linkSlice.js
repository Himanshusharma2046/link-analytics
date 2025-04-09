import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import linkService from '../../services/linkService'

const initialState = {
  links: [],
  link: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new link
export const createLink = createAsyncThunk(
  'links/create',
  async (linkData, thunkAPI) => {
    try {
      return await linkService.createLink(linkData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user links
export const getLinks = createAsyncThunk(
  'links/getAll',
  async (_, thunkAPI) => {
    try {
      return await linkService.getLinks()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get link by id
export const getLinkById = createAsyncThunk(
  'links/getById',
  async (linkId, thunkAPI) => {
    try {
      return await linkService.getLinkById(linkId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const linkSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLink.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createLink.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.links.push(action.payload)
      })
      .addCase(createLink.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getLinks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getLinks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.links = action.payload
      })
      .addCase(getLinks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getLinkById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getLinkById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.link = action.payload
      })
      .addCase(getLinkById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = linkSlice.actions
export default linkSlice.reducer
