import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaChevronDown } from "react-icons/fa";

const PrivacyPolicy = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="container">
            <Container>
                <Header>
                    <Title>Privacy Notice</Title>
                    <Description>
                        Thanks for placing orders on our arkayalighting online store. We sincerely wish you have a great shopping experience here. And we have committed to protecting the privacy of our customers.
                    </Description>
                </Header>
                <Background>
                    <Content>

                        <Accordion>
                            {privactPolicyData.map((faq, index) => (
                                <AccordionItem key={index}>
                                    <AccordionHeader onClick={() => toggleAccordion(index)}>
                                        <strong>{index + 1}. Question:</strong> {faq.question}
                                        <AccordionIcon $isOpen={activeIndex === index}><FaChevronDown /></AccordionIcon>
                                    </AccordionHeader>
                                    {activeIndex === index && (
                                        <AccordionBody>
                                            <p><strong>Answer:</strong> {faq.answer}</p>
                                        </AccordionBody>
                                    )}
                                </AccordionItem>
                            ))}
                        </Accordion>

                    </Content>
                </Background>
            </Container>
        </div>
    );
};

export default PrivacyPolicy;

const privactPolicyData = [
    { question: "CONTACT OUR AFTER-SALES SUPPORT TEAM", answer: "Please mail our dedicated After-Sales Support Email at sales@arkayalighting.com for immediate help with: Technical issues, Installation questions, returns, and product exchanges.Alternatively, fill out this form and we'll get back to you within one business day. Help us assist you better: Contact For returns and exchanges, list the products and the reason for the return. Please also understand our terms before you submit." },
    { question: "Your Privacy Information:", answer: "We value your privacy information, so your privacy information will be protected, Our arkayalighting online store is committed to safeguarding your privacy when making online purchases. When registering our account, users shall provide the personal registration information. And as part of the order process, we only collect following essential customer information: Name, Email, Phone Number. The contact information is only used to get in touch with you when necessary. The information you provide to us is not given or sold to any outside party except for the shipping company delivering your order. We only share your shipping address and phone number with the shipping company. The information we collect from you is used only to process and ship your order. Your email address is used only to provide you with an order confirmation and tracking number. Your phone number is used to contact you in case of a problem with the fulfillment or delivery of your order." },
    { question: "Automatic Information collected by us:", answer: "Whenever you visit our Web site we collect and store information such as cookies which remember information about a visitor from one page to the next and from one visit to the next. We collect and analyze the IP address used to connect your computer to the Internet; login; password; computer and connection information such as your browser type and version; operating system and platform; purchase history; confirmation when you open e-mail that we send you; the URLs which lead you to and around our Web site including the date and time; the pages and or products you viewed or searched for and the phone number used to call our voice telephone numbers. Your browser allows you to reject cookies and software is available from third parties which will allow you to visit our Web site without providing this information. You are welcomed at our Web site if you use this software but we will not be able to offer you our personalized services." },
    { question: "Security:", answer: "Our Web site protects the security of personal information you transmit to us by using Secure Sockets Layer (SSL) software, which encrypts the information you input during the transmission to us. We do not reveal your personal information when we confirm your order. In order to protect against unauthorized access to your account you should sign off when you finish visiting our site." },
    { question: "Contact Us with Any Question:", answer: "If you have any questions, concerns, or comments about our privacy notice, please kindly E-mail us. We respect your privacy and we will not share the information you provide us with outside companies or organizations. We have your best interest at heart and believe you will appreciate our conviction to your security. This is our commitment." },

    // Add other questions as objects in this array
];

const Container = styled.div`
  margin:3rem 0 ;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  gap:2rem;
  background-color: #f2f2f2;
  padding: 2rem;
`;

const Background = styled.div`
  width: 100%;
  background-color: #ffc221;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  width:100%;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
`;

const Header = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.5rem;
  color: #666;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const Accordion = styled.div`
  margin-top: 2rem;
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 0.5rem 0;
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 500;
  color: #333;
  padding: 2rem;
  &:hover {
    background-color: #f2f2f2;
    color: #ffc221;
  }
`;

const AccordionIcon = styled.span`
  margin-left:auto;
  font-size: 1.5rem;
  transform: rotate(${($props) => ($props.isOpen ? "180deg" : "0deg")});
  transition: transform 0.3s ease;
`;

const AccordionBody = styled.div`
  padding: 2rem;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;

  a{
  color:#ffc221}
`;

