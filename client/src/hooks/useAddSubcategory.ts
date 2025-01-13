import axios from 'axios';
import React, { useState } from 'react';

function useAddSubcategory() {
  const [loading, setLoading] = useState(false);

  const addSubcategory = async ({
    name,
    subcategoryImage,
    category,
  }: {
    name: string;
    subcategoryImage: File;
    category: string;
  }) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('subcategoryImage', subcategoryImage);
      formData.append('category', category);
      formData.append('status', 'active');
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/subcategory/`,
        formData
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, addSubcategory };
}

export default useAddSubcategory;
