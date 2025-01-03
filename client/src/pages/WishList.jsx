import React, { useEffect } from 'react';
import styled from "styled-components";
import { useCartContext } from '../context/cart-context';
import toast from 'react-hot-toast';
import { useWishListContext } from '../context/wishlist-context';
import { useAuthContext } from '../context/auth-context';
import FormatPrice from '../Helper/FormatPrice';

const Wishlist = () => {
  const { addToCart } = useCartContext(); // Cart functionality from context
  const { fetchWishList, items, removeFromWishList, resetWishList } = useWishListContext(); // Wishlist functionality from context
  const { user } = useAuthContext();

  const handleAddToCart = (item) => {
    addToCart(user?._id, item.productId, 1);
    removeFromWishList(item.productId);
    toast.dismiss()
  };

  useEffect(() => {
    if (user) {
      fetchWishList();
    }
  }, [user?._id]);

  return (
    <>
      <WishListWrapper>
        <div className="wishlist-page">
          <h1 className="wishlist-title">Your Wishlist</h1>

          {items?.length > 0 ? (
            <div className="wishlist-container">
              {items?.map((item, index) => (
                <div className="wishlist-item" key={index}>
                  <img
                    src={item.productImage}
                    alt={item.name}
                    className="wishlist-item-image"
                  />
                  <div className="wishlist-item-details">
                    <h2>{item.name?.length < 50 ? item.name : item.name?.slice(0, 50) + "..."}</h2>
                    {item.price ? <p>Price : <FormatPrice price={item.price} /> </p> : <p>Contact Us To Get Best Price</p>}
                    <div className="wishlist-item-actions">
                      <button
                        className="wishlist-btn wishlist-remove"
                        onClick={() => removeFromWishList(item.productId)}
                      >
                        Remove
                      </button>

                      {/* {
                        item.price ? <button
                          className="wishlist-btn wishlist-add-to-cart"
                          onClick={() => handleAddToCart(item)}
                        >
                          Add to Cart
                        </button> :
                          <QueryBox productId={item?.productId} productName={item?.name} sku={item?.sku} />
                      } */}

                      <button
                        className="wishlist-btn wishlist-add-to-cart"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-message">Your wishlist is empty!</p>
          )}

          {items?.length > 0 && (
            <button
              className="wishlist-reset-btn"
              onClick={resetWishList}
            >
              Reset Wishlist
            </button>
          )}
        </div>
      </WishListWrapper>
    </>

  );
};

export default Wishlist;

const WishListWrapper = styled.section`
.wishlist-page {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

.wishlist-title {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 20px;
  color: #333;
}

.wishlist-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.wishlist-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ensures consistent spacing */
  align-items: center;
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  height: 400px; /* Set a fixed height for uniformity */
  position: relative; /* For button positioning */
}

.wishlist-item-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 10px;
}

.wishlist-item-details {
  text-align: center;
  margin-top: 15px;
  flex: 1; /* Fills available space while maintaining alignment */
}

.wishlist-item-details h2 {
  font-size: 1.5rem;
  color: #444;
  height: 50px;
  word-break: break-all;
  overflow: hidden; 
  text-overflow: ellipsis; 
  width: 100%;
}

.wishlist-item-details p {
  font-size: 1rem;
  color: #777;
  margin: 5px 0;
}

.wishlist-item-actions {
  display: flex;
  justify-content: space-around; /* Space buttons evenly */
  gap: 10px;
  position: absolute; /* Keep buttons pinned to the bottom */
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%; /* Ensure it stays centered */
}

.wishlist-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  width: 100%; /* Optional: make the buttons full-width within their container */
}

.wishlist-remove {
  background-color: #f44336;
  color: #fff;
}

.wishlist-remove:hover {
  background-color: #d32f2f;
}

.wishlist-add-to-cart {
  background-color: #4caf50;
  color: #fff;
}

.wishlist-add-to-cart:hover {
  background-color: #388e3c;
}

.wishlist-reset-btn {
  display: block;
  margin: 30px auto;
  padding: 10px 20px;
  background-color: #ff9800;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.wishlist-reset-btn:hover {
  background-color: #e67e22;
}

.empty-message {
  text-align: center;
  font-size: 1.2rem;
  color: #777;
  margin-top: 20px;
}

`
