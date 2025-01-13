import express from 'express';
import upload from '../middleware/multer.middelware';
import {
  addCategoryHandler,
  deleteCategoryHandler,
  editCategoryHandler,
  getAllCategoryHandler,
} from '../controllers/category.controller';
import protectRoute from '../middleware/protectRoute';
const router = express.Router();

router
  .route('/')
  .post(protectRoute, upload.single('categoryImage'), addCategoryHandler)
  .get(getAllCategoryHandler);

router
  .route('/:id')
  .patch(protectRoute, editCategoryHandler)
  .delete(protectRoute, deleteCategoryHandler);
router
  .route('/edit/:id')
  .patch(protectRoute, upload.single('categoryImage'), editCategoryHandler);

export default router;
