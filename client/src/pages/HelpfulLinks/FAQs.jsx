import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaChevronDown } from "react-icons/fa";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container">
      <Container>
          <Header>
            <Title>Frequently Asked Questions :</Title>
            <Description>
              Thank you for visiting our online store. Here we are providing the frequently asked questions as well as the answers to assist you. We hope it make clear and informative for you online shopping. Honest seller, 100% satisfaction, easy return policy, safe payment, and fast shipping.
            </Description>
          </Header>
        <Background>
          <Content>

            <Accordion>
              {faqData.map((faq, index) => (
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

export default FAQs;

const faqData = [
  { question: "Is it safe to order online?", answer: "Our website is secured with the latest protective security. Arkaya Lighting chooses products to sell based on their excellent designs and proven hardware reliability. So the quality is guaranteed. We check all of your orders during the packing stage to make sure that the right accessories are included and that the adapters and other standards are correct for your country. We have a OQC team who tests your ordered products are functioning correctly before they are packed and sent to you. This is in addition to the normal quality assurance checks that all the goods have passed in the factory line." },
  { question: "Why Buy from Arkaya Lighting?", answer: "We have the lowest prices. We cut out the middle man and sell at wholesale prices directly to the public. This means big savings on quality products. Show us a lower price on lights or any item we sell. At Arkaya Lighting, we sell only the finest quality merchandise. Our lights products have been sold in the Worldwide." },
  { question: "How to contact us?", answer: <>We believe in the timeliness of customer service, and will do everything possible to satisfy our customers. If you have any problems, comments, or suggestions, please contact our customer service representatives. Click <Link to="/contact"><b>here</b></Link> for any questions, We normally respond to all enquiries within 1 working day expect the holiday.</> },
  { question: "Does it scram for your site?", answer: "We do not cheat any customers. We have engaged in online retail products for years. We hope do business with you for long terms and create a pleasant shopping experience so that you will get your contact about us. That you can be rest assured buy from us" },
  { question: "How long does shipping take?", answer: "The time of receipt will be order processing time plus shipping time. A rough estimate for delivering to any major city in the world would be as below: Stock Orders with Air Parcel Shipment: ~ 10 to 15 working days Stock Orders with Express Shipment: ~4 to 7 working days Alteration or Custom-made Orders with Air Parcel Shipment: ~ 15 to 20 working days Alteration or Custom-made Orders with Express Shipment: ~ 7 to 12 working days" },
  { question: "Which payment method do you support?", answer: "We're working on our payment methods. Soon You can Order Lighting Products from website" },
  { question: "Can I have my order shipped to a P.O Box?", answer: "No, unfortunately not. Since we deliver by courier to your door, upon receipt of the product an adult must be available to sign for the package, so we can't ship to P.O Boxes." },
  { question: "How long will it take for my order to be processed?", answer: "Most of the orders are processed and shipped within 2-5 days. However there could be delay if any error happens." },
  { question: "What is the process if I want to buy your product?", answer: "When you want to buy the product you find, click on whatsapp link and get in touch with us on whatsapp." },
  { question: "Which shipping method do you use?", answer: "All international shipments are shipped via DHL,UPS,TNT,FedEx express. Save more money now enjoying real brand new quality ." },
  { question: "Can delivery address be different from the billing address?", answer: <>To change your address after order or any issue regarding address, you can <a href="mailto:arkayalighting@gmail.com"><b>mail</b></a> us or <a href="tel:+912255889966"><b>make a call</b></a> to our support executive</> },
  { question: "When and how can I check on my order status?", answer: "Soon we'll launch this features in our website." },
  { question: "Can I exchange or cancel an order?", answer: "Customer satisfaction is important to all of us at Arkaya Lighting. We will ship your merchandise as quickly as possible. If your order has not yet shipped, we can cancel it for you. However, we shall not be able to process a cancellation once your order has been shipped." }
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

