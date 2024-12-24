import { createSlice } from "@reduxjs/toolkit";

interface IHelperSlice {
  previewImage: string | null;
  uploadedFile: unknown | null;
  isToggleSidebar: boolean;
}

const initialState: IHelperSlice = {
  previewImage: null,
  uploadedFile: null,
  isToggleSidebar: false,
};

const helperSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {
    clearHelper: () => initialState,

    
  },
});

export const {
  clearHelper,
} = helperSlice.actions;

export default helperSlice.reducer;