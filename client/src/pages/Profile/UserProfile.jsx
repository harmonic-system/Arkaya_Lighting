import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../context/auth-context';

const UserProfile = () => {

    const { user } = useAuthContext()

    const [profileDetails, setProfileDetails] = useState({
        name: "",
        email: "",
        phone: "",
        organization: ""
    })

    useEffect(() => {
        if (user) {
            setProfileDetails({
                name: user.name,
                email: user.email,
                phone: user.phone,
                organization: user.organization
            })
        }
    }, [user])

    return (
        <ProfileWrapper>
            <div className="container">
                <div className="contact-form">
                    <form className="contact-inputs">
                        <input
                            type="text"
                            value={profileDetails.name}
                            placeholder="User Name"
                            readOnly
                        />
                        <input
                            type="text"
                            value={profileDetails.email}
                            placeholder="User Email"
                            readOnly
                        />
                        <input
                            type="text"
                            value={profileDetails.phone}
                            placeholder="User Phone"
                            readOnly
                        />
                        <input
                            type="text"
                            value={profileDetails.organization}
                            placeholder="User Organization"
                            readOnly
                        />
                    </form>
                </div>
            </div>
        </ProfileWrapper>
    );
};

export default UserProfile;

const ProfileWrapper = styled.section`
padding:5rem;
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
