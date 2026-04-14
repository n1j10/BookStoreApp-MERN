import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';
import AddBook from './components/admin/AddBook';
import AllBooks from './components/admin/AllBooks';

function App() {

  const location = useLocation()

  const hideHeader = /^\/admin(\/|$)/.test(location.pathname)
  return (
    <div >
       {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element = {  <Home/>}/>


          <Route  path="/admin" element={<AdminLayout />}>
           <Route path="/add-book" element={<AddBook />} />  
            <Route index  path="books" element={<AllBooks />} /> 

          </Route>
      
        </Routes>
    </div>
  );
}

export default App;
