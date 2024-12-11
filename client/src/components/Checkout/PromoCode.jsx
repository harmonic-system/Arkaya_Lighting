import React, { useState } from 'react'
import styled from 'styled-components';
import { useCartContext } from '../../context/cart-context';

const PromoCode = () => {

    const { cart } = useCartContext();
    const [promoCode, setPromoCode] = useState('');

    const [totalPrice, setTotalPrice] = useState(25); // Initial total price

    const handlePromoCodeChange = (e) => {
        setPromoCode(e.target.value);
    };


    const handlePromoCodeSubmit = (e) => {
        e.preventDefault();
        if (promoCode === 'DISCOUNT10') {
            setTotalPrice((prevPrice) => prevPrice * 0.9); // 10% discount
            alert('Promo code applied! 10% off');
        } else {
            alert('Invalid promo code');
        }
    };

    return (
        <>
        <PromoCodeWrapper>
                <div className="cart-summary">
                    <h4 className="cart-header">
                        <span>Your cart</span>
                        <span className="badge">{cart?.length}</span>
                    </h4>
                    <ul className="cart-list">
                        <li className="cart-item">
                            <div>
                                <h6>Product name</h6>
                                <small>Brief description</small>
                            </div>
                            <span className="price">${totalPrice}</span>
                        </li>
                        <li className="cart-item total">
                            <strong>Total (USD)</strong>
                            <strong>${totalPrice}</strong>
                        </li>
                    </ul>

                    <form className="promo-code-form" onSubmit={handlePromoCodeSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="promo-input"
                                placeholder="Promo code"
                                value={promoCode}
                                onChange={handlePromoCodeChange}
                            />
                            <button type="submit" className="btn-redeem">
                                Redeem
                            </button>
                        </div>
                    </form>
                </div>
        </PromoCodeWrapper>
        </>
        
    )
}

export default PromoCode


const PromoCodeWrapper = styled.section`
margin-top:30px;
margin-bottom:30px;

.cart-summary {
  width: 100%;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  span {
    font-size: 18px;
  }
}

.badge {
  background-color: #0d6efd;
  color: #fff;
  padding: 5px 10px;
  border-radius: 12px;
}

.cart-list {
  list-style: none;
  padding: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #dee2e6;
}

.total {
  font-weight: bold;
}

.price {
  color: #6c757d;
}

.promo-code-form {
  display: flex;
  margin-top: 20px;
}

.promo-input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.btn-redeem {
  padding: 5px 10px;
  background-color
}
`