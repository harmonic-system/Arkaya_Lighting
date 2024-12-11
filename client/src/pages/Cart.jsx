// import styled from "styled-components";
// import { Link, NavLink } from "react-router-dom";
// import { Button } from "../styles/Button";
// import CartItems from "../components/Cart/CartItems";
// import FormatPrice from "../Helper/FormatPrice";
// import { useCartContext } from "../context/cart-context";
// import { useAuthContext } from "../context/auth-context";
// import { useEffect } from "react";

// const Cart = () => {
//   const { cart, totalCartPrice, fetchCart, resetCart } = useCartContext();
//   const { user } = useAuthContext();

//   useEffect(() => {
//     if (user) {
//       fetchCart();
//     }
//   }, [user?._id]);

//   const handleReset = () => {
//     resetCart();
//   };

//   if (cart?.length === 0) {
//     return (
//       <EmptyDiv>
//         <h3>No Item in Cart </h3>
//       </EmptyDiv>
//     );
//   }

//   return (
//     <Wrapper>
//       <div className="container">
//         <div className="cart_heading grid grid-five-column">
//           <p>Item</p>
//           <p className="cart-hide">Price</p>
//           <p>Quantity</p>
//           <p className="cart-hide">Subtotal</p>
//           <p>Remove</p>
//         </div>
//         <hr />
//         <div className="cart-item">
//           {cart?.map((curElem) => {
//             return <CartItems key={curElem?.productId} {...curElem} />;
//           })}
//         </div>
//         <hr />
//         <div className="cart-two-button">
//           <NavLink to="/products">
//             <Button> continue Shopping </Button>
//           </NavLink>
//           <Button className="btn btn-clear" onClick={handleReset}>
//             clear cart
//           </Button>
//         </div>

//         <div className="order-total--amount">
//           <div className="order-total--subdata">
//             <div>
//               <p>subtotal:</p>
//               <p>
//                 <FormatPrice price={totalCartPrice} />
//               </p>
//             </div>
//             <hr />
//             <div>
//               <p>order total:</p>
//               <p>
//                 <FormatPrice price={totalCartPrice} />
//               </p>
//             </div>
//           </div>
//         </div>
//         <Button className="checkout-btn"><Link to="/user/checkout">Proceed To Checkout</Link></Button>
//       </div>
//     </Wrapper>
//   );
// };

// const EmptyDiv = styled.div`
//   display: grid;
//   place-items: center;
//   height: 50vh;

//   h3 {
//     font-size: 4.2rem;
//     text-transform: capitalize;
//     font-weight: 300;
//   }
// `;

// const Wrapper = styled.section`
//   padding: 9rem 0;

//   .grid-four-column {
//     grid-template-columns: repeat(4, 1fr);
//   }

//   .grid-five-column {
//     grid-template-columns: repeat(4, 1fr) 0.3fr;
//     text-align: center;
//     align-items: center;
//   }
//   .cart-heading {
//     text-align: center;
//     text-transform: uppercase;
//   }
//   hr {
//     margin-top: 1rem;
//   }
//   .cart-item {
//     padding: 3.2rem 0;
//     display: flex;
//     flex-direction: column;
//     gap: 3.2rem;
//   }

//   .cart-user--profile {
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
//     gap: 1.2rem;
//     margin-bottom: 5.4rem;

//     img {
//       width: 6rem;
//       height: 6rem;
//       border-radius: 50%;
//     }
//     h2 {
//       font-size: 2.4rem;
//     }
//   }
//   .cart-user--name {
//     text-transform: capitalize;
//   }
//   .cart-image--name {
//     /* background-color: red; */
//     align-items: center;
//     display: grid;
//     gap: 1rem;
//     grid-template-columns: 0.4fr 1fr;
//     text-transform: capitalize;
//     text-align: left;
//     img {
//       max-width: 5rem;
//       height: 5rem;
//       object-fit: contain;
//       color: transparent;
//     }

//     .color-div {
//       display: flex;
//       align-items: center;
//       justify-content: flex-start;
//       gap: 1rem;

//       .color-style {
//         width: 1.4rem;
//         height: 1.4rem;

//         border-radius: 50%;
//       }
//     }

//     @media (max-width: 768px) {
//      img {
//         max-width: 3rem;
//         height: 3rem;
//       }

//       p {
//         font-size: 1.5rem;
//       }
//     }

//     @media (max-width: 425px) {
//      img {
//         max-width: 2rem;
//         height: 2rem;
//       }

//       p {
//         font-size: 1.1rem;
//       }
//     }
//   }

//   .cart-two-button {
//     margin-top: 2rem;
//     display: flex;
//     justify-content: space-between;

//     .btn-clear {
//       background-color: #e74c3c;
//     }
//   }

//   .amount-toggle {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 1rem;

//     button {
//       border: none;
//       background-color: #fff;
//       cursor: pointer;

//       svg {
//         font-size: 1rem;
//       }
//     }

//     button:disabled {
//       opacity: 0.5;
//       cursor: not-allowed;
//     }

//     .amount-style {
//       font-size: 2rem;
//       color: ${({ theme }) => theme.colors.btn};
//     }

//     @media (max-width: 768px) {
//       .amount-style {
//         font-size: 1.8rem;
//       }
//     }

//     @media (max-width: 425px) {
//       button svg {
//         font-size: 0.8rem;
//       }

//       .amount-style {
//         font-size: 1.4rem;
//       }
//     }
//   }

//   .remove_icon {
//     font-size: 1.6rem;
//     color: #e74c3c;
//     cursor: pointer;
//   }

//   .order-total--amount {
//     width: 100%;
//     margin: 4.8rem 0;
//     text-transform: capitalize;
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-end;
//     align-items: flex-end;

//     .order-total--subdata {
//       border: 0.1rem solid #f0f0f0;
//       display: flex;
//       flex-direction: column;
//       gap: 1.8rem;
//       padding: 3.2rem;
//     }
//     div {
//       display: flex;
//       gap: 3.2rem;
//       justify-content: space-between;
//     }

//     div:last-child {
//       background-color: #fafafa;
//     }

//     div p:last-child {
//       font-weight: bold;
//       color: ${({ theme }) => theme.colors.heading};
//     }
//   }

//   .checkout-btn {
//   background-color: #4caf50;
//   }

//   @media (max-width: ${({ theme }) => theme.media.mobile}) {
//     .grid-five-column {
//       grid-template-columns: 1.5fr 1fr 0.5fr;
//     }
//     .cart-hide {
//       display: none;
//     }

//     .cart-two-button {
//       margin-top: 2rem;
//       display: flex;
//       justify-content: space-between;
//       gap: 2.2rem;
//     }

//     .order-total--amount {
//       width: 100%;
//       text-transform: capitalize;
//       justify-content: flex-start;
//       align-items: flex-start;

//       .order-total--subdata {
//         width: 100%;
//         border: 0.1rem solid #f0f0f0;
//         display: flex;
//         flex-direction: column;
//         gap: 1.8rem;
//         padding: 3.2rem;
//       }
//     }
//   }
// `;

// export default Cart;



import React, { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import styled from "styled-components";
import { useCartContext } from "../context/cart-context";
import { useAuthContext } from "../context/auth-context";

const Cart = () => {

  const { cart, fetchCart, resetCart, removeFromCart } = useCartContext();

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user?._id]);

  const handleResetCart = () => {
    resetCart();
  };

  const handleProceedToContact = () => {

    // Construct WhatsApp message
    const message = cart
      .map((item, index) =>
        `*Item ${index + 1}:*\nName: ${item.name}\n${item.sku ? `SKU: ${item.sku}` : ''}\n${item.model ? `Model: ${item.model}` : ''}\n`
      )
      .join("\n") // Join product details with line breaks
      .concat("\nI would like to discuss customization options and the best prices for these products. Could you please assist me?\n");

    // .map(
    //   (item, index) =>
    //     `*Item ${index + 1}:*\nName: ${item.name}\nSKU: ${item.sku}\nImage: ${item.productImage}\n`
    // )
    // .join("\n");

    // WhatsApp base URL
    const baseUrl = `https://wa.me/919873241041` + `?text=${encodeURIComponent(message)}`;

    // Redirect to WhatsApp
    window.open(baseUrl, "_blank");
  };

  return (
    <>
      <CartWrapper>
        <div className="cart-page">
          <h1>Your Cart</h1>
          <div className="cart-container">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div className="cart-card" key={item.productId}>
                  <img src={item.productImage} alt={item.name} className="cart-card-image" />
                  <div className="cart-card-details">
                    <h3>{item?.name}</h3>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(user?._id, item?.productId)}
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
          <div className="cart-summary">
            <div className="cart-actions">
              <button className="checkout-btn" disabled={cart.length === 0} onClick={handleProceedToContact}>
                Contact Us
              </button>
              <button
                className="reset-cart-btn"
                onClick={handleResetCart}
                disabled={cart.length === 0}>
                Reset Cart
              </button>
            </div>
          </div>
        </div>
      </CartWrapper>
    </>
  );
};

export default Cart;



const CartWrapper = styled.section`
/* General Styles */
.cart-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.cart-page h1 {
  text-align: center;
  font-size:5rem;
  margin-bottom: 20px;
  color: #333;
}

/* Cart Container */
.cart-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.cart-card {
  display: flex;
  flex-direction: column;
  width: 300px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.cart-card:hover {
  transform: scale(1.02);
}

.cart-card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.cart-card-details {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
}

.cart-card-details h3 {
  margin: 0;
  color: #333;
}

.cart-card-details p {
  margin: 0;
  color: #555;
}

/* Quantity Controls */
.amount-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
}

.amount-toggle button {
  border: none;
  background: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.amount-toggle button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.amount-toggle span {
  font-size: 16px;
  font-weight: bold;
}

/* Remove Button */
.remove-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  margin-top:auto;
  display:flex;
  justify-content:center;
  align-items: center;
  gap:1rem;
}

.remove-btn:hover {
  background: #c82333;
}

/* Cart Summary */
.cart-summary {
  margin-top: 20px;
  text-align: center;
}

.cart-summary h2 {
  color: #333;
}

.checkout-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.checkout-btn:hover {
  background: #218838;
}

.checkout-btn:disabled {
  background: #ddd;
  cursor: not-allowed;
}

/* Reset Cart Button */
.reset-cart-btn {
  background: #ffc107;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
}

.reset-cart-btn:hover {
  background: #e0a800;
}

.reset-cart-btn:disabled {
  background: #ddd;
  cursor: not-allowed;
}

/* Actions Section */
.cart-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

`
