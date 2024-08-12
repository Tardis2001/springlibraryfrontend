// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import BookDetails from "./pages/books/BookDetails";
import ListBooks from "./pages/books/ListBooks";
import UploadBook from "./pages/books/uploadBook";
import Home from "./pages/Home";
function AnimatedRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      navigate("/login");
    }
  }, []);
  return (
    <Routes location={location} key={location.key}>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/uploadBook" element={<UploadBook />} />
      <Route path="/listBooks" element={<ListBooks />} />
      <Route path="/listBooks/book/:id" element={<BookDetails />} />
      {/* <Route path="/removeBooks" element={<RemoveBooks/>} /> */}
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatePresence>
        <AnimatedRoutes />
      </AnimatePresence>
    </BrowserRouter>
  );
}
