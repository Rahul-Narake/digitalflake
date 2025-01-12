import { Request, Response } from 'express';
import { Category, ICategory } from '../models/category/category.model';
import { ApiError } from '../utils/ApiError';
import uploadOnCloudinary from '../utils/cloudinary';
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
  updateCategoryWithImage,
} from '../services/category.services';
import { ApiResponse } from '../utils/ApiResponse';

export const addCategoryHandler = async (req: Request, res: Response) => {
  try {
    const reqBody: ICategory = await req.body;
    if (!reqBody.name || !reqBody.status || !req.file) {
      res.status(400).json(new ApiError(400, 'All feilds required'));
    }

    const imageFilePath = req.file?.path;

    if (!imageFilePath) {
      throw new ApiError(400, 'image required');
    }

    const videoOnCloudinary = await uploadOnCloudinary(imageFilePath);
    if (videoOnCloudinary) {
      const category = await addCategory(
        reqBody,
        videoOnCloudinary?.secure_url
      );
      res
        .status(201)
        .json(new ApiResponse(201, category, 'Category added successfully'));
    } else {
      res.status(400).json(new ApiError(400, 'Error while uploading image'));
    }
  } catch (error) {
    throw new ApiError(500, 'Internal server error');
  }
};

export const editCategoryHandler = async (req: Request, res: Response) => {
  try {
    const reqBody: ICategory = await req.body;
    const { id } = req.params;
    if (!reqBody.name || !reqBody.status) {
      res.status(400).json(new ApiError(400, 'All feilds required'));
    }
    const category = await Category.findById(id);
    if (!category) {
      res.status(400).json(new ApiError(400));
    }
    if (req.file) {
      const categoryImagePath = req.file.path;
      const response = await uploadOnCloudinary(categoryImagePath);
      if (response) {
        const category = await updateCategoryWithImage(
          reqBody,
          response?.secure_url,
          id
        );
        res.status(200).json(new ApiResponse(200, category));
      }
    } else {
      const category = await updateCategory(reqBody, id);
      res.status(200).json(new ApiResponse(200, category));
    }
  } catch (error) {
    throw new ApiError(500, 'Internal server error');
  }
};

export const deleteCategoryHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      throw new ApiError(400, 'Invalid category');
    }
    await deleteCategory(id);
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { categoryId: id },
          'category deleted successfully'
        )
      );
  } catch (error) {}
};

export const getAllCategoryHandler = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(
      new ApiResponse(
        200,
        categories.map((c) => {
          return { id: c.id, name: c.name, image: c.image, status: c.status };
        }),
        'Categories fetched successfully'
      )
    );
  } catch (error) {
    throw new ApiError(500, 'Internal server error');
  }
};
