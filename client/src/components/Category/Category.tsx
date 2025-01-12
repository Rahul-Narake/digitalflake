import { FilePenLine, LayoutDashboard, Trash } from 'lucide-react';
import Header from '../Header';
import { useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/slices/hook';
import { setCategories } from '@/slices/category/categorySlice';

function Category() {
  const categories = useAppSelector((state) => state.category.categories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}/category/`
      );
      return data.data;
    };
    getCategories().then((d) => {
      console.log(d);
      dispatch(setCategories(d));
    });
  }, []);

  return (
    <div className="flex flex-col p-4">
      <Header logo={<LayoutDashboard />} name="Category" path="/add-category" />

      {categories && (
        <div className="overflow-x-auto p-4">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border-b border-gray-200">ID</th>
                <th className="py-2 px-4 border-b border-gray-200">Name</th>
                <th className="py-2 px-4 border-b border-gray-200">Image</th>
                <th className="py-2 px-4 border-b border-gray-200">Status</th>
                <th className="py-2 px-4 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item, i) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-200">
                    {i + 1}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {item.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <span
                      className={`px-2 py-1 text-sm rounded ${
                        item.status === 'active'
                          ? ' text-green-700'
                          : ' text-red-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button className="px-3 py-1 text-gray-500 ">
                      <FilePenLine />
                    </button>
                    <button className="ml-2 px-3 py-1 text-gray-500 ">
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Category;
