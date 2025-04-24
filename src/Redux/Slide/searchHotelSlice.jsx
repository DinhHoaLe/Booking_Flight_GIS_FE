import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../../API/APIService";

const searchHotelSlice = createSlice({
  name: "searchHotel",
  initialState: {
    searchHotelData: {}, 
    resultHotelData: {}, 
    status: "idle", // Trạng thái: idle, loading, succeeded, failed
    error: null, // Lỗi nếu có
  },
  reducers: {
    setSearchHotelData: (state, action) => {
      state.searchHotelData = action.payload;
    },
    setResultHotelData: (state, action) => {
      state.resultHotelData = action.payload;
    },
  },
});

export const { setSearchHotelData, setResultHotelData } =
  searchHotelSlice.actions;
export default searchHotelSlice.reducer;
