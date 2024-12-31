import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Button } from '../../../styles/Button';
import { useAdminContext } from '../../../context/admin-context';
import { useAuthContext } from '../../../context/auth-context';
import { IoClose } from "react-icons/io5";
import LoadingPage from '../../Loading/Loading';

const AdminFullViewTechnologyPatnerDetails = ({ patnerId, closeModal }) => {
    const { token } = useAuthContext();
    const { isLoading, singlePatner, getSingalPatner } = useAdminContext();

    const [technologyPatnerData, setTechnologyPatnerData] = useState({
        technologypatnerfile: "",
        name: "",
        des: "",
        link:""
    });

    useEffect(() => {
        if (token && patnerId) {
            getSingalPatner(patnerId);
        }
    }, [token, patnerId]);

    useEffect(() => {
        if (singlePatner) {
            setTechnologyPatnerData({
                technologypatnerfile: singlePatner?.technologypatnerfile?.url,
                name: singlePatner?.name,
                des: singlePatner?.des,
                link: singlePatner?.link
            });
        }
    }, [singlePatner]);

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <AdminFullViewTechnologyPatnerDetailsWrapper>
            <div className="modal">
                <div className="modal-content">
                    {/* Close Button */}
                    <Button type="button" className="top-close-btn" onClick={closeModal} style={{ position: "sticky", top: "2rem", marginLeft: "auto" }} >
                        <IoClose />
                    </Button>

                    <div className="product-container">
                        {/* Product Image */}
                        <div className="product-gallery">
                            <img
                                src={technologyPatnerData?.technologypatnerfile}
                                alt={technologyPatnerData.name}
                                className="main-image"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="product-info">
                            <h1 className="product-name">{technologyPatnerData.name}</h1>
                            {/* Description */}
                            <div className="product-description">
                                <p>
                                    <strong style={{
                                        textTransform: "capitalize",
                                        marginBottom: "10px",
                                        display: "inline-block"
                                    }}>
                                        Description:
                                    </strong> {technologyPatnerData.des}
                                </p>
                            </div>
                            {/* Link */}
                            <div className="product-description">
                                <p>
                                    <strong style={{
                                        textTransform: "capitalize",
                                        marginBottom: "10px",
                                        display: "inline-block"
                                    }}>
                                        Link:
                                    </strong> {technologyPatnerData.link}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="modal-actions">
                                <Link className='edit-btn-link' to={`/admin/edittechnologyPatner/${singlePatner?._id}`}>
                                    <Button className='edit-btn'>
                                        Edit
                                    </Button>
                                </Link>
                                <Button className='close-btn' onClick={closeModal}>Close</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminFullViewTechnologyPatnerDetailsWrapper>
    );
};

export default AdminFullViewTechnologyPatnerDetails;

const AdminFullViewTechnologyPatnerDetailsWrapper = styled.section`
  .modal {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8); /* Semi-transparent background */
    justify-content: center;
    align-items: center;
    z-index: 10; 
    backdrop-filter: blur(5px); /* Blur effect for a modern look */
  }

  .modal-content {
    width: 90%;
    max-width: 1200px;
    max-height: 90%;
    background: #fff;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    position: relative;

    /* Animation */
    animation: fadeInFromCenter 0.5s ease-out;
  }

  @keyframes fadeInFromCenter {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Close Button */
  .top-close-btn {
  background: #ccc;
  color: #333;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
      background: #bbb;
  }
}

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
    gap: 1rem;
  }

  /* Product Container */
  .product-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .product-gallery {
    flex: 1;
    max-width: 400px;
  }

  .main-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: contain !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .product-info {
    flex: 2;
    padding: 1rem;
  }

  .product-name {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #333;
  }

  /* Description */
  .product-description {
    margin-top: 1.5rem;
    line-height: 1.6;
  }

  /* Buttons */
  .close-btn {
    background: #6c757d;
    color: #fff;
    border-radius: 8px;
    padding: 0.6rem 1.2rem;
    cursor: pointer;
  }

  .close-btn:hover {
    background: #5a6268;
  }

  .edit-btn {
    background: #007bff;
    color: #fff;
    border-radius: 8px;
    padding: 0.6rem 1.2rem;
    cursor: pointer;
  }

  .edit-btn:hover {
    background: #0056b3;
  }

  /* Responsive Design */
  @media screen and (max-width: 768px) {
    .product-container {
      flex-direction: column;
    }

    .modal-content {
      width: 95%;
      padding: 1rem;
    }

    .product-gallery,
    .product-info {
      max-width: 100%;
    }

    .modal-actions {
      flex-direction: column;
      align-items: center;
    }

    .close-btn,
    .edit-btn {
      width: 100%;
      margin-bottom: 0.5rem;
    }
  }
`;
