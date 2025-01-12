import { Box, LayoutDashboard } from 'lucide-react';
import Header from '../Header';
import { useAppDispatch, useAppSelector } from '@/slices/hook';
import { useEffect } from 'react';
import axios from 'axios';
import { setProducts } from '@/slices/product/productSlice';

function Product() {
  const data = [
    {
      id: 1,
      name: 'John Doe',
      image:
        'https://in.images.search.yahoo.com/images/view;_ylt=AwrKBwkNi4NnBVUulhC9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzgxMzhmNzk1MGRhMDMwY2VkNWY1YzYxMjY5NDIwOWJiBGdwb3MDNDYEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dprofile%2Bpic%26type%3DE210IN826G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D46&w=800&h=800&imgurl=www.pngall.com%2Fwp-content%2Fuploads%2F5%2FUser-Profile-PNG-High-Quality-Image.png&rurl=http%3A%2F%2Fwww.pngall.com%2Fprofile-png%2Fdownload%2F51525&size=132KB&p=profile+pic&oid=8138f7950da030ced5f5c612694209bb&fr2=piv-web&fr=mcafee&tt=User+Profile+PNG+High+Quality+Image+%7C+PNG+All&b=0&ni=21&no=46&ts=&tab=organic&sigr=dg3k2Vt9jFFq&sigb=j_3PkGRResCh&sigi=RmG4G5eL8bi5&sigt=zSLFuPGICNYH&.crumb=o/003QsGLCK&fr=mcafee&fr2=piv-web&type=E210IN826G0',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      image: 'https://via.placeholder.com/40',
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Sam Wilson',
      image: 'https://via.placeholder.com/40',
      status: 'Active',
    },
  ];
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
              <tr className="bg-gray-100 text-left">
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
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
                      Edit
                    </button>
                    <button className="ml-2 px-3 py-1 text-white bg-gray-500 rounded hover:bg-gray-600">
                      Delete
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

export default Product;
