import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: 'loading',
  error: '',
  country: [],
};

export const getCountries = createAsyncThunk(
  'country/getCountries',
  async (_, { rejectWithValue }) => {
    try {
      
      // Option 1 : tout sur une seule ligne
const { data } = await axios.get('https://restcountries.com/v3.1/all?fields=name,capital,region,subregion,population,area,languages,currencies,flags,maps');

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
       changeStatus : (stat, action) => {
            stat.status = action.payload
        }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.status = "";
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.country = action.payload;
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default countrySlice.reducer;
export const { changeStatus}   = countrySlice.actions