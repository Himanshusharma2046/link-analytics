import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import linkService from '../../services/linkService'

const initialState = {
  links: [],
  currentLink: null,
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
      const token = thunkAPI.getState().auth.user.token
      return await linkService.createLink(linkData, token)
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
      const token = thunkAPI.getState().auth.user.token
      return await linkService.getLinks(token)
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

// Get link by ID
export const getLinkById = createAsyncThunk(
  'links/getById',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await linkService.getLinkById(id, token)
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
  name: 'link',
  initialState,
  reducers: {
    reset: (state) => initialState,
    clearCurrentLink: (state) => {
      state.currentLink = null
    },
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
        state.currentLink = action.payload
      })
      .addCase(getLinkById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, clearCurrentLink } = linkSlice.actions
export default linkSlice.reducer
