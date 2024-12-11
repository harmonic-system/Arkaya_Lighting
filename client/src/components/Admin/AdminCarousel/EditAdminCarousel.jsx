import React, { useEffect, useState } from 'react';
import { useAdminContext } from '../../../context/admin-context';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../../styles/Button';
import { useAuthContext } from '../../../context/auth-context';
import ActionLoading from '../../Loading/ActionLoading';

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

  return (
    <AdminFormWrapper>
      <div className="container">
        <div className="contact-form">
          <form className="contact-inputs" onSubmit={handleSubmit}>
            <input
              type="file"
              onChange={handleFileChange}
              placeholder="Image"
              name="file"
              autoComplete="off"
            />
            
            <div className="container img-container">
              <img src={carouselData.file} alt="Product" />
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
            <Button type="submit">{isLoading ? <ActionLoading /> : "Update Application"}</Button>
          </form>
        </div>
      </div>
    </AdminFormWrapper>
  );
};

export default EditAdminCarousel;

const AdminFormWrapper = styled.section`
.contact-form {
        width: 100%;
        margin: auto;

        .text-success{
          text-align: center;
          font-size: 1.5rem;
          font-weight: bold;
          color:#38c8a8;
          margin-bottom: 3rem;
        }

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input {
            border-radius: 1rem
          }

          .img-container {
            width: 200px;

            img {
              width: 100%;
              height: auto;
            }
          }

          textarea {
            border-radius: 1rem;
            resize: none;
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
      }
`