import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdDelete, MdVisibility } from 'react-icons/md';
import { Button } from '../../styles/Button';
import { useAuthContext } from '../../context/auth-context';
import { useAdminContext } from '../../context/admin-context';

const AdminQuery = () => {

  const { token } = useAuthContext();
  const { getAllProductQuery, deleteProductQuery, allQuerry } = useAdminContext();

  useEffect(() => {
    if (token) {
      getAllProductQuery();
    }
  }, [token]);

  const [selectedQuery, setSelectedQuery] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const openDeleteModal = (query) => {
    setSelectedQuery(query);
    setIsDeleteModalOpen(true);
  };

  const openDetailModal = (query) => {
    setSelectedQuery(query);
    setIsDetailModalOpen(true);
  };

  const closeModal = () => {
    setSelectedQuery(null);
    setIsDeleteModalOpen(false);
    setIsDetailModalOpen(false);
  };

  return (
    <AdminQueryWrapper>
      <h1 className="admin-title">Product Queries</h1>
      <div className="grid grid-tem-view">
        {allQuerry?.map((query) => (
          <div key={query?._id} className="card">
            <h2>{query?.name?.toUpperCase()}</h2>
            <p><strong>Product:</strong> {query?.productName} ({query?.productCode})</p>
            <p><strong>Email:</strong> {query?.email}</p>
            <p><strong>Phone:</strong> {query?.phone}</p>
            <div className="card-actions">
              <button onClick={() => openDetailModal(query)} className="view-btn">
                <MdVisibility /> View
              </button>
              <button onClick={() => openDeleteModal(query)} className="delete-btn">
                <MdDelete /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedQuery && (
        <ModalWrapper>
          <div className="modal-content">
            <h2>Query Details</h2>
            <p><strong>Name:</strong> {selectedQuery?.name?.toUpperCase()}</p>
            <p><strong>Product Code:</strong> {selectedQuery.productCode}</p>
            <p><strong>Product Name:</strong> {selectedQuery.productName}</p>
            <p><strong>Product SKU:</strong> {selectedQuery.productSKU}</p>
            <p><strong>Email:</strong> {selectedQuery.email}</p>
            <p><strong>Phone:</strong> {selectedQuery.phone}</p>
            <p><strong>Query:</strong> {selectedQuery.query}</p>
            <Button className="modal-close" onClick={closeModal}>Close</Button>
          </div>
        </ModalWrapper>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedQuery && (
        <ModalWrapper>
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this query?</p>
            <div className="modal-actions">
              <Button className="modal-close" onClick={closeModal}>Cancel</Button>
              <Button
                className="modal-delete"
                onClick={() => {
                  deleteProductQuery(selectedQuery._id);
                  closeModal();
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </AdminQueryWrapper>
  );
};

export default AdminQuery;

// Styled Components
const AdminQueryWrapper = styled.section`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  .admin-title {
    font-size: 2.5rem; /* Increased size */
    font-weight: bold;
    text-align: center;
    margin-bottom: 2.5rem;
    background-color: #f6f8fa;
    padding: 2rem;
  }

  .card {
    background: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: 0.3s ease;
  }

  .card h2 {
    font-size: 2rem; /* Increased size */
    margin-bottom: 0.5rem;
  }

  .card p {
    font-size: 1.5rem; /* Increased size */
    margin-bottom: 0.5rem;
  }

  .card-actions {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
  }

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
`;

// Modal Styles
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  .modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    text-align: left;
    width: 90%;
    max-width: 500px;
    word-wrap: break-word;
    overflow-y: auto;
    max-height: 80vh;
    animation: fadeInFromCenter 0.5s ease-out;
  }

  @keyframes fadeInFromCenter {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .modal-content p {
    font-size: 1.5rem; /* Increased modal text size */
    margin-bottom: 1rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.6;
    white-space: normal;
  }

  .modal-actions {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .modal-close {
    background: #6c757d;
    color: #fff;
    font-size: 1.1rem; /* Button text size */
  }

  .modal-close:hover {
    background: #5a6268;
  }

  .modal-delete {
    background: #dc3545;
    color: #fff;
    font-size: 1.1rem; /* Button text size */
  }

  .modal-delete:hover {
    background: #c82333;
  }
`;

