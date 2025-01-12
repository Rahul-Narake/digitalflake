import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Status {
  active = 'active',
  inactive = 'inactive',
}

export interface ICategory {
  id: string;
  name: string;
  image: string;
  status: Status;
}

type CategoryStateType = {
  categories: ICategory[];
};

const initialState: CategoryStateType = {
  categories: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
