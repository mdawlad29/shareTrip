import { createSlice } from "@reduxjs/toolkit";

interface IProductSlice {
  isLoading: boolean;
}

const initialState: IProductSlice = {
  isLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProduct: () => initialState,

    
  },
});

export const {
  clearProduct,
} = productSlice.actions;

export default productSlice.reducer;