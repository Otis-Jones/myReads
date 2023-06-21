import "../App.css";
import { useState } from "react";
import { update } from "../BooksAPI.js";
// import Draggable from "react-draggable";

// const values = ["currentlyReading", "wantToRead", "read", "none"];
// const innerText = ["Currently Reading", "Want to Read", "Read", "None"];

export default function Book({ book, id, image, status, title, authors, setBooksTop, booksTop, wantToReadShelf, readShelf,
  currentlyReadingShelf, setCurrentlyReadingShelf, setWantToReadShelf, setReadShelf, onShelf}) {
  const [currentShelf, setCurrentShelf] = useState((onShelf === true) ? status : "none");
  return (
    <div>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                `url("${image}")`
            }}
          ></div>
          <div className="book-shelf-changer">
            {
              (onShelf === true) ?
                // this is if the book appearing in search is on our shelf
                // which is the same drop down as the on the home page

                <select value={currentShelf} onChange={async (e) => {

                  // this if is detecting if we passed the setCurrentlyReadingShelf prop
                  // if we did that means that we are on the home page looking at the shelf
                  // this means that we need to update the state using the set... props
                  // if not that means we are on the search page and only need to update the database
                  // and the state for the specific book not the state of the homepage


                  // if (setCurrentlyReadingShelf !== undefined) {


                  //remove from old shelf

                    // if (currentShelf === "currentlyReading") {
                    //   const newState = currentlyReadingShelf.filter(ele => (ele.id) !== book.id);
                    //   setCurrentlyReadingShelf(newState);
                    // } else if (currentShelf === "wantToRead") {
                    //   const newState = wantToReadShelf.filter(ele => (ele.id) !== book.id);
                    //   setWantToReadShelf(newState);
                    // } else if (currentShelf === "read") {
                    //   const newState = readShelf.filter(ele => (ele.id) !== book.id);
                    //   setReadShelf(newState);
                    // };
                  //   book.shelf = e.target.value;



                  //   // move to new shelf
                  //   if (e.target.value === "currentlyReading") {
                  //     setCurrentlyReadingShelf(c => c.concat(book));
                  //   } else if (e.target.value === "wantToRead") {
                  //     setWantToReadShelf(c => c.concat(book));
                  //   } else if (e.target.value === "read") {
                  //     setReadShelf(c => c.concat(book));
                  //   } else {
                  //     console.log("bad move");
                  //     const newState = booksTop.filter(ele => (ele.id) !== book.id);
                  //     setBooksTop(newState);
                  //   }
                  // };
                  const newState = booksTop.filter(ele => (ele.id) !== book.id);
                  if (["wantToRead", "currentlyReading", "read"].includes(e.target.value)) {
                    book.shelf = e.target.value;
                    setBooksTop(newState.concat(book));
                  } else {
                    setBooksTop(newState);
                  }

                  setCurrentShelf(e.target.value);
                  await update({id : id}, e.target.value);
                }}>
                  <option value="none" disabled>
                    Move to...
                  </option>

                  <option value="currentlyReading">
                    Currently Reading
                  </option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select> :
                // This is if the book is appearing in search but is not on our shelf
                // we display a different set of options
                <select value={currentShelf} onChange={async (e) => {
                  setCurrentShelf(e.target.value);
                  book.shelf = e.target.value;
                  setBooksTop(booksTop.concat(book));
                  await update({id : id}, e.target.value);
                }}>
                  <option value="addTo" disabled>
                    Add to...
                  </option>

                  <option value="currentlyReading">
                    Currently Reading
                  </option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
            }
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors ? authors.reduce((acc = '', currentAuthor) => acc.concat(', ' + currentAuthor)).slice(0) : ""}</div>
      </div>
    </div>
  );
};
