import express from 'express';
import upload from '../middleware/multer.middelware';
import {
  addProductHandler,
  deleteProductHandler,
  editProductHandler,
  getAllProductsHandler,
} from '../controllers/product.controller';
import protectRoute from '../middleware/protectRoute';
const router = express.Router();

router
  .route('/')
  .post(protectRoute, upload.single('productImage'), addProductHandler)
  .get(protectRoute, getAllProductsHandler);
router
  .route('/:id')
  .patch(protectRoute, editProductHandler)
  .delete(protectRoute, deleteProductHandler);
router
  .route('/edit/:id')
  .patch(protectRoute, upload.single('productImage'), editProductHandler);

export default router;
