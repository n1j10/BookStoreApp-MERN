import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';
import AddBook from './components/admin/AddBook';
import AllBooks from './components/admin/AllBooks';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookDetails from './pages/BookDetails';
import { AuthProvider } from './auth/AuthContext';
import { CartProvider } from './auth/CartContext';
import CartPage from './pages/CartPage';
import UpdateBook from './components/admin/UpdateBook';
import DiscountPercent from './components/DiscountPercent';

import OnSaleProducts from './components/OnSaleProducts';
function App() {

  const location = useLocation()

  const hideHeader = /^\/admin(\/|$)/.test(location.pathname)
  return (
    <AuthProvider>
      <CartProvider>
       {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element = {  <Home/>}/>
        <Route path="/login" element = {  <Login/>}/>
        <Route path="/signup" element = {  <Signup/>}/>
       <Route path="/cart" element = {  <CartPage/>}/>

        <Route path="/on-sale" element = {  <OnSaleProducts/>}/>
 <Route path="/discount" element = {  <DiscountPercent/>}/>
        <Route path="/bookDetails/:id" element = {  <BookDetails/>}/>
          <Route  path="/admin" element={<AdminLayout />}>
          <Route path="add-book" element={<AddBook />} />  
           <Route index  element={<AllBooks />} /> 
           <Route path="/admin/update-book/:id"  element={<UpdateBook/>} /> 

          </Route>
      
        </Routes>
  
   </CartProvider>
    </AuthProvider>
  );
}

export default App;
