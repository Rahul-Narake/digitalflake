import { ICategory } from '@/slices/category/categorySlice';
import axios from 'axios';
import React, { useState } from 'react';

function useAddCategory() {
  const [loading, setLoading] = useState(false);

  const addCategory = async ({
    name,
    categoryImage,
  }: {
    name: string;
    categoryImage: File;
  }) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('categoryImage', categoryImage);
      formData.append('status', 'active');
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/category/`,
        formData
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, addCategory };
}

export default useAddCategory;
