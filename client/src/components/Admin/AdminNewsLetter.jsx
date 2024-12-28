import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';
import { Button } from '../../styles/Button';
import { useAuthContext } from '../../context/auth-context';
import { useAdminContext } from '../../context/admin-context';

const AdminNewsletter = () => {

  const { token } = useAuthContext();
  const { getAllNewsLetters, deleteNewsLetter, allNewsletter } = useAdminContext();

  useEffect(() => {
    if (token) {
      getAllNewsLetters();
    }
  }, [token]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);

  const openModal = (newsletter) => {
    setSelectedNewsletter(newsletter);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNewsletter(null);
    setIsModalOpen(false);
  };

  return (
    <AdminNewsletterWrapper>
      <h1 className="admin-title">Newsletter Subscribers</h1>
      <div className="grid grid-tem-view">
        {allNewsletter?.map((newsletter) => (
          <div key={newsletter?._id} className="card">
            <h2>{newsletter?.newsletteremail}</h2>
            <div className="card-actions">
              <button
                onClick={() => openModal(newsletter)}
                className="delete-btn"
              >
                <MdDelete /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {isModalOpen && selectedNewsletter && (
        <ModalWrapper>
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this subscriber?</p>
            <p><strong>Email:</strong> {selectedNewsletter.newsletteremail}</p>
            <div className="modal-actions">
              <Button className="modal-close" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                className="modal-delete"
                onClick={() => {
                  deleteNewsLetter(selectedNewsletter._id);
                  closeModal();
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </AdminNewsletterWrapper>
  );
};

export default AdminNewsletter;

// Styled Components
const AdminNewsletterWrapper = styled.section`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  .admin-title {
    font-size: 2rem;
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
    font-size: 1.5rem;
    margin-bottom: 1rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .card-actions {
    display: flex;
    justify-content: flex-end;
  }

  .delete-btn {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: #dc3545;
    color: #fff;
    transition: 0.3s;
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
    text-align: center;
    width: 90%;
    max-width: 500px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .modal h2 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .modal p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.6;
  }

  .modal-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }

  .modal-close, .modal-delete {
    padding: 0.75rem 1.25rem;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    border: none;
}

.modal-close {
    background: #6c757d;
    color: #333;
}

.modal-delete {
    background: #dc3545;
    color: #fff;
}

.modal-close:hover {
    background: #5a6268;
}

.modal-delete:hover {
    background: #c82333;
}
`;
