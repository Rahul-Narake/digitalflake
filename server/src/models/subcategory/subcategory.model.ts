import mongoose, { Document, Schema } from 'mongoose';

enum SubcategoryType {
  active = 'active',
  inactive = 'inactive',
}

export interface ISubcategory extends Document {
  name: string;
  category: mongoose.Types.ObjectId;
  image?: string;
  status?: SubcategoryType;
  products?: mongoose.Types.ObjectId[];
}

const subcategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      enum: {
        values: Object.values(SubcategoryType),
        message: 'status value not supported',
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

export const Subcategory = mongoose.model<ISubcategory>(
  'Subcategory',
  subcategorySchema
);
