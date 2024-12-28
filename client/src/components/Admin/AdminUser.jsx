import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';
import { Button } from '../../styles/Button';
import { useAdminContext } from '../../context/admin-context';
import { useAuthContext } from '../../context/auth-context';
import toast from 'react-hot-toast';

const AdminUser = () => {
  const { token, user } = useAuthContext();
  const { getAllUsers, alluser, updateUserRole, deleteUser } = useAdminContext();

  useEffect(() => {
    if (token) {
      getAllUsers();
    }
  }, [token]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState({});

  const openModal = (userId) => {
    setUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setUserId(null);
    setIsModalOpen(false);
  };

  const handleSelectChange = (userId, event) => {
    const newRole = event.target.value;

    if (newRole === "") {
      toast.dismiss()
      toast.error("Please select a role")
      return;
    }

    setSelectedRole((prev) => ({
      ...prev,
      [userId]: newRole,
    }));
    updateUserRole(userId, newRole);
  };

  return (
    <AdminUserWrapper>
      <h1 className="admin-title">Admin User</h1>
      <div className="user-grid">
        {alluser?.map((userItem) => {
          const isCurrentUser = userItem?._id === user?._id;

          return (
            <div className="user-card" key={userItem?._id}>
              <div className="user-header">
                <h3>{userItem?.name?.toUpperCase()}</h3>
                <span className={`badge ${userItem?.role}`}>
                  {userItem?.role?.toUpperCase()}
                </span>
              </div>
              <p>Email: {userItem?.email}</p>
              <p>Phone: {userItem?.phone}</p>
              <div className="actions">
                <select
                  value={selectedRole[userItem?._id]}
                  onChange={(event) => handleSelectChange(userItem?._id, event)}
                  disabled={isCurrentUser}
                >
                  <option value="">Change Role</option>
                  <option value="user">User</option>
                  <option value="productAdmin">Product Admin</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  className="delete-btn"
                  onClick={() => openModal(userItem?._id)}
                  disabled={isCurrentUser}
                >
                  <MdDelete /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {isModalOpen && (
        <div className={`modal ${isModalOpen ? 'show' : ''}`}>
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this User?</p>
            <div className="modal-actions">
              <Button className="modal-close" onClick={closeModal}>
                Close
              </Button>
              <Button
                className="modal-delete"
                onClick={() => {
                  deleteUser(userId);
                  closeModal();
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminUserWrapper>
  );
};

export default AdminUser;

// Styled Component
const AdminUserWrapper = styled.section`
/* Container */

.admin-title {
    font-size: 2.5rem; /* Increased size */
    font-weight: bold;
    text-align: center;
    margin-bottom: 2.5rem;
    background-color: #f6f8fa;
    padding: 2rem;
  }

.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

/* User Card */
.user-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.user-header h3 {
  font-size: 1.2rem;
  font-weight: 600;
}

.badge {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  border-radius: 12px;
  font-weight: 600;
}

.badge.user {
  background: #e6f7ff;
  color: #1890ff;
}

.badge.productAdmin {
  background: #fffbe6;
  color: #faad14;
}

.badge.admin {
  background: #fff1f0;
  color: #f5222d;
}

/* Actions */
.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
}

select {
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ddd;
}

/* Buttons */
.delete-btn {
  padding: 0.5rem 1rem;
  background: #ff4d4f;
  color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display:flex;
  justify-content:center;
  align-items: center;
  transition: 0.3s;
}

.delete-btn:hover {
  background: #ff7875;
}

/* Modal */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Display modal when 'show' class is added */
.modal.show {
  display: flex;
}

.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

.modal h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.modal p {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  justify-content: space-around;
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

button:disabled {
  opacity:0.3;
  cursor: not-allowed;
}
`;

