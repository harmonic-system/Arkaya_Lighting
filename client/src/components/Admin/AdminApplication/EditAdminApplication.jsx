import React, { useEffect, useState } from 'react';
import { useAdminContext } from '../../../context/admin-context';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../../styles/Button';
import { useAuthContext } from '../../../context/auth-context';
import ActionLoading from '../../Loading/ActionLoading';

const EditAdminApplication = () => {
    const { isLoading, singleApplication, getSingalApplication, updateApplication } = useAdminContext();
    const navigate = useNavigate()
    const { token } = useAuthContext();
    const { id } = useParams();

    const [applicationData, setApplicationData] = useState({
        applicationfile: "",
        imgpublicid: "",
        heading: "",
        about: ""
    });

    // Fetch single carousel data when token and id change
    useEffect(() => {
        if (token && id) {
            getSingalApplication(id);
        }
    }, [token, id]);

    // Update applicationData with singleApplication when it changes
    useEffect(() => {
        if (singleApplication) {
            setApplicationData({
                applicationfile: singleApplication?.applicationfile?.url,
                imgpublicid: singleApplication?.applicationfile?.public_id,
                heading: singleApplication?.heading,
                about: singleApplication?.about
            });
        }
    }, [singleApplication]);

    // File change handler
    const handleFileChange = (e) => {
        const applicationfile = e.target.files[0];
        if (applicationfile) {
            transforFile(applicationfile);
        }
    };

    // Convert applicationfile to base64 and set to applicationData
    const transforFile = (applicationfile) => {
        const reader = new FileReader();
        reader.readAsDataURL(applicationfile);
        reader.onloadend = () => {
            setApplicationData((prevState) => ({
                ...prevState,
                applicationfile: reader.result
            }));
        };
    };

    // Text input change handler
    const handleChange = (e) => {
        setApplicationData({
            ...applicationData,
            [e.target.name]: e.target.value
        });
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await updateApplication(id, applicationData)
            navigate("/admin/application")
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
                            name="applicationfile"
                            autoComplete="off"
                        />

                        <div className="container img-container">
                            <img src={applicationData.applicationfile} alt="Product" />
                        </div>
                        <input
                            type="text"
                            onChange={handleChange}
                            value={applicationData.heading}
                            name="heading"
                            placeholder="Heading"
                            autoComplete="off"
                            required
                        />
                        <input
                            type="text"
                            onChange={handleChange}
                            value={applicationData.about}
                            name="about"
                            placeholder="About This Application"
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

export default EditAdminApplication;

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