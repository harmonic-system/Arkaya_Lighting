import React, { useState } from 'react';
import styled from 'styled-components';
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
                    <AccordionTitle>
                      <span>{index + 1}. {faq.question}</span>
                    </AccordionTitle>
                    <AccordionIcon $isOpen={activeIndex === index}><FaChevronDown /></AccordionIcon>
                  </AccordionHeader>
                  {activeIndex === index && (
                    <AccordionBody>
                      <p>{faq.answer}</p>
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
  {
    question: "What information do you collect when I purchase from your store?",
    answer: "We collect personal information such as your name, address, and email address as part of the buying and selling process. Additionally, we automatically receive your computer's IP address to understand your browser and operating system."
  },
  {
    question: "How do you use my information for email marketing?",
    answer: "With your permission, we may send you emails about our store, new products, and other updates."
  },
  {
    question: "How do you obtain my consent for collecting my information?",
    answer: "We imply your consent when you provide personal information to complete transactions, verify credit cards, place orders, arrange deliveries, or return purchases. For secondary uses, such as marketing, we will ask for your explicit consent or provide an opt-out option."
  },
  {
    question: "How can I withdraw my consent?",
    answer: "You can withdraw your consent by contacting us at [contact@arkayalighting.com] or by mailing us at [arkayalighting@gmail.com]."
  },
  {
    question: "Under what circumstances may my personal information be disclosed?",
    answer: "We may disclose your personal information if required by law or if you violate our Terms of Service."
  },
  {
    question: "How is payment information handled?",
    answer: "We use Razorpay for payment processing, which adheres to PCI-DSS standards. Your card data is encrypted during processing and not stored on their servers."
  },
  {
    question: "What should I know about third-party service providers?",
    answer: "Third-party providers collect, use, and disclose your information only as necessary for their services. We encourage you to review their privacy policies as they may operate under different jurisdictional laws."
  },
  {
    question: "What happens when I leave your website through a link?",
    answer: "Once you leave our website or are redirected to a third-party site, you are no longer governed by our Privacy Policy or Terms of Service."
  },
  {
    question: "How do you protect my personal information?",
    answer: "We take reasonable precautions and follow industry best practices to ensure your personal information is not lost, misused, accessed, disclosed, altered, or destroyed."
  },
  {
    question: "Do you use cookies on your website?",
    answer: "Yes, we use cookies to maintain user sessions, but they are not used to personally identify you on other websites."
  },
  {
    question: "What is the age requirement for using your website?",
    answer: "By using our site, you confirm that you are at least the age of majority in your state or province, or you have the consent of your guardian if you are a minor."
  },
  {
    question: "Can this Privacy Policy change?",
    answer: "Yes, we reserve the right to update this Privacy Policy at any time. Changes take effect immediately upon posting on the website. We will notify you of any material changes."
  },
  {
    question: "How can I contact you regarding my personal information?",
    answer: "You can contact our Privacy Compliance Officer at [contact@arkayalighting.com] or mail us at [arkayalighting@gmail.com]."
  }
]

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
  justify-content: space-between;
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

const AccordionTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const AccordionIcon = styled.div`
  font-size: 1.3rem;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
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

