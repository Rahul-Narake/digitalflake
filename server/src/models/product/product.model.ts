import mongoose, { Schema, Document } from 'mongoose';

enum State {
  active = 'active',
  inactive = 'inactive',
}

export interface IProduct extends Document {
  name: string;
  category: mongoose.Types.ObjectId;
  subcategory: mongoose.Types.ObjectId;
  image?: string;
  status?: State;
}

const productSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    status: {
      type: String,
      enum: {
        values: Object.values(State),
        message: 'Product sttaus value should be active or inactive',
      },
      default: 'active',
    },
    category: { type: mongoose.Schema.Types.ObjectId, required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', productSchema);
