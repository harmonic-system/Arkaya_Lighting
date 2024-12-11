import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useProductContext } from '../../context/product-context';

// Custom Arrow Components
const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-arrow custom-arrow-next" onClick={onClick}>
            <IoIosArrowForward />
        </div>
    );
};

const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-arrow custom-arrow-prev" onClick={onClick}>
            <IoIosArrowBack />
        </div>
    );
};

const FeatherProduct = () => {
    const { products } = useProductContext();
    const [featherProducts, setFeatherProducts] = useState([]);

    const getAllFeatherProducts = () => {
        setFeatherProducts(products.filter((product) => product?.featured === true));
    };

    useEffect(() => {
        getAllFeatherProducts();
    }, [products]);

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0px',
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    if (!featherProducts || featherProducts.length === 0 || featherProducts.length === 1) {
        return null;
    }

    return (
        <CategoryWrapper>
            <div className="container">
                <div className="title">
                    <h1>Our <strong className="black">Feature Products</strong></h1>
                    <span>Best Product's for your space</span>
                </div>
                <section className="categories">
                    <Slider {...settings}>
                        {featherProducts.map((product) => (
                            <Link to={`/singleproduct/${product?._id}`} key={product?._id} className="categories-list">
                                <div className="categories__item">
                                    <img src={product?.productfile?.url} alt={product?.productname} />
                                    <p>{product?.productname}</p>
                                </div>
                            </Link>
                        ))}
                    </Slider>
                </section>
            </div>
        </CategoryWrapper>
    );
};

export default FeatherProduct;

const CategoryWrapper = styled.section`
    margin-top: 5rem;

    .categories {
        position: relative;
    }

    .categories-list {
        display: block;
        text-decoration: none;
        width: 100%;
    }

    .categories__item {
        margin: 0 10px;
        border: 1px solid #ebebeb;
        border-radius: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        transition: transform 0.3s ease-in-out;
        overflow: hidden;
        position: relative;
        background-color: #fff;
    }

    .categories__item:hover {
        transform: scale(1.05);
    }

    .categories__item img {
        width: 100%;
        height: auto;
        border-radius: 1rem;
        object-fit: cover;
    }

    .categories__item p {
        position: absolute;
        bottom: 10px;
        font-size: 16px;
        color: #fff;
        font-weight: bold;
        text-transform: uppercase;
        display: block;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
        padding: 5px;
    }

    .custom-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 24px;
        color: #1c1c1c;
        cursor: pointer;
        background-color: #fff;
        padding: 5px 10px;
        border: 1px solid #ebebeb;
        border-radius: 1rem;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .custom-arrow-next {
        right: -20px;
    }

    .custom-arrow-prev {
        left: -20px;
    }

    @media only screen and (max-width: 1200px) {
        .custom-arrow-next {
            right: -15px;
        }

        .custom-arrow-prev {
            left: -15px;
        }
    }
`;


