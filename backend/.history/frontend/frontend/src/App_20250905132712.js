import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import { Routes } from 'react-router-dom';

function App() {
  return (
    <div >
      <Header/>
      <Routes>
        <Routes path="/" element = {  <Home/>}/>
    
    
        </Routes>
    </div>
  );
}

export default App;
