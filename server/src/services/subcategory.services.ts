import { Category } from '../models/category/category.model';
import {
  ISubcategory,
  Subcategory,
} from '../models/subcategory/subcategory.model';

export const addSubCategory = async (data: ISubcategory, image: string) => {
  try {
    const category = await Category.findById(data.category);
    const newSubcategory = new Subcategory({
      name: data?.name,
      category: category?.id,
      image,
      status: 'active',
    });
    const savedSubcategory = await newSubcategory.save();

    category?.subcategories?.push(savedSubcategory.id);
    await category!.save();

    return savedSubcategory;
  } catch (error) {
    console.error('Error adding subcategory:', error);
    return null;
  }
};

export const editSubcategory = async (
  data: ISubcategory,
  id: string,
  image: string
) => {
  const subcategory = await Subcategory.findById(id);
  if (subcategory?.category != data.category) {
    const oldCategory = await Category.findById(data.category);
    const newSubcategories = oldCategory?.subcategories?.filter(
      (c) => String(c._id) !== id
    );
    await Category.findByIdAndUpdate(oldCategory?._id, {
      $set: { subcategories: newSubcategories },
    });

    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      id,
      {
        $set: {
          name: data?.name,
          category: data?.category,
          image,
          status: data?.status,
        },
      },
      { new: true }
    );
    const newCategory = await Category.findById(data?.category);
    newCategory?.subcategories?.push(subcategory?.id);
    await newCategory?.save();
    return updatedSubcategory;
  } else {
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      id,
      {
        $set: {
          name: data?.name,
          category: data?.category,
          status: data?.status,
          image,
        },
      },
      { new: true }
    );
    return updatedSubcategory;
  }
};

export const deleteSubcategory = async (id: string) => {
  return await Subcategory.findByIdAndDelete(id);
};

export const getAllSubcategories = async () => {
  return await Subcategory.find().populate('category');
};
