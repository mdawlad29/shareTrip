import { createSlice } from "@reduxjs/toolkit";

interface IProductSlice {
  cartItems: any[]|null;
}

const initialState: IProductSlice = {
  cartItems: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProduct: () => initialState,

    setCartItems:(state,action) => {
      state.cartItems = action.payload;
    },
  },
});

export const {
  clearProduct,
  setCartItems
} = productSlice.actions;

export default productSlice.reducer;