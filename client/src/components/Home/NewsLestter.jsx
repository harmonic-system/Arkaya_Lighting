import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../styles/Button'
import { useContactContext } from '../../context/contact-context'

const NewsLestter = () => {

    const { newsletter, loading } = useContactContext()

    const [newsubscriber, setNewSubscriber] = useState({
        newsletteremail: ""
    })

    const handleNewsletterInput = (e) => {
        setNewSubscriber({
            ...newsubscriber,
            [e.target.name]: e.target.value
        })
    }

    const handleNewsletter = async (e) => {
        e.preventDefault()
        try {
            await newsletter(newsubscriber.newsletteremail)
            setNewSubscriber({
                newsletteremail: ""
            })
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <NewsLetterWrapper>
                <div className="container">
                    <div className="title">
                        <h1>Our <strong className="black">Newsletter</strong></h1>
                        <span>Subscribe our newsletter</span>
                    </div>
                    <div className="newsletter-container">
                        <div className="newsletter">
                            <form onSubmit={handleNewsletter}>
                                <input className="" placeholder="Enter Your Email To Subscribe" type="email" name="newsletteremail" required
                                    onChange={handleNewsletterInput} value={newsubscriber.newsletteremail} />
                                <Button type="submit">{loading ? "Subscribing...." : "Subcribe"}</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </NewsLetterWrapper>
        </>
    )
}

export default NewsLestter

const NewsLetterWrapper = styled.section`
padding: 3rem 0;

.newsletter-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .newsletter{
        width: 60%;
        display: flex;
        
    
        & form{
            width: 100%;
            display: flex;
            gap: 1rem;
            justify-content: center;
            // border: 1px solid black;

        & input{
            width: 100%;
            padding: 1rem;
            border: none;
            background-color: #f2f2f2;
            border-radius: 5px;
            transition: background-color 0.3s ease;
    
            &:focus{
                background-color: #e6e6e6;
                border: 2px solid ${({ theme }) => theme.colors.border};
            }
        }
    }
}

@media (min-width: 200px) and (max-width: 525px) {

    .newsletter{
        width: 100%;
        flex-direction: column;
        flex-wrap: wrap;
    
        & form{
            flex-direction: column;

            & input{
                padding: 2rem;
                // width: 100%;
            }
        }
    }
}
`