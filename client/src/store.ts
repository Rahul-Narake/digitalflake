import { configureStore } from '@reduxjs/toolkit';
import categorySlice from './slices/category/categorySlice';
import subcategorySlice from './slices/subcategory/subcategorySlice';
import productSlice from './slices/product/productSlice';

export const store = configureStore({
  reducer: {
    category: categorySlice,
    subcategory: subcategorySlice,
    product: productSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
