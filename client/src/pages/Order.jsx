import React, { useEffect } from "react";
import styled from "styled-components";
import { useAuthContext } from "../context/auth-context";

const Order = () => {
  const { user, order, fetchOrders, cancelOrder } = useAuthContext();

  // Fetch orders from API
  useEffect(() => {
    fetchOrders();
  }, [user?._id]);

  // Cancel Order
  const handleCancel = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      cancelOrder(orderId);
    }
  };

  return (
    <OrderWrapper>
      <div className="orders-page">
        <h1 className="orders-title">Your Orders</h1>
        {order?.length > 0 ? (
          <div className="orders-container">
            {order.map((order) => (
              <div className="order" key={order._id}>
                <div className="order-header">
                  <h2>Order #{order._id}</h2>
                  <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p>Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
                </div>
                <div className="order-content">
                  <div className="order-items">
                    <h3>Items:</h3>
                    <ul>
                      {order?.items.map((item, index) => (
                        <li key={index} className="item">
                          <img
                            src={item.productImage || "/placeholder.png"} // Replace with the actual image URL field
                            alt={item.name}
                            className="item-image"
                          />
                          <div className="item-details">
                            <p className="item-name">{item.name}</p>
                            <p className="item-quantity">
                              Quantity: {item.quantity}
                            </p>
                            <p className="item-price">
                              Price: ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="order-summary">
                    <p>Total Amount: <strong>${order.totalAmount.toFixed(2)}</strong></p>
                    <p>Tracking ID: {order.trackingId || "Not available"}</p>
                    {order.deliveryDate && (
                      <p>Estimated Delivery: {new Date(order.deliveryDate).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
                <button
                  className="cancel-button"
                  onClick={() => handleCancel(order._id)}>
                  {order.status === "Cancelled" ? "Order Cancelled" : "Cancel Order"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-orders">You have no orders yet.</p>
        )}
      </div>
    </OrderWrapper>
  );
};

export default Order;

const OrderWrapper = styled.section`
  .orders-page {
    padding: 20px;
    max-width: 1200px;
    margin: auto;
    font-family: Arial, sans-serif;
  }
  .orders-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 30px;
    color: #333;
    font-weight: bold;
  }
  .orders-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .order {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .order-header {
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  .order-header h2 {
    font-size: 1.5rem;
    color: #007bff;
  }
  .order-header p {
    font-size: 0.9rem;
    color: #555;
    margin: 5px 0;
  }
  .order-header .status {
    font-weight: bold;
  }
  .order-header .status.processing {
    color: #ffc107;
  }
  .order-header .status.completed {
    color: #28a745;
  }
  .order-header .status.cancelled {
    color: #dc3545;
  }
  .order-content {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  .order-items {
    flex: 2;
  }
  .order-items h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  .order-items ul {
    list-style: none;
    padding: 0;
  }
  .order-items ul li {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
    align-items: center;
  }
  .item-image {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    object-fit: cover;
  }
  .item-details {
    display: flex;
    flex-direction: column;
  }
  .item-name {
    font-size: 1rem;
    font-weight: bold;
    color: #333;
  }
  .item-quantity,
  .item-price {
    font-size: 0.9rem;
    color: #555;
  }
  .order-summary {
    flex: 1;
    background-color: #f9f9f9;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 15px;
  }
  .order-summary p {
    font-size: 0.9rem;
    color: #333;
    margin-bottom: 8px;
  }
  .order-summary strong {
    font-size: 1rem;
    color: #000;
  }
  .cancel-button {
    margin-top: 20px;
    display: inline-block;
    background-color: #d9534f;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .cancel-button:hover {
    background-color: #c9302c;
  }
  .cancel-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  .empty-orders {
    text-align: center;
    font-size: 1.2rem;
    color: #888;
    margin-top: 50px;
  }
`;


