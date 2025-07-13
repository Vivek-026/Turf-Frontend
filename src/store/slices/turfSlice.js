import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  turfs: [],
  loading: false,
  error: null,
  selectedTurf: null,
  selectedLoading: false,
  selectedError: null,
};

export const fetchTurfs = createAsyncThunk(
  'turfs/fetchTurfs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/turfs');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch turfs');
    }
  }
);

export const createTurf = createAsyncThunk(
  'turfs/create',
  async (turfData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/turfs', turfData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create turf');
    }
  }
);

export const updateTurf = createAsyncThunk(
  'turfs/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/turfs/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update turf');
    }
  }
);

export const fetchTurf = createAsyncThunk(
  'turfs/fetchTurf',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/turfs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch turf details');
    }
  }
);

export const deleteTurf = createAsyncThunk(
  'turfs/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/turfs/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete turf');
    }
  }
);

export const updateSlotStatus = createAsyncThunk(
  'turfs/updateSlot',
  async ({ turfId, slotData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/turfs/${turfId}/slots`, slotData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update slot status');
    }
  }
);


const turfSlice = createSlice({
  name: 'turfs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedTurf: (state) => {
      state.selectedTurf = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTurfs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTurfs.fulfilled, (state, action) => {
        state.loading = false;
        state.turfs = action.payload;
      })
      .addCase(fetchTurfs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTurf.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTurf.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTurf = action.payload;
      })
      .addCase(fetchTurf.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelectedTurf } = turfSlice.actions;
export default turfSlice.reducer;
