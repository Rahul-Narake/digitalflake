import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../category/categorySlice';

export enum Status {
  active = 'active',
  inactive = 'inactive',
}

export interface IProduct {
  id: string;
  name: string;
  image: string;
  status: Status;
  category: ICategory;
  subcategory: ICategory;
}

type ProductStateType = {
  products: IProduct[];
};

const initialState: ProductStateType = {
  products: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
