import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';
import { Button } from '../../styles/Button';
import { useAdminContext } from '../../context/admin-context';
import { useAuthContext } from '../../context/auth-context';

const AdminUser = () => {

  const { token, user } = useAuthContext()
  const { getAllUsers, alluser, updateUserRole, deleteUser } = useAdminContext();

  useEffect(() => {
    if (token) {
      getAllUsers()
    }
  }, [token])

  let count = 1

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const openModal = (userId) => {
    setUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setUserId(null);
    setIsModalOpen(false);
  };

  const [selectedRole, setSelectedRole] = useState({});

  const handleSelectChange = (userId, event) => {
    const newRole = event.target.value;
    setSelectedRole((prev) => ({
      ...prev,
      [userId]: newRole,
    }));

    updateUserRole(userId, newRole);
  };

  return (
    <AdminUserWrapper>
      <div className="admin-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {alluser?.map((userItem) => {
              // Compare logged-in user ID with the current user in the list
              const isCurrentUser = userItem?._id === user?._id;

              return (
                <tr key={userItem?._id}>
                  <td>{count++}</td>
                  <td className="description">{userItem?.name}</td>
                  <td>{userItem?.email}</td>
                  <td>{userItem?.phone}</td>
                  <td>
                    <p>{userItem?.role?.toUpperCase()}</p>
                    <select
                      value={selectedRole[userItem?._id]}
                      onChange={(event) => handleSelectChange(userItem?._id, event)}
                      disabled={isCurrentUser} // Disable role change for the logged-in user
                    >
                      <option value="user">User</option>
                      <option value="productAdmin">Product Admin</option>
                      <option value="admin">Full Admin</option>
                    </select>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => openModal(userItem?._id)}
                      disabled={isCurrentUser} // Disable delete button for the logged-in user
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
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
      </div>
    </AdminUserWrapper >
  )
}

export default AdminUser

const AdminUserWrapper = styled.section`
/* Container */
.admin-container {
  margin: 2rem 0;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #ffc221;
}

/* Title */
.admin-title {
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* Add Product Button */
.add-product-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: 1rem 2rem;
}

.add-product-btn {
  margin: 1rem 2rem;
}

/* Table */
.admin-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
}

.admin-table tr{
  margin-bottom: 1rem;
}

.admin-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.admin-table tr:nth-child(odd) {
  background-color: #f7f7f7;
}

.admin-table th, .admin-table td {
  border: 1px solid #ccc;
  padding: 0.75rem;
  text-align: left;
  font-size: 1.5rem;
}

.admin-table td svg{
  font-size: 1.8rem;
}

.admin-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.description {
  color: #333;
  font-size: 1.2rem;
}

/* Nested Table */
.nested-table {
  border: none;
  width: 100%;
}

.nested-row {
  display: flex;
  flex-direction: column;
  border: none;
}

@media screen and (max-width: 992px) {
 .admin-table tr{
   display: flex;
   flex-direction: column;
  }
}

/* Edit and Delete Buttons */
.edit-btn, .delete-btn {
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #ffc221;
}

.edit-btn:hover, .delete-btn:hover {
  color: #ffdd73;
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
    background: #ccc;
    color: #333;
}

.modal-delete {
    background: #ffc221;
    color: #fff;
}

.modal-close:hover {
    background: #bbb;
}

.modal-delete:hover {
    background: #ffdd73;
}

button:disabled {
  opacity:0.3;
  cursor: not-allowed;
}
`
