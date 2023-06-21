import { useState, useEffect } from "react";
import Book from "../components/book.js";
import { search } from "../BooksAPI.js";
import { Link } from 'react-router-dom';

export default function Search({ setBooksTop, booksTop }) {
  const [searchBar, setSearchBar] = useState("");
  const [books, setBooks] = useState([]);
  // const [booksOnShelf, setBooksOnShelf] = useState([]);

  // useEffect(() => {
  //   async function fillBooksOnShelf() {
  //     const response = await getAll();
  //     setBooksOnShelf(response);
  //   }
  //   fillBooksOnShelf();
  // }, []);

  // useEffect(() => {
  //   setBooksTop(booksOnShelf);

  // }, [booksOnShelf, setBooksTop])


  useEffect(() => {
    async function searchAndGetData() {
      if (searchBar.length > 0) {
        const response = await search(searchBar);
        if (response !== undefined) {
          for (let index = 0; index < response.length; index++) {
            const element = response[index];
            // check if it is on the shelf
            var onShelf = false;
            var whichShelf;
            for (let shelfIdx = 0; shelfIdx < booksTop.length; shelfIdx++) {
              const bookOnShelf = booksTop[shelfIdx];
              if (bookOnShelf.id === element.id) {
                onShelf = true;
                whichShelf = bookOnShelf.shelf;
              }
            }
            if (onShelf === true) {
              element.onShelf = true;
              element.shelf = whichShelf;
              setBooks(c => c.concat(element));
            } else {
              element.onShelf = false;
              setBooks(c => c.concat(element));
            }
          }
        }
      }
    }
    searchAndGetData();
  }, [booksTop, searchBar]);

  useEffect(() => {
    setBooks([]);
  }, [searchBar])



  return (
    <div className="search-books">
      <div className="search-books-bar">
      <Link to="/" id="backButton">Back</Link>
        <div className="search-books-input-wrapper">

          <input
            value={searchBar}
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={e => {
              setSearchBar(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {(books.length > 0) ? books.map((book, idx) => {
            return (
              <li key={idx}>
                <Book
                  key={book.title}
                  onShelf={book.onShelf}
                  setBooksTop={setBooksTop}
                  booksTop={booksTop}
                  book={book}
                  id={book.id}
                  image={(book.imageLinks !== undefined) ? book.imageLinks.smallThumbnail : undefined}
                  status={book.shelf}
                  title={book.title}
                  authors={book.authors}
                />
              </li>
            )
          }) :
            (searchBar.length > 0) ? "No books found" : ""
          }
        </ol>
      </div>
    </div>
  )
}
