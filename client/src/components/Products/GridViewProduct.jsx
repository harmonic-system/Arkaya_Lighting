import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../../Helper/FormatPrice";
import QueryBox from "./QueryBox";

const GridViewProduct = (curElem) => {
    const { _id, productname, productfile, model,price,sku } = curElem;

    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [newsletterId, setNewsLetterId] = useState(null);

    return (
        <div className="card">
            <NavLink to={`/singleproduct/${_id}`}>
                <figure>
                    <img src={productfile.url} alt={productname} />
                    {/* <figcaption className="caption">{model}</figcaption> */}
                </figure>

            </NavLink>
            <div className="card-data">
                <div className="card-data-flex">
                    <h3>{productname?.length < 20 ? productname : productname?.slice(0, 15) + "..."}</h3>
                    {price ? <FormatPrice price={price} /> : <QueryBox productId={ _id} productName={productname} sku={sku} />}
                    {/* <p className="card-data--price">{<FormatPrice price={price} />}</p> */}
                </div>
            </div>
        </div>
    );
};

export default GridViewProduct;
