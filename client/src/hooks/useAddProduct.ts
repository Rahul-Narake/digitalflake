import axios from 'axios';
import React, { useState } from 'react';

function useAddProduct() {
  const [loading, setLoading] = useState(false);

  const addProduct = async ({
    name,
    productImage,
    category,
    subcategory,
  }: {
    name: string;
    productImage: File | null;
    category: string;
    subcategory: string;
  }) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('productImage', productImage!);
      formData.append('category', category);
      formData.append('subcategory', subcategory);
      formData.append('status', 'active');
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/product/`,
        formData
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, addProduct };
}

export default useAddProduct;
