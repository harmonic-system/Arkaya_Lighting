import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../context/auth-context';
import { Button } from '../../styles/Button';

const EditUserProfile = () => {
    const { user, updateUser } = useAuthContext();

    const [profileDetails, setProfileDetails] = useState({
        name: "",
        email: "",
        phone: "",
        organization: ""
    });

    useEffect(() => {
        if (user) {
            setProfileDetails({
                name: user.name,
                email: user.email,
                phone: user.phone,
                organization: user.organization
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileDetails({
            ...profileDetails,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await updateUser(profileDetails);
            if (response.status === 200) {
            }
        } catch (err) {
            console.log('Error updating profile:', err);
        }
    };

    return (
        <EditProfileWrapper>
            <div className="container">
                <div className="contact-form">
                    <form className="contact-inputs" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={profileDetails.name}
                            onChange={handleInputChange}
                            placeholder="User Name"
                        />
                        <input
                            type="email"
                            name="email"
                            value={profileDetails.email}
                            onChange={handleInputChange}
                            placeholder="User Email"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={profileDetails.phone}
                            onChange={handleInputChange}
                            placeholder="User Phone"
                        />
                        <input
                            type="text"
                            name="organization"
                            value={profileDetails.organization}
                            onChange={handleInputChange}
                            placeholder="User Organization"
                        />
                        <Button type="submit">Save Changes</Button>
                    </form>
                </div>
            </div>
        </EditProfileWrapper>
    );
};

export default EditUserProfile;

const EditProfileWrapper = styled.section`
    padding: 5rem;

    .contact-form {
        width: 100%;
        margin: auto;

        .text-success {
            text-align: center;
            font-size: 1.5rem;
            font-weight: bold;
            color: #38c8a8;
            margin-bottom: 3rem;
        }

        .contact-inputs {
            display: flex;
            flex-direction: column;
            gap: 3rem;

            input {
                border-radius: 1rem;
            }

            textarea {
                border-radius: 1rem;
                resize: none;
            }

            Button {
                cursor: pointer;
                transition: all 0.2s;
                padding: 1rem;
                border-radius: 1rem;
                background-color: #007bff;
                color: #fff;
                border: none;

                &:hover {
                    background-color: #0056b3;
                }
            }
        }
    }
`;

