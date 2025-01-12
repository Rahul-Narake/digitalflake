import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../category/categorySlice';

export enum Status {
  active = 'active',
  inactive = 'inactive',
}

export interface ISubcategory {
  id: string;
  name: string;
  image: string;
  status: Status;
  category: ICategory;
}

type SubcategoryStateType = {
  subcategories: ISubcategory[];
};

const initialState: SubcategoryStateType = {
  subcategories: [],
};

export const subcategorySlice = createSlice({
  name: 'subcategory',
  initialState,
  reducers: {
    setsubcategories: (state, action: PayloadAction<ISubcategory[]>) => {
      state.subcategories = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setsubcategories } = subcategorySlice.actions;

export default subcategorySlice.reducer;
