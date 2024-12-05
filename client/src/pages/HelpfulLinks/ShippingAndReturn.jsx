import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaChevronDown } from "react-icons/fa";

const ShippingAndReturns = () => {

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="container">
            <Container>
                <ChooseBg>
                    <InnerContainer>
                        <WhiteBg>
                            <Section>
                                <Title>Shipping & Returns</Title>
                                <Separator />
                                <CartSection>
                                    <Description>
                                        Arkaya Lighting products are shipped out every day, from Monday to Friday, except holidays. Most orders placed will be dispatched within 1-5 business days (except the products with "Delivery lead time").
                                    </Description>
                                    <Description>
                                        If your goods were shipped by air cargo, please contact us at <EmailLink href="mailto:sales@arkayalighting.com"><strong>sales@arkayalighting.com</strong></EmailLink>, should there be a delay.
                                    </Description>
                                    <Description>
                                        Please feel free to <Link to="/contact"><strong>contact us</strong></Link>, should you encounter any difficulties while trying to track your goods online.
                                    </Description>
                                </CartSection>
                            </Section>
                            <Section>
                                <Title>Return & Exchange Policy:</Title>
                                <Separator />
                                <CartSection>
                                    <Description>
                                        Your satisfaction is the goal we are after. If you are not satisfied with the merchandise you have bought, you may return within 30 days from the shipping date. All returned merchandise must be in the original package and must have all original tags attached. Refunds will not include shipping charges. <br />
                                        Exchanges are only acceptable for the same series merchandise in a different available type. We cannot exchange completely different merchandise. Exchanged merchandise can only be shipped out after we receive the returned goods and have a quality check. Customers are responsible for the shipping cost back to us, and we will not cover the shipping cost back to you.
                                    </Description>
                                </CartSection>
                            </Section>
                            <Section>
                                <Title>Return Procedure:</Title>
                                <Separator />
                                <CartSection>
                                    <Description>
                                        Email us the reason why you want to return the merchandise.<br />
                                        Deliver the item to the address we specify in the shipment (or another place we tell you). Please state all your information clearly inside your return including the original order number, buyer's name, address, and telephone number.<br />
                                        Returned merchandise must be in the same condition as we shipped out. We reserve the right to assess additional fees if the returned item is not in proper condition.
                                    </Description>
                                </CartSection>
                            </Section>
                        </WhiteBg>
                    </InnerContainer>
                    <Content>
                        <Title>Frequently Asked Questions about Shipping and Returns:</Title>
                        <Accordion>
                            {shippingAndReturnData.map((faq, index) => (
                                <AccordionItem key={index}>
                                    <AccordionHeader onClick={() => toggleAccordion(index)}>
                                        <AccordionTitle>
                                            <span>{index + 1}. {faq.question}</span>
                                        </AccordionTitle>
                                        <AccordionIcon $isOpen={activeIndex === index}><FaChevronDown /></AccordionIcon>
                                    </AccordionHeader>
                                    {activeIndex === index && (
                                        <AccordionBody>
                                            <p><strong></strong> {faq.answer}</p>
                                        </AccordionBody>
                                    )}
                                </AccordionItem>
                            ))}
                        </Accordion>

                    </Content>
                </ChooseBg>
            </Container>
        </div>
    );
};

export default ShippingAndReturns;

const shippingAndReturnData = [
    {
        question: "How much is the cost for shipping?",
        answer: "While ordering the product, our executive will give all these details."
    },
    {
        question: "What happens after I place my order?",
        answer: "Our ordering system immediately emails you a copy of your latest order once you're placed an order. You will also receive another email from us in about 1-5 business days to inform you of the status of your order. Please ensure that you are using your correct email account to view your email copy(i.e. the same email address you specified while ordering)."
    },
    {
        question: "Can I cancel my order?",
        answer: "Customer satisfaction is important to all of us at Arkaya Lighting. We will ship your merchandise as quickly as possible. If your order has not yet shipped, we can cancel it for you. However, we shall not be able to process a cancellation once your order has been shipped."
    },
    {
        question: "What should I do if the goods received are damaged?",
        answer: "All products are carefully wrapped with utmost care to ensure a safe delivery to its destination. In case of damage during shipment, please file your damage claims to the delivering carrier immediately, and notify us within 72 hours of receipt of damaged merchandise by you."
    },
    {
        question: "Are delivery dates guaranteed?",
        answer: "We cannot guarantee delivery dates for circumstances beyond our control (e.g., unsuccessful delivery attempts, carrier weather delays, incorrect addresses, etc.) NO refunds will be issued under these circumstances."
    },
    {
        question: "Can I specify a future delivery date?",
        answer: "Yes, you can specify a future delivery date. Please contact us."
    },
    {
        question: "Where will you ship your products?",
        answer: "Right now, we will ship to all over the world."
    },
    {
        question: "How long would it take to receive my items after placing order?",
        answer: "The total time required would be order processing time plus shipping time. A rough estimate for delivering to any major city in the world would be as below: Stock Orders with Air Parcel Shipment: ~ 11 to 16 working days, Stock Orders with Express Shipment: ~3 to 6 working days, Alteration or Custom-made Orders with Air Parcel Shipment: ~ 14 to 19 working days, Alteration or Custom-made Orders with Express Shipment: ~ 8 to 13 working days."
    },
    {
        question: "When will my order be shipped?",
        answer: "All stock merchandise will be dispatched for shipment within 1-3 working days of receipt of order. Please allow an additional 3-5 working days for custom-made or alteration service."
    },
    {
        question: "What will happen if I give an incorrect shipping address?",
        answer: "PLEASE be certain of your address before ordering! Unfortunately, your product will probably not get to its destination in time for the important occasion if you supply an incorrect address when ordering."
    },
    {
        question: "What happens in the event of lost packages?",
        answer: "Although we offer Express and registered postings, we would suggest delivery by UPS or DHL. In an effort to further your shopping experience with us, arkayalighting has decided to protect customers on any loss of packages sent to you via UPS or Registered Post."
    },
    {
        question: "I still haven't received my package within the time you specified?",
        answer: "We usually need 1-3 working days to process your order before it is shipped out. Once it's shipped, it will take another 7-10 working days for your package to arrive at its shipping address."
    },
    {
        question: "I haven't received any information about my order status?",
        answer: "You should have received an acknowledgement approximately the status of your order in about 1-5 business days after you had placed your order."
    },
    {
        question: "Can I have a refund if I reject my package when it is delivered?",
        answer: "If customers reject the package because of customs issues or other issues arising at their side, we will not be responsible for arranging any refund towards the rejected package."
    },
    {
        question: "How do I exchange items?",
        answer: "The best way to arrange for an exchange is to contact our staff who will give you correct instructions pertaining to your particular order."
    }
];

// Styled Components
const Container = styled.div`
  margin: 2rem 0;
`;

const ChooseBg = styled.div`
  background-color: #ffc221; /* Light background color */
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const InnerContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const WhiteBg = styled.div`
  background-color: #fff; /* White background for the main content */
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin-top: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
`;

const Separator = styled.hr`
  margin: 1rem 0;
  border: 1px solid #ddd;
`;

const CartSection = styled.div`
  padding: 1rem;
`;

const Description = styled.p`
  font-size: 1.5rem;
  color: #333;
  margin: 0.5rem 0;
  line-height: 1.5;

  a{
  color: #ffc221;
  }
`;

const EmailLink = styled.a`
  color: #ffc221;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Content = styled.div`
  width:100%;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
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

const AccordionIcon = styled.span`
  font-size: 1.5rem;
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
