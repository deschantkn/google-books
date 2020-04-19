import React, { useState } from 'react';
import axios from 'axios';

import './Search.css';
import Book from '../Book/Book';

function Search() {
  const [books, setBooks] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    const value = searchKey.split(' ').join('+');
    setSearchLoading(true);
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${value}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );
      setBooks(data.items);
      setSearchLoading(false);
    } catch (error) {
      setSearchLoading(false);
      console.error(error);
    }
  };

  const mapBooks = () => {
    return books.map((book: any) => {
      const { id, volumeInfo } = book;
      return <Book key={id} id={id} volumeInfo={volumeInfo} />;
    });
  };

  return (
    <div className="search__container">
      <h3 className="p-4">Search Google Books</h3>
      <div className="container">
        <form className="form-inline w-100" onSubmit={handleSearch}>
          <div className="input-group mb-3 w-100">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <i className="fas fa-search" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="title"
              aria-label="Search"
              aria-describedby="search"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>

        {books.length === 0 ? (
          <div className="no-results">
            {!searchLoading ? (
              <>
                <i className="fas fa-2x fa-book-open" />
                <p className="mt-1">Please enter a search key</p>
              </>
            ) : (
              <i className="fas fa-circle-notch fa-2x fa-spin" />
            )}
          </div>
        ) : (
          <div className="row">{mapBooks()}</div>
        )}
      </div>
    </div>
  );
}

export default Search;
