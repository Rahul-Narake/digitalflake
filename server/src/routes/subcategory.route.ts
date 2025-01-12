import express from 'express';
import {
  addSubCategoryHandler,
  editSubcategoryHandler,
  getAllSubcategoriesHandler,
} from '../controllers/subcategory.controller';
import upload from '../middleware/multer.middelware';
import protectRoute from '../middleware/protectRoute';
const router = express.Router();

router
  .route('/')
  .post(protectRoute, upload.single('subcategoryImage'), addSubCategoryHandler)
  .get(protectRoute, getAllSubcategoriesHandler);
router.route('/:id').patch(protectRoute, editSubcategoryHandler);
router
  .route('/edit/:id')
  .patch(
    protectRoute,
    upload.single('subcategoryImage'),
    editSubcategoryHandler
  );
export default router;
