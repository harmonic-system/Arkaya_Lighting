import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../../styles/Button'
import { useNavigate } from 'react-router-dom'
import { useAdminContext } from '../../../context/admin-context'
import ActionLoading from '../../Loading/ActionLoading'

const AddAdminApplication = () => {

    const [applicationData, setApplicationData] = useState({
        applicationfile: null,
        heading: "",
        about: "",
    })

    const { isLoading, addApplication } = useAdminContext()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setApplicationData({
            ...applicationData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await addApplication(applicationData)
            navigate("/admin/application")
        } catch (error) {
            console.error(error)
        }
    }

    const handleFileChange = (e) => {
        const applicationfile = e.target.files[0]
        transforFile(applicationfile)
    }

    const transforFile = (applicationfile) => {
        const reader = new FileReader()

        reader.readAsDataURL(applicationfile)
        reader.onloadend = () => {
            setApplicationData(prevState => ({
                ...prevState,
                applicationfile: reader.result
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
                            name="applicationfile"
                            required
                            autoComplete="off"
                        />

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
                            placeholder="About"
                            autoComplete="off"
                            required
                        />
                        <Button type="submit">{isLoading ? <ActionLoading /> : "Add Application"}</Button>
                    </form>
                </div>
            </div>
        </AdminFormWrapper>
    )
}

export default AddAdminApplication

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