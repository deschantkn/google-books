import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

function DetailsPage() {
  const { id } = useParams();
  const [isFetching, setIsFetching] = useState(false);
  const [book, setBook] = useState<any>();

  const fetchBook = async (id: string) => {
    try {
      setIsFetching(true);
      const { data } = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );
      console.log(data);
      setBook(data);
      setIsFetching(false);
    } catch (error) {
      console.error(error);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (!book && id) {
      fetchBook(id);
    }
  }, [id, book]);

  if (book) {
    const { volumeInfo } = book;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              width={150}
              height={300}
              alt="Book"
            />
          </div>
          <div className="col-md-9">
            <p className="card-text mb-1">
              <strong>Publication Date: </strong>
              {volumeInfo.publishedDate}
            </p>
            <p className="card-text mb-1">
              <strong>Description </strong>
              {ReactHtmlParser(volumeInfo.description)}
            </p>
            <p className="card-text mb-1">
              <strong>Categories: </strong>
              {volumeInfo.categories?.join(', ')}
            </p>
            <p className="card-text mb-1">
              <strong>Number of Pages: </strong>
              {volumeInfo.pageCount}
            </p>
            <p className="card-text mb-1">
              <strong>Number of Ratings: </strong>
              {volumeInfo.ratingsCount}
            </p>
            <p className="card-text mb-1">
              <strong>Average Rating: </strong>
              {volumeInfo.averageRating}
            </p>
            <p className="card-text mb-1">
              <strong>Maturity Rating: </strong>
              {volumeInfo.maturityRating}
            </p>
            <p className="card-text mb-1">
              <strong>ISBN-10: </strong>
              {volumeInfo.industryIdentifiers[0].identifier}
            </p>
            <p className="card-text mb-1">
              <strong>ISBN-13: </strong>
              {volumeInfo.industryIdentifiers[1].identifier}
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={volumeInfo.infoLink}
              className="card-link"
            >
              Get Book
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="no-results">
      <i className="fas fa-circle-notch fa-2x fa-spin" />
    </div>
  );
}

export default DetailsPage;
