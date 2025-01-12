import { Request, Response } from 'express';
import {
  ISubcategory,
  Subcategory,
} from '../models/subcategory/subcategory.model';
import { ApiError } from '../utils/ApiError';
import {
  addSubCategory,
  deleteSubcategory,
  editSubcategory,
  getAllSubcategories,
} from '../services/subcategory.services';
import uploadOnCloudinary from '../utils/cloudinary';
import { ApiResponse } from '../utils/ApiResponse';

export const addSubCategoryHandler = async (req: Request, res: Response) => {
  try {
    const reqBody: ISubcategory = await req.body;
    if (!reqBody.name || !reqBody.category || !req.file) {
      res.status(400).json(new ApiError(400, 'All feilds required'));
    }
    const imageFilePath = req?.file?.path;
    const response = await uploadOnCloudinary(imageFilePath!);
    if (response) {
      const subcategory = await addSubCategory(reqBody, response.secure_url);
      res
        .status(201)
        .json(
          new ApiResponse(201, subcategory, 'Subcategory added successfully')
        );
    } else {
      res.status(400).json(new ApiError(400, 'Error while uploading image'));
    }
  } catch (error) {
    console.log(error);
    throw new ApiError(500, 'Internal server error');
  }
};

export const editSubcategoryHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reqBody: ISubcategory = await req.body;
    if (!reqBody.name || !reqBody.category || !reqBody.status) {
      res.status(400).json(new ApiError(400, 'All feilds required'));
    }
    const subcategory = await Subcategory.findById(id);
    if (req.file) {
      const imagePath = req.file.path;
      const response = await uploadOnCloudinary(imagePath);
      const updatedSubcategory = await editSubcategory(
        reqBody,
        id,
        response?.secure_url!
      );
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedSubcategory,
            'subcategory updated successfully'
          )
        );
    } else {
      const updatedSubcategory = await editSubcategory(
        reqBody,
        id,
        subcategory?.image!
      );
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedSubcategory,
            'Subcategory updated successfully'
          )
        );
    }
  } catch (error) {
    throw new ApiError(500, 'Internal server error');
  }
};

export const deleteSubcategoryHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteSubcategory(id);
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { subcategoryId: id },
          'Subcategory deleted successfully'
        )
      );
  } catch (error) {
    throw new ApiError(500, 'Internal server error');
  }
};

export const getAllSubcategoriesHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const subcategories = await getAllSubcategories();
    res.status(200).json(
      new ApiResponse(
        200,
        subcategories.map((s) => {
          return {
            id: s.id,
            name: s.name,
            category: s.category,
            status: s.status,
            image: s.image,
          };
        }),
        'Subcategories fetched successfully'
      )
    );
  } catch (error) {
    throw new ApiError(500, 'Internal server error');
  }
};
