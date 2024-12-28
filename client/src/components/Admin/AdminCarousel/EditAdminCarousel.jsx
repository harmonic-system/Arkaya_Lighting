import React, { useEffect, useState } from 'react';
import { useAdminContext } from '../../../context/admin-context';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../../styles/Button';
import { useAuthContext } from '../../../context/auth-context';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import LoadingPage from '../../Loading/Loading';

const EditAdminCarousel = () => {
  const { isLoading, singleCarousel, getSingalCarousel, updateCarousel } = useAdminContext();
  const navigate = useNavigate()
  const { token } = useAuthContext();
  const { id } = useParams();

  const [carouselData, setCarouselData] = useState({
    file: "",
    imgpublicid: "",
    heading: "",
    description: ""
  });

  // Fetch single carousel data when token and id change
  useEffect(() => {
    if (token && id) {
      getSingalCarousel(id);
    }
  }, [token, id]);

  // Update carouselData with singleCarousel when it changes
  useEffect(() => {
    if (singleCarousel) {
      setCarouselData({
        file: singleCarousel?.file?.url,
        imgpublicid: singleCarousel?.file?.public_id,
        heading: singleCarousel?.heading,
        description: singleCarousel?.description
      });
    }
  }, [singleCarousel]);

  // File change handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      transforFile(file);
    }
  };

  // Convert file to base64 and set to carouselData
  const transforFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCarouselData((prevState) => ({
        ...prevState,
        file: reader.result
      }));
    };
  };

  // Text input change handler
  const handleChange = (e) => {
    setCarouselData({
      ...carouselData,
      [e.target.name]: e.target.value
    });
  };

  const handleDeleteImage = () => {
    setCarouselData((prevState) => ({ ...prevState, file: null }))
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await updateCarousel(id, carouselData)
      navigate("/admin/carousel")
    } catch (error) {
      console.error(error)
    }
  };

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <AdminFormWrapper>
      <section className="container upload-product-section">
        <div className="header-bar">
          <h2>Update Carousel</h2>
        </div>
        <div className="contact-form">
          <form className="contact-inputs" onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div className="form-group">
              <label htmlFor="productImage" className="upload-label">
                <div className="upload-content">
                  <FaCloudUploadAlt size={35} />
                  <p>Upload Image</p>
                </div>
                <input
                  id="productImage"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
              <div className="uploaded-images">
                {carouselData.file && (
                  <div className="image-thumbnail">
                    <img
                      src={carouselData.file}
                      alt={`${carouselData.heading}-image`}
                      className="thumbnail-image"
                    />
                    <MdDelete
                      className="delete-icon"
                      onClick={handleDeleteImage}
                    />
                  </div>
                )}
              </div>
            </div>

            <input
              type="text"
              onChange={handleChange}
              value={carouselData.heading}
              name="heading"
              placeholder="Heading"
              autoComplete="off"
              required
            />
            <input
              type="text"
              onChange={handleChange}
              value={carouselData.description}
              name="description"
              placeholder="Short Description"
              autoComplete="off"
              required
            />
            <Button type="submit">Update Carousel</Button>
          </form>
        </div>
      </section>
    </AdminFormWrapper>
  );
};

export default EditAdminCarousel;

const AdminFormWrapper = styled.div`
  .upload-product-section {
    padding: 20px;
    background-color: #f9f9f9;
  }
    
  .header-bar {
    padding: 10px;
    margin-bottom: 30px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    position: relative;

    label {
      font-size:1.2rem
    }
  }

  .upload-label {
    padding: 20px;
    border: 2px dashed #ccc;
    text-align: center;
    cursor: pointer;
  }

  .uploaded-images {
    margin-top: 30px;
    display: flex;
    gap: 10px;
  }

  .image-thumbnail {
    position: relative;
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
  }

  .thumbnail-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .delete-icon {
    position: absolute;
    top: 5px;
    right: 5px;
    color: red;
    cursor: pointer;
  }

  .submit-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
  }

  .contact-inputs {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    input {
      border-radius: 1rem;
    }

    Button {
      // max-width: 50rem;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background-color: ${({ theme }) => theme.colors.white};
        border: 1px solid ${({ theme }) => theme.colors.btn};
        color: ${({ theme }) => theme.colors.btn};
        transform: scale(0.9);
      }
    }
  }
`;