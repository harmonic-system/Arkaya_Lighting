import React from 'react';
import styled from 'styled-components';
import NewAddressForm from '../components/Checkout/NewAddressForm';
import AllSavedAddress from '../components/Checkout/AllSavedAddress';
// import PromoCode from '../components/Checkout/PromoCode';

const Checkout = () => {

    return (
        <CheckoutWrapper>
            {/* <div className="container">
                <PromoCode />
            </div> */}
            <div className='container grid grid-two-column'>
                <AllSavedAddress />
                <NewAddressForm />
            </div>
        </CheckoutWrapper>
    );
};

export default Checkout;

const CheckoutWrapper = styled.section`
margin-top:50px;
`