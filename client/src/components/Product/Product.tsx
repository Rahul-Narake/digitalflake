import { Box, FilePenLine, Trash } from 'lucide-react';
import Header from '../Header';
import { useAppDispatch, useAppSelector } from '@/slices/hook';
import { useEffect } from 'react';
import axios from 'axios';
import { setProducts } from '@/slices/product/productSlice';
import { Dialoge } from '../Dialoge';
import DeleteDialog from '../DeleteDialog';

function Product() {
  const products = useAppSelector((state) => state.product.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios(`${import.meta.env.VITE_BASE_URL}/product/`);
      return data.data;
    };
    getCategories().then((d) => {
      dispatch(setProducts(d));
    });
  }, []);
  return (
    <div className="flex flex-col p-4">
      <Header logo={<Box />} name="Product" path="/add-product" />

      {products && (
        <div className="overflow-x-auto p-4">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-yellow-100 text-left">
                <th className="py-2 px-4 border-b border-gray-200">ID</th>
                <th className="py-2 px-4 border-b border-gray-200">Name</th>
                <th className="py-2 px-4 border-b border-gray-200">Image</th>
                <th className="py-2 px-4 border-b border-gray-200">Status</th>
                <th className="py-2 px-4 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, i) => (
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
                  <td className="py-2 px-4 border-b border-gray-200 flex items-center justify-start">
                    <div className="px-3 py-1 text-gray-500 ">
                      <FilePenLine />
                    </div>
                    <div className="ml-2 px-3 py-1 pt-0 text-gray-500">
                      <Dialoge
                        buttonText={<Trash />}
                        children={
                          <DeleteDialog
                            onConfirm={async () => {
                              const { data } = await axios.delete(
                                `${import.meta.env.VITE_BASE_URL}/product/${
                                  item.id
                                }`
                              );
                              if (data.success) {
                                const updatedProducts = products.filter(
                                  (c) => c.id !== item.id
                                );
                                dispatch(setProducts(updatedProducts));
                              }
                            }}
                          />
                        }
                      />
                    </div>
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

export default Product;
