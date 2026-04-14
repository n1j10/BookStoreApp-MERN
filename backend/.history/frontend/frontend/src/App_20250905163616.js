import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

// Admin
import AdminLayout from "./components/admin/AdminLayout";
import AddBook from "./pages/admin/AddBook";
import AllBooks from "./pages/admin/AllBooks";

function App() {
  const location = useLocation();

  // اخفاء الهيدر إذا كان المسار يبدأ بـ /admin
  const hideHeader = /^\/admin(\/|$)/.test(location.pathname);

  return (
    <div>
      {!hideHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />

        {/* صفحات الأدمن */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AllBooks />} />       {/* /admin الافتراضي */}
          <Route path="books" element={<AllBooks />} />
          <Route path="add-book" element={<AddBook />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
