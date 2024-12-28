import React, { useState } from 'react'
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { useProductContext } from '../../../context/product-context';
import { Button } from '../../../styles/Button';
import { useAdminContext } from '../../../context/admin-context';
import AdminFullViewCarouselDetails from './AdminFullViewCarouselDetails';
import AddAdminCarouselButton from './AddAdminCarouselButton';

const AdminCarousel = () => {

  const { caraousel } = useProductContext()
  const { deleteCarousel } = useAdminContext()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [carouselId, setCarouselId] = useState(null);

  const openDeleteModal = (Id) => {
    setCarouselId(Id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setCarouselId(null);
    setIsDeleteModalOpen(false);
  };

  const openEditModal = (Id) => {
    setCarouselId(Id);
    setIsViewModalOpen(true);
  };

  const closeEditModal = () => {
    setCarouselId(null);
    setIsViewModalOpen(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil((caraousel?.length || 0) / itemsPerPage);

  const currentItems = caraousel?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
    <AddAdminCarouselButton/>
      <AdminCarouselWrapper>
        <div className="admin-container">
          <div className="product-list">
            {currentItems.map((carousel) => (
              <div className="product-item" key={carousel?._id}>
                <img
                  src={carousel?.file?.url}
                  alt={`${carousel.heading}-image`}
                />
                <div className="product-details">
                  <p>
                    {carousel?.heading?.length < 20
                      ? carousel?.heading
                      : `${carousel?.heading?.slice(0, 10)}...`}
                  </p>
                  <div className="product-buttons">
                    {/* View Button */}
                    <button
                      type="button"
                      className="view-btn"
                      onClick={() => openEditModal(carousel._id)}
                    >
                      <FaEye /> View
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => openDeleteModal(carousel._id)}
                    >
                      <MdDelete /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                Prev
              </Button>
              <span className="pagination-info">
                Page <strong>{currentPage}</strong> of{' '}
                <strong>{totalPages}</strong>
              </span>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div >

        {/* Full View Product Details Modal */}
        {
          isViewModalOpen && (
            <AdminFullViewCarouselDetails
              carouselId={carouselId}
              closeModal={closeEditModal}
            />
          )
        }

        {/* Delete Confirmation Modal */}
        {
          isDeleteModalOpen && (
            <div className="delete-modal-overlay" onClick={closeDeleteModal}>
              <div
                className="delete-modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this Carousel?</p>
                <div className="delete-modal-actions">
                  <Button className="modal-close" onClick={closeDeleteModal}>
                    Close
                  </Button>
                  <Button
                    className="modal-delete"
                    onClick={() => {
                      deleteCarousel(carouselId);
                      closeDeleteModal();
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )
        }


      </AdminCarouselWrapper >
    </>
  )
}

export default AdminCarousel

const AdminCarouselWrapper = styled.section`
  /* Admin Products Container */
  .admin-container {
    margin: 2rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Product List */
  .product-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }

  .product-item {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .product-item:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* Product Image */
  .product-item img {
    width: 100%;
    height: 150px;
    object-fit: contain;
    border-radius: 8px;
    border: 1px solid #ddd;
  }

  /* Product Details */
  .product-details {
    margin-top: 1rem;
    text-align: center;
  }

  .product-details p {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  /* Product Buttons */
  .product-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .view-btn,
    .delete-btn {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.5rem 1rem;
      font-size: 1.1rem; /* Increased button font size */
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: 0.3s;
    }

    .view-btn {
      background: #007bff;
      color: #fff;
    }

    .delete-btn {
      background: #dc3545;
      color: #fff;
    }

    .view-btn:hover {
      background: #0056b3;
    }

    .delete-btn:hover {
      background: #c82333;
    }
  }

  /* View Button */
  .view-btn {
    background-color: #007bff;
  }

  .view-btn:hover {
    background-color: #0056b3;
  }

  /* Delete Button */
  .delete-btn {
    background-color: #dc3545;
  }

  .delete-btn:hover {
    background-color: #c82333;
  }

  /* Pagination Controls */
  .pagination {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 2rem;
    align-items: center;

    .pagination-info {
      font-size: 1rem;
    }
  }

  /* Modal Overlay */
  .delete-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  /* Modal Content */
  .delete-modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 500px;
    max-width: 90%;
    text-align: center;
  }

  /* Modal Title */
  .delete-modal-content h2 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  /* Modal Body */
  .delete-modal-content p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  /* Modal Actions (Buttons) */
  .delete-modal-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  /* Modal Buttons */
  .modal-close,
  .modal-delete {
    padding: 0.75rem 1.25rem;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    border: none;
  }

  /* Close Button */
  .modal-close {
    background: #ccc;
    color: #333;
    transition: background 0.3s ease;
  }

  .modal-close:hover {
    background: #bbb;
  }

  /* Delete Button */
  .modal-delete {
    background: #dc3545;
    color: #fff;
    transition: background 0.3s ease;
  }

  .modal-delete:hover {
    background: #c82333;
  }
`;