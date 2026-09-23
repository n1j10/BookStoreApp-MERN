import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import CartPage from '../pages/CartPage';
import BookDetailsPage from '../pages/BookDetailsPage';
import OnSaleProducts from '../features/books/components/OnSaleProducts';
import DiscountPercent from '../features/books/components/DiscountPercent';
import AdminLayout from '../features/admin/components/AdminLayout';
import AddBook from '../features/admin/components/AddBook';
import AllBooks from '../features/admin/components/AllBooks';
import UpdateBook from '../features/admin/components/UpdateBook';

export default function AppRouter() {
  return <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/on-sale" element={<OnSaleProducts />} />
    <Route path="/discount" element={<DiscountPercent />} />
    <Route path="/bookDetails/:id" element={<BookDetailsPage />} />
    <Route path="/admin" element={<AdminLayout />}>
      <Route path="add-book" element={<AddBook />} />
      <Route index element={<AllBooks />} />
      <Route path="update-book/:id" element={<UpdateBook />} />
    </Route>
  </Routes>;
}
