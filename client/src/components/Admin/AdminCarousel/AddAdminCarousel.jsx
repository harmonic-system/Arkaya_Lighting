import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../../styles/Button';
import { useAdminContext } from '../../../context/admin-context';
import { useNavigate } from 'react-router-dom';
import ActionLoading from '../../Loading/ActionLoading';

const AddAdminCarousel = () => {

  const [carouselData, setCarouselData] = useState({
    file: null,
    heading: "",
    description: "",
  })

  const { isLoading, addCarousel } = useAdminContext()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCarouselData({
      ...carouselData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await addCarousel(carouselData)
      navigate("/admin/carousel")
    } catch (error) {
      console.error(error)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    transforFile(file)
  }

  const transforFile = (file) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setCarouselData(prevState => ({
        ...prevState,
        file: reader.result
      }));
    }
  }
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
              required
              autoComplete="off"
            />

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
            <Button type="submit">{isLoading ? <ActionLoading /> : "Add Carousel"}</Button>
          </form>
        </div>
      </div>
    </AdminFormWrapper>
  )
}

export default AddAdminCarousel

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