import { Category } from '../models/category/category.model';
import { IProduct, Product } from '../models/product/product.model';
import { Subcategory } from '../models/subcategory/subcategory.model';

export const addProduct = async (data: IProduct, image: string) => {
  const category = await Category.findById(data?.category);
  const subcategory = await Subcategory.findById(data?.subcategory);
  if (!category || !subcategory) {
    return null;
  }

  const newProduct = new Product({ ...data, image });
  const product = await newProduct.save();
  category.products.push(product.id);
  await category.save();
  subcategory.products?.push(product.id);
  await subcategory.save();
  return product;
};

export const editProduct = async (
  data: IProduct,
  image: string,
  id: string
) => {
  const product = await Product.findById(id);
  if (product && product?.category != data.category) {
    const oldCategory = await Category.findById(product?.category);
    const newCategory = await Category.findById(data?.category);
    const oldCategoryProducts = oldCategory?.products.filter(
      (p) => p.id.toString() != id
    );
    await Category.findByIdAndUpdate(oldCategory?.id, {
      $set: { products: oldCategoryProducts },
    });
    newCategory?.products.push(product.id);
    await newCategory?.save();
  }
  if (product && product.subcategory != data.subcategory) {
    const oldSubcategory = await Subcategory.findById(product?.subcategory);
    const newSubCategory = await Subcategory.findById(data?.subcategory);
    const oldSubcategoryProducts = oldSubcategory?.products?.filter(
      (p) => p.id.toString() != product.id
    );
    await Subcategory.findByIdAndUpdate(oldSubcategory?.id, {
      $set: { products: oldSubcategoryProducts },
    });
    newSubCategory?.products?.push(product?.id);
    await newSubCategory?.save();
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        name: data?.name,
        category: data?.category,
        subcategory: data?.subcategory,
        image,
        status: data?.status,
      },
    },
    { new: true }
  );
  return updatedProduct;
};

export const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

export const getAllProducts = async () => {
  return await Product.find().populate('category');
};
