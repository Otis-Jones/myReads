import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getAll } from "./BooksAPI";
import Home from "./pages/homePage";
import Search from "./pages/searchPage";
// import { useLocation } from "react-router-dom";

function App() {
  const [booksTop, setBooksTop] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const getAllResponse = await getAll();
      setBooksTop(getAllResponse);
    }
    fetchBooks();
  }, []);




  return (
    <Routes>
      <Route exact path="/"  element={
        <Home key={1} booksTop={booksTop} setBooksTop={setBooksTop}/>
      }/>
      <Route exact path="/search" element={
        <Search key={2} setBooksTop={setBooksTop} booksTop={booksTop}/>
      }/>
    </Routes>
  )

}

export default App;
