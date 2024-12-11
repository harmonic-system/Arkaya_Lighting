import React from 'react'
import { FaTrash } from "react-icons/fa";
import FormatPrice from '../../Helper/FormatPrice';
import { useCartContext } from '../../context/cart-context';
import { FaMinus, FaPlus } from "react-icons/fa";
import { useAuthContext } from '../../context/auth-context';

const CartItems = ({ productImage, name, productId, price, quantity, totalPrice }) => {

  const { removeFromCart, updateQuantity } = useCartContext()
  const { user } = useAuthContext();

  const handleUpdateQuantity = (productId, quantity) => {
    updateQuantity(user?._id, productId, quantity);
  };

  return (
    <>
      <div className="cart_heading grid grid-five-column">
        <div className="cart-image--name">
          <div>
            <figure>
              <img src={productImage} alt={productId} />
            </figure>
          </div>
          <div>
            <p>{name}</p>
          </div>
        </div>

        {/* price   */}

        <div className="cart-hide">
          <p>
            <FormatPrice price={price} />
          </p>
        </div>

        {/* Quantity  */}
        <div className="amount-toggle">
          <button
            onClick={() => handleUpdateQuantity(productId, quantity - 1)}
            disabled={quantity === 1}>
            <FaMinus />
          </button>
          <div className="amount-style">{quantity}</div>
          <button onClick={() => handleUpdateQuantity(productId, quantity + 1)}>
            <FaPlus />
          </button>
        </div>

        {/* //Subtotal */}
        <div className="cart-hide">
          <p>
            <FormatPrice price={totalPrice} />
          </p>
        </div>

        <div>
          <FaTrash className="remove_icon" onClick={() => removeFromCart(user?._id, productId)} />
        </div>
      </div>
    </>
  )
}

export default CartItems


