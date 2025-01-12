export type Category = {
  name: string;
  status: string;
  id: string;
  image: string;
};

export type SubCategory = {
  id: string;
  name: string;
  status: string;
  category: Category;
  products: Product[];
};

export type Product = {
  name: string;
  id: string;
  image: string;
  status: string;
  category: Category;
  subcategory: SubCategory;
};
