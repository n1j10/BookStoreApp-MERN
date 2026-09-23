import { useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AppRouter from './router';
function App() {

  const location = useLocation()

  const hideHeader = /^\/admin(\/|$)/.test(location.pathname)
  return (
    <>
      {!hideHeader && <Header />}
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
