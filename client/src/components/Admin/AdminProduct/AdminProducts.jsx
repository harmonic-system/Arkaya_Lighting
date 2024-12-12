import React, { useEffect, useState } from 'react';
import { useCategoryContext } from '../../../context/category-context';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Button } from '../../../styles/Button';
import { useAdminContext } from '../../../context/admin-context';
import EditAdminProduct from './EditAdminProduct';
import NoProduct from '../../../pages/NoProduct';

const AdminProducts = () => {
  const { filterProducts, getCategoryFilteredProducts } = useCategoryContext();
  const { deleteProduct } = useAdminContext();
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("selectedCategory")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      const newCategory = localStorage.getItem("selectedCategory");
      if (newCategory !== selectedCategory) {
        setSelectedCategory(newCategory);
        getCategoryFilteredProducts();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [selectedCategory, getCategoryFilteredProducts]);

  useEffect(() => {
    getCategoryFilteredProducts();
  }, [selectedCategory, getCategoryFilteredProducts]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const openDeleteModal = (productId) => {
    setSelectedProductId(productId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedProductId(null);
    setIsDeleteModalOpen(false);
  };

  const openEditModal = (productId) => {
    setSelectedProductId(productId);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedProductId(null);
    setIsEditModalOpen(false);
  };

  // Pagination Functions

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Calculate total pages
  const totalPages = Math.ceil(filterProducts?.length / itemsPerPage);

  // Get current page data
  const currentItems = filterProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (currentItems.length === 0) {
    return (
      <AdminProductsWrapper className="section">
        <div className="container grid">
          <div className="add-product-container">
            <Link className="add-product-btn" to="/admin/addproducts">
              <Button>Add Product</Button>
            </Link>
          </div>
          <NoProduct />
        </div>
      </AdminProductsWrapper>
    )
  }

  return (
    <AdminProductsWrapper>
      <div className="admin-container">
        <div className="add-product-container">
          <Link className="add-product-btn" to="/admin/addproducts"><Button>Add Product</Button></Link>
        </div>
        <div className="product-list">
          {currentItems?.map((product) => (
            <div className="product-item" key={product._id}>
              <img src={product.productfile?.url} alt={product.productname} />
              <div className="product-details">
                <p>{product?.productname?.length < 20 ? product?.productname : product?.productname?.slice(0, 10)}</p>
                <div className="product-buttons">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => openEditModal(product._id)}
                  >
                    <FaEdit />
                  </button>
                  {isEditModalOpen && (
                    <EditAdminProduct productId={selectedProductId} closeModal={closeEditModal} />
                  )}
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => openDeleteModal(product._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
                {isDeleteModalOpen && (
                  <div className={`modal ${isDeleteModalOpen ? 'show' : ''}`}>
                    <div className="modal-content">
                      <h2>Confirm Deletion</h2>
                      <p>Are you sure you want to delete this product?</p>
                      <div className="modal-actions">
                        <Button className="modal-close" onClick={closeDeleteModal}>
                          Close
                        </Button>
                        <Button
                          className="modal-delete"
                          onClick={() => {
                            deleteProduct(selectedProductId);
                            closeDeleteModal();
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Pagination Controls */}
        <div className="pagination">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            className={currentPage <= 1 ? 'disabled-button' : ''}
            disabled={currentPage <= 1}>
            Prev
          </Button>
          <span className="pagination-info">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            className={currentPage === totalPages ? 'disabled-button' : ''}
            disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </div>
    </AdminProductsWrapper>
  );
};

export default AdminProducts;

const AdminProductsWrapper = styled.section`
  /* Container */
  .admin-container {
  margin: 2rem 0;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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

.product-list {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items:center;
  flex-wrap: wrap;
  gap: 1rem;
}

.product-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  .product-details {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin-bottom: 0.5rem;
      font-weight: bold;
    }

    .product-buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;


      button {
        margin: 0.5rem 0;
        border: none;
        background-color: #007bff;
        color: white;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.7rem;

        &:hover {
          background-color: #0056b3;
        }

        &:last-of-type {
          background-color: #dc3545;

          &:hover {
            background-color: #c82333;
          }
        }
      }
    }
  }
}

/* Modal */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1) !important;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

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

.modal-close,
.modal-delete {
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
`;
