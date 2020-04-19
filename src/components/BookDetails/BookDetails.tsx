import React, { useLayoutEffect, useState, useRef, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { useHistory } from 'react-router-dom';

const BookDetails = ({ volumeInfo }: any) => {
  const modalPage = document.getElementById('modal_root');
  const showModal = useRef<HTMLButtonElement>(null);
  const [modalShown, setModalShown] = useState(false);
  const history = useHistory();

  const handleModalClosed = () => {
    history.push('/');
  };

  useLayoutEffect(() => {
    if (!modalShown) {
      showModal.current?.click();
      setModalShown(true);
    }
  }, [modalShown]);

  if (modalPage !== null) {
    return createPortal(
      <>
        <button
          ref={showModal}
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
          style={{ display: 'none' }}
        >
          Invisible
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {volumeInfo.title}
                </h5>
              </div>
              <div className="modal-body">
                <p className="card-text mb-1">
                  <strong>Publication Date: </strong>
                  {volumeInfo.publishedDate}
                </p>
                <p className="card-text mb-1">
                  <strong>Description: </strong>
                  {volumeInfo.description}
                </p>
                <p className="card-text mb-1">
                  <strong>Categories: </strong>
                  {volumeInfo.categories?.join(',')}
                </p>
                <p className="card-text mb-1">
                  <strong>Average Rating: </strong>
                  {volumeInfo.averageRating}
                </p>
                <p className="card-text mb-1">
                  <strong>Maturity Rating: </strong>
                  {volumeInfo.maturityRating}
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
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handleModalClosed}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>,
      modalPage
    ) as ReactElement;
  }
};

export default BookDetails;
