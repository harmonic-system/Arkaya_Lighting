import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../../context/admin-context";
import LoadingPage from "../../Loading/Loading";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AddAdminThemeCategory = () => {
  const [themeCategoryData, setThemeCategoryData] = useState({
    themeCategoryFile: null,
    title: "",
    des: ""
  });

  const { isLoading, addThemeCategory } = useAdminContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setThemeCategoryData({
      ...themeCategoryData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addThemeCategory(themeCategoryData);
      navigate("/admin/themeCategory");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    const themeCategoryFile = e.target.files[0];
    transforFile(themeCategoryFile);
  };

  const transforFile = (themeCategoryFile) => {
    const reader = new FileReader();

    reader.readAsDataURL(themeCategoryFile);
    reader.onloadend = () => {
      setThemeCategoryData((prevState) => ({
        ...prevState,
        themeCategoryFile: reader.result,
      }));
    };
  };

  const handleDeleteImage = () => {
    setThemeCategoryData((prevState) => ({
      ...prevState,
      themeCategoryFile: null,
    }));
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <AddAdminThemeCategoryWrapper>
        <section className="container upload-product-section">
          <div className="header-bar">
            <h2>Add Theme Category</h2>
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
                  {themeCategoryData.themeCategoryFile && (
                    <div className="image-thumbnail">
                      <img
                        src={themeCategoryData.themeCategoryFile}
                        alt={`${themeCategoryData.title}-image`}
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
                value={themeCategoryData.title}
                name="title"
                placeholder="Title"
                autoComplete="off"
                required
              />

              <input
                type="text"
                onChange={handleChange}
                value={themeCategoryData.des}
                name="des"
                placeholder="Give a Short Description"
                autoComplete="off"
              />
              <button type="submit" className="submit-button">Add Theme Category</button>
            </form>
          </div>
        </section>
      </AddAdminThemeCategoryWrapper>
    </>
  );
};

export default AddAdminThemeCategory;

const AddAdminThemeCategoryWrapper = styled.div`
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
      font-size: 1.2rem;
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
