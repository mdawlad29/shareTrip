import { Store, combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import helperReducer from "./feature/helper/helperSlice";
import productReducer from "./feature/product/productSlice";
import { productService } from "@/services/product.service";

const combinedReducer = combineReducers({
  helper: helperReducer,
  product:productReducer,


  [productService.reducerPath.toString()]: productService.reducer
});

const persistConfig = {
  key: "root",
  storage,
  // whitelist: [],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      // serializableCheck: false,
      immutableCheck: { warnAfter: 128 },
      // immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([productService.middleware, productService.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<Store["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
