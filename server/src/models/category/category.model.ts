import mongoose, { Document, Schema, Types } from 'mongoose';

enum CategoryState {
  active = 'active',
  inactive = 'inactive',
}

export interface ICategory extends Document {
  name: string;
  image?: string;
  subcategories?: Types.ObjectId[];
  status: CategoryState;
  products: Types.ObjectId[];
}

const categorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: Object.values(CategoryState),
        message: 'Category status value is incorrect',
      },
      required: true,
    },
    subcategories: [{ type: Schema.Types.ObjectId, ref: 'Subcategory' }],
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategory>('Category', categorySchema);
