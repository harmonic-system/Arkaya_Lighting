import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import FormatPrice from "../../Helper/FormatPrice";
import QueryBox from "./QueryBox";
import { FaHeart } from 'react-icons/fa';
import { useWishListContext } from "../../context/wishlist-context";
import { useAuthContext } from "../../context/auth-context";
import toast from "react-hot-toast";

const GridViewProduct = (curElem) => {
    const { _id, productname, productfile, model, price, sku } = curElem;
    const { addToWishList } = useWishListContext()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleAddToWishlist = (productId) => {
        if (user) {
            addToWishList(productId)
        } else {
            navigate("/login")
            toast("Please Login")
        }
    }

    return (
        <div className="card">
            <NavLink to={`/singleproduct/${_id}`}>
                <figure>
                    <img src={productfile.url} alt={productname} />
                    <figcaption className="caption" onClick={() => { handleAddToWishlist(_id) }}>{<FaHeart />}</figcaption>
                </figure>

            </NavLink>
            <div className="card-data">
                <div className="card-data-flex">
                    <h3>{productname?.length < 20 ? productname : productname?.slice(0, 15) + "..."}</h3>
                    {price ? <p className="card-data--price">{<FormatPrice price={price} />}</p> : <QueryBox productId={_id} productName={productname} sku={sku} />}
                </div>
            </div>
        </div>
    );
};

export default GridViewProduct;
