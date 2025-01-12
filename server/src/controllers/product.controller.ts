import { Request, Response } from 'express';
import { IProduct, Product } from '../models/product/product.model';
import { ApiError } from '../utils/ApiError';
import uploadOnCloudinary from '../utils/cloudinary';
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
} from '../services/product.services';
import { ApiResponse } from '../utils/ApiResponse';

export const addProductHandler = async (req: Request, res: Response) => {
  try {
    const reqBody: IProduct = await req.body;
    if (
      !reqBody.name ||
      !reqBody.category ||
      !reqBody.subcategory ||
      !req.file
    ) {
      res.status(400).json(new ApiError(400, 'All feilds required'));
    }
    const productImagePath = req.file?.path;
    const response = await uploadOnCloudinary(productImagePath!);
    if (response) {
      const product = await addProduct(reqBody, response.secure_url);
      res
        .status(201)
        .json(new ApiResponse(201, product, 'Product added successfully'));
    } else {
      res.status(400).json(new ApiError(400, 'Error while uploading image'));
    }
  } catch (error) {
    throw new ApiError(500, 'Internal server error');
  }
};

export const editProductHandler = async (req: Request, res: Response) => {
  try {
    const reqBody: IProduct = await req.body;
    if (
      !reqBody.name ||
      !reqBody.category ||
      !reqBody.subcategory ||
      !reqBody.status
    ) {
      res.status(400).json(new ApiError(400, 'All feilds required'));
    }
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(400).json(new ApiError(400, 'Invalid product id'));
    }
    if (req.file) {
      const productImagePath = req.file.path;
      const response = await uploadOnCloudinary(productImagePath);
      const product = await editProduct(reqBody, response?.secure_url!, id);
      res
        .status(200)
        .json(new ApiResponse(200, product, 'Product updated successfully'));
    } else {
      const updatedProduct = await editProduct(reqBody, product?.image!, id);
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { product: updatedProduct },
            'Product updated successfully'
          )
        );
    }
  } catch (error) {
    throw new ApiError(500, 'Internal server error');
  }
};

export const deleteProductHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(400).json(new ApiError(400, 'Invalid product'));
    }
    await deleteProduct(id);
    res.status(200).json(new ApiResponse(200, 'Product deleted successfully'));
  } catch (error) {
    throw new ApiError(500, 'Internal server error');
  }
};

export const getAllProductsHandler = async (req: Request, res: Response) => {
  const products = await getAllProducts();
  console.log(products);
  res.status(200).json(
    new ApiResponse(
      200,
      products.map((p) => {
        return {
          id: p.id,
          name: p.name,
          category: p.category,
          subcategory: p.subcategory,
          status: p.status,
        };
      }),
      'Products fetched successfully'
    )
  );
};
