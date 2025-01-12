import { Category, ICategory } from '../models/category/category.model';

export const addCategory = async (catagoryData: ICategory, image: string) => {
  const category = new Category({ ...catagoryData, image });
  return await category.save();
};

export const updateCategory = async (categoryData: ICategory, id: string) => {
  const category = await Category.findByIdAndUpdate(
    id,
    {
      $set: {
        name: categoryData.name,
        status: categoryData?.status,
      },
    },
    { new: true }
  );
  return category;
};

export const updateCategoryWithImage = async (
  categoryData: ICategory,
  image: string,
  id: string
) => {
  const category = await Category.findByIdAndUpdate(
    id,
    {
      $set: {
        name: categoryData.name,
        status: categoryData?.status,
        image,
      },
    },
    { new: true }
  );
  return category;
};

export const deleteCategory = async (id: string) => {
  return await Category.findByIdAndDelete(id);
};

export const getAllCategories = async () => {
  return await Category.find();
};
