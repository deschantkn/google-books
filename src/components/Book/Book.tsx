import React from 'react';
import { Link } from 'react-router-dom';

const Book = ({ id, volumeInfo }: any) => {
  const { title, authors, publisher, imageLinks } = volumeInfo;

  return (
    <div className="col-xs-6 col-md-4 mb-4">
      <div className="card w-100">
        <img
          src={imageLinks ? imageLinks.thumbnail : null}
          className="card-img-top"
          alt="Book Cover"
          height={250}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            <strong>Author: </strong>
            {authors}
          </p>
          <p className="card-text">
            <strong>Publisher: </strong>
            {publisher}
          </p>
          <Link to={`/book/${id}`}>More Detail</Link>
        </div>
      </div>
    </div>
  );
};

export default Book;
