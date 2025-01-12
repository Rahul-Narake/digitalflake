import './App.css';
import { Route, Routes } from 'react-router';
import Signin from './pages/Signin';
import RootLayout from './components/layouts/RootLayout';
import CategoryPage from './pages/CategoryPage';
import SubcategoryPage from './pages/SubcategoryPage';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';
import AddCategoryPage from './pages/AddCategoryPage';
import AddSubcategoryPage from './pages/AddSubcategoryPage';
import AddProductPage from './pages/AddProductPage';
import Signup from './pages/Signup';

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<RootLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="category" element={<CategoryPage />}></Route>
        <Route path="subcategory" element={<SubcategoryPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="add-category" element={<AddCategoryPage />} />
        <Route path="add-subcategory" element={<AddSubcategoryPage />} />
        <Route path="add-product" element={<AddProductPage />} />
      </Route>
    </Routes>
  );
}

export default App;
