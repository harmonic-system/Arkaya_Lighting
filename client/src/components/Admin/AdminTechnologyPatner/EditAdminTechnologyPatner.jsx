import React, { useEffect, useState } from 'react';
import { useAdminContext } from '../../../context/admin-context';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../../styles/Button';
import { useAuthContext } from '../../../context/auth-context';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import LoadingPage from '../../Loading/Loading';

const EditAdminTechnologyPatner = () => {
    const { isLoading, singlePatner, getSingalPatner, updatePatner } = useAdminContext();
    const navigate = useNavigate()
    const { token } = useAuthContext();
    const { id } = useParams();

    const [technologyPatnerData, setTechnologyPatnerData] = useState({
        technologypatnerfile: "",
        imgpublicid: "",
        name: "",
        des: "",
        link: ""
    });

    // Fetch single carousel data when token and id change
    useEffect(() => {
        if (token && id) {
            getSingalPatner(id);
        }
    }, [token, id]);

    // Update technologyPatnerData with singlePatner when it changes
    useEffect(() => {
        if (singlePatner) {
            setTechnologyPatnerData({
                technologypatnerfile: singlePatner?.technologypatnerfile?.url,
                imgpublicid: singlePatner?.technologypatnerfile?.public_id,
                name: singlePatner?.name,
                des: singlePatner?.des,
                link: singlePatner?.link
            });
        }
    }, [singlePatner]);

    // File change handler
    const handleFileChange = (e) => {
        const technologypatnerfile = e.target.files[0];
        if (technologypatnerfile) {
            transforFile(technologypatnerfile);
        }
    };

    // Convert technologypatnerfile to base64 and set to technologyPatnerData
    const transforFile = (technologypatnerfile) => {
        const reader = new FileReader();
        reader.readAsDataURL(technologypatnerfile);
        reader.onloadend = () => {
            setTechnologyPatnerData((prevState) => ({
                ...prevState,
                technologypatnerfile: reader.result
            }));
        };
    };

    // Text input change handler
    const handleChange = (e) => {
        setTechnologyPatnerData({
            ...technologyPatnerData,
            [e.target.name]: e.target.value
        });
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await updatePatner(id, technologyPatnerData)
            navigate("/admin/technologyPatner")
        } catch (error) {
            console.error(error)
        }
    };

    const handleDeleteImage = () => {
        setTechnologyPatnerData((prevState) => ({ ...prevState, technologypatnerfile: null }))
    };

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <EditAdminTechnologyPatnerWrapper>
            <section className="container upload-product-section">
                <div className="header-bar">
                    <h2>Update Technology Patner</h2>
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
                                {technologyPatnerData.technologypatnerfile && (
                                    <div className="image-thumbnail">
                                        <img
                                            src={technologyPatnerData.technologypatnerfile}
                                            alt={`${technologyPatnerData.name}-image`}
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
                            value={technologyPatnerData.name}
                            name="name"
                            placeholder="Name"
                            autoComplete="off"
                            required
                        />
                        <input
                            type="text"
                            onChange={handleChange}
                            value={technologyPatnerData.des}
                            name="des"
                            placeholder="Short Description"
                            autoComplete="off"
                        />
                        <input
                            type="text"
                            onChange={handleChange}
                            value={technologyPatnerData.link}
                            name="link"
                            placeholder="Link"
                            autoComplete="off"
                            required
                        />
                        <Button type="submit">Update Application</Button>
                    </form>
                </div>
            </section>
        </EditAdminTechnologyPatnerWrapper>
    );
};

export default EditAdminTechnologyPatner;

const EditAdminTechnologyPatnerWrapper = styled.div`
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