import Book from "./book.js";

const shelfNameToDisplay = {"currentlyReading": "Currently Reading", "wantToRead" : "Want To Read", "read": "Read"}

export default function Shelf({ booksTop, setBooksTop, currentlyReadingShelf, wantToReadShelf, readShelf, setCurrentlyReadingShelf,
  setWantToReadShelf, setReadShelf, shelfName, currentShelf }) {
  return (
          <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfNameToDisplay[shelfName]}</h2>
              <div className="bookshelf-books">

                      <ol className="books-grid">
                      {currentShelf.map((book) => {
                        return (
                          <li key={book.id}>
                            <Book
                              key={book.title}
                              currentlyReadingShelf={currentlyReadingShelf}
                              wantToReadShelf={wantToReadShelf}
                              readShelf={readShelf}
                              setCurrentlyReadingShelf={setCurrentlyReadingShelf}
                              setWantToReadShelf={setWantToReadShelf}
                              setReadShelf={setReadShelf}
                              booksTop={booksTop}
                              setBooksTop={setBooksTop}
                              book={book}
                              onShelf={true}
                              id={book.id}
                              image={(book.imageLinks !== undefined) ? book.imageLinks.smallThumbnail : undefined}
                              status={shelfName}
                              title={book.title}
                              authors={book.authors}
                            />
                          </li>
                        )
                      })}
                    </ol>
            </div>
          </div>
  );
}
