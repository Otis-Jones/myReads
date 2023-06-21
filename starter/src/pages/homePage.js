import "../App.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Shelf from "../components/shelf.js";

export default function Home({ booksTop, setBooksTop }) {
  const [currentlyReadingShelf, setCurrentlyReadingShelf] = useState([]);
  const [wantToReadShelf, setWantToReadShelf] = useState([]);
  const [readShelf, setReadShelf] = useState([]);
  const shelfNames = ["currentlyReading", "wantToRead", "read"];
  const shelves = [currentlyReadingShelf, wantToReadShelf, readShelf];

  // take the books object which is the response from getAll
  // and filter stuff into the shelf it belongs on
  useEffect(() => {
    setCurrentlyReadingShelf([]);
    setWantToReadShelf([]);
    setReadShelf([]);
    booksTop.forEach((book) => {
      if (book.shelf === "currentlyReading") {
        setCurrentlyReadingShelf(c => c.concat(book));
      } else if (book.shelf === "wantToRead") {
        setWantToReadShelf(c => c.concat(book));
      } else if (book.shelf === "read") {
        setReadShelf(c => c.concat(book));
      }
    })
  }, [booksTop]);



  return (
    <div className="app">
          <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {shelves.map((shelf, idx) => {
                  const shelfName = shelfNames[idx];
                  return (
                    <div key={idx}>
                    <Shelf
                      currentShelf={shelf}
                      key={idx}
                      booksTop={booksTop}
                      setBooksTop={setBooksTop}
                      currentlyReadingShelf={currentlyReadingShelf}
                      wantToReadShelf={wantToReadShelf}
                      readShelf={readShelf}
                      setCurrentlyReadingShelf={setCurrentlyReadingShelf}
                      setWantToReadShelf={setWantToReadShelf}
                      setReadShelf={setReadShelf}
                      shelfName={shelfName}
                      />
                    </div>
                  )
                })}

                </div>


              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
    </div>
  );
};
