import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div >
      <Header/>
      <Routes>
        <Route path="/" element = {  <Home/>}/>


          <Route  path="/admin" element={<AdminLayout />}>
           <Route path="add-book" element={<AddBook />} />  
            <Route index  path="books" element={<AllBooks />} /> 

          </Route>
      
        </Routes>
    </div>
  );
}

export default App;
