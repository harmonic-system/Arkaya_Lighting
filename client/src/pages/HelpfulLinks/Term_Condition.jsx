import React, { useState } from "react";
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";

const TermCondition = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div className="container">
        <Container>
          <Header>
            <Title>TERMS OF USE</Title>
            <Description>Last updated November 28, 2024</Description>
          </Header>
          <Background>
            <Content>
              <Accordion>
                {termsData.map((item, index) => (
                  <AccordionItem key={index}>
                    <AccordionHeader onClick={() => toggleAccordion(index)}>
                      <AccordionTitle>
                        <span>
                          {index + 1}. {item.title}
                        </span>
                      </AccordionTitle>
                      <AccordionIcon $isOpen={activeIndex === index}>
                        <FaChevronDown />
                      </AccordionIcon>
                    </AccordionHeader>
                    {activeIndex === index && (
                      <AccordionContent>
                        {item.content.map((section, i) => (
                          <div key={i}>
                            <ContentHeader>{section.header}</ContentHeader>
                            <ContentParagraph>{section.text}</ContentParagraph>
                          </div>
                        ))}
                      </AccordionContent>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </Content>
          </Background>
        </Container>
      </div>
    </>
  );
};

export default TermCondition;

// Sample data structure
const termsData = [
  {
    title: "Agreement to Terms",
    content: [
      {
        header: "Legally Binding Agreement",
        text: "These Terms of Use constitute a legally binding agreement between you and ArkayaLighting regarding your access to and use of the website https://www.arkayalighting.com/ and related media channels.",
      },
      {
        header: "Acceptance of Terms",
        text: "By accessing the Site, you agree to these Terms of Use. If you do not agree, you are prohibited from using the Site and must discontinue use immediately.",
      },
    ],
  },
  {
    title: "Supplemental Terms and Changes",
    content: [
      {
        header: "Incorporation of Supplemental Terms",
        text: "Supplemental terms or documents posted on the Site from time to time are incorporated into these Terms of Use.",
      },
      {
        header: "Modifications to Terms",
        text: "We reserve the right to modify these Terms at any time. Changes will be indicated by the 'Last Updated' date, and continued use of the Site after updates constitutes acceptance of the revised Terms.",
      },
    ],
  },
  {
    title: "Jurisdiction and Compliance",
    content: [
      {
        header: "Geographical Limitations",
        text: "The information on the Site is not intended for distribution or use in any jurisdiction where it would violate law or regulation or subject us to additional requirements.",
      },
      {
        header: "User Responsibility",
        text: "Users accessing the Site from other locations are responsible for complying with local laws.",
      },
    ],
  },
  {
    title: "Age Requirements",
    content: [
      {
        header: "Minimum Age",
        text: "The Site is intended for users who are at least 18 years old.",
      },
      {
        header: "Minors",
        text: "Minors under 18 must have the permission and direct supervision of a parent or guardian. The parent or guardian must read and agree to these Terms of Use before the minor uses the Site.",
      },
    ],
  },
  {
    title: "User Representations",
    content: [
      {
        header: "Representations and Warranties",
        text: "By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Use; (4) you are not under the age of 13; (5) you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Site; (6) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise; (7) you will not use the Site for any illegal or unauthorized purpose; and (8) your use of the Site will not violate any applicable law or regulation.",
      },
      {
        header: "Account Termination",
        text: "If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Site (or any portion thereof).",
      },
    ],
  },
  {
    title: "User Registration",
    content: [
      {
        header: "Registration Requirements",
        text: "You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password.",
      },
      {
        header: "Username Policy",
        text: "We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.",
      },
    ],
  },
  {
    title: "Products",
    content: [
      {
        header: "Product Descriptions",
        text: "We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products.",
      },
      {
        header: "Availability and Pricing",
        text: "All products are subject to availability, and we cannot guarantee that items will be in stock. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.",
      },
    ],
  },
  {
    title: "Purchases and Payment",
    content: [
      {
        header: "Accepted Payment Methods",
        text: "We accept Visa, Mastercard, American Express, Discover, PayPal, and Razorpay. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site.",
      },
      {
        header: "Payment Obligations",
        text: "You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorize us to charge your chosen payment provider for any such amounts upon placing your order.",
      },
    ],
  },
  {
    title: "Prohibited Activities",
    content: [
      {
        header: "Usage Restrictions",
        text: "You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.",
      },
    ],
  },
  {
    title: "User-Generated Contributions",
    content: [
      {
        header: "Contributions Guidelines",
        text: "The Site may invite you to create, submit, post, or display content. Any Contributions you transmit may be treated as non-confidential and non-proprietary. You represent and warrant that your Contributions will not violate any rights, laws, or regulations.",
      },
      {
        header: "Our Rights to Contributions",
        text: "We have the right to edit, redact, re-categorize, or delete Contributions at any time and for any reason, without notice. We have no obligation to monitor your Contributions.",
      },
    ],
  },
  {
    title: "Contribution License",
    content: [
      {
        header: "License Grant",
        text: "By posting your Contributions, you grant us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, worldwide license to use, reproduce, distribute, and display your Contributions for any purpose.",
      },
      {
        header: "Ownership",
        text: "You retain full ownership of your Contributions and any associated intellectual property rights. We are not liable for any statements or representations in your Contributions.",
      },
    ],
  },
  {
    title: "Guidelines for Reviews",
    content: [
      {
        header: "Review Criteria",
        text: "Reviews must be based on firsthand experience and must not contain offensive language, false statements, or references to illegal activity.",
      },
      {
        header: "Review Rights",
        text: "We may accept, reject, or remove reviews at our sole discretion. By posting a review, you grant us a perpetual, non-exclusive license to use and distribute your review.",
      },
    ],
  },
  {
    title: "SOCIAL MEDIA",
    content: [
      {
        header: "Linking Accounts",
        text: "You may link your account with third-party service providers by providing login information or granting us access under applicable terms. You represent that you have the right to disclose this information and allow access without violating third-party agreements.",
      },
      {
        header: "Third-Party Account Access",
        text: "By linking accounts, you allow us to access, store, and use content from your third-party accounts on the Site. This includes making social network content available and submitting additional data as notified. Disabling connections removes stored data except usernames and profile pictures.",
      },
      {
        header: "Third-Party Relationships",
        text: "Your relationship with third-party service providers is governed by their terms, and we are not responsible for reviewing or verifying social network content for accuracy, legality, or non-infringement.",
      },
    ],
  },
  {
    title: "SUBMISSIONS",
    content: [
      {
        header: "Ownership and Rights",
        text: "Any feedback, ideas, or suggestions you provide become our sole property. We hold exclusive rights, including intellectual property rights, to use and distribute these submissions for any purpose without acknowledgment or compensation.",
      },
      {
        header: "Waiver of Moral Rights",
        text: "You waive all moral rights to your submissions and warrant that they are original or submitted with proper rights. No recourse is available against us for alleged misappropriation or infringement.",
      },
    ],
  },
  {
    title: "THIRD-PARTY WEBSITES AND CONTENT",
    content: [
      {
        header: "Access to Third-Party Content",
        text: "The Site may contain links to third-party websites or content. We do not investigate or monitor these for accuracy or appropriateness and are not responsible for third-party content accessed through the Site.",
      },
      {
        header: "Use and Risks",
        text: "You access third-party websites at your own risk, and purchases made through them are solely between you and the third party. We do not endorse or hold responsibility for products, services, or content from third-party websites.",
      },
    ],
  },
  {
    title: "ADVERTISERS",
    content: [
      {
        header: "Responsibility of Advertisers",
        text: "Advertisers are solely responsible for their advertisements and related services or products. They must have rights and authority for their advertisements and ensure compliance with all applicable laws and regulations.",
      },
      {
        header: "Site Role",
        text: "We provide advertising space and have no additional relationship with advertisers beyond hosting their advertisements.",
      },
    ],
  },
  {
    title: "SITE MANAGEMENT",
    content: [
      {
        header: "Monitoring and Enforcement",
        text: "We may monitor the Site for violations, take legal action against offenders, restrict access, and remove burdensome content to ensure proper functionality and protection of rights.",
      },
      {
        header: "No Obligation",
        text: "We are not obligated to monitor or manage user contributions or site content actively, but we reserve the right to do so.",
      },
    ],
  },
  {
    title: "PRIVACY POLICY",
    content: [
      {
        header: "Data Privacy",
        text: "Your use of the Site is subject to our Privacy Policy, which outlines data collection and use practices. Accessing the Site from outside India constitutes consent to data processing in India.",
      },
      {
        header: "Policy Agreement",
        text: "By using the Site, you agree to the Privacy Policy terms, including any applicable regional data privacy regulations.",
      },
    ],
  },
  {
    title: "TERM AND TERMINATION",
    content: [
      {
        header: "Termination Rights",
        text: "We reserve the right to terminate or suspend your account and access to the Site for any reason, including breach of these Terms or applicable laws, without notice or liability.",
      },
      {
        header: "Account Restrictions",
        text: "If your account is terminated or suspended, creating a new account under any name is prohibited. Legal action may be taken for violations.",
      },
    ],
  },
  {
    title: "MODIFICATIONS AND INTERRUPTIONS",
    content: [
      {
        header: "Site Changes",
        text: "We may modify, remove, or discontinue content or services on the Site at our discretion without notice. This includes updates, maintenance, or resolving issues.",
      },
      {
        header: "Availability",
        text: "We do not guarantee continuous Site availability and are not liable for any loss caused by interruptions, downtimes, or discontinuation.",
      },
    ],
  },
  {
    title: "Governing Law",
    content: [
      {
        header: "Applicable Law",
        text: "These terms shall be governed by and defined following the laws of India.",
      },
      {
        header: "Jurisdiction",
        text: "ArkayaLighting and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.",
      },
    ],
  },
  {
    title: "Dispute Resolution",
    content: [
      {
        header: "Informal Negotiations",
        text: "To expedite resolution and control the cost of any dispute, the Parties agree to first attempt to negotiate any Dispute informally for at least __________ days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other.",
      },
      {
        header: "Binding Arbitration",
        text: "Any dispute arising out of or in connection with this contract shall be referred to and finally resolved by the International Commercial Arbitration Court under the European Arbitration Chamber. The number of arbitrators shall be __________. The seat of arbitration shall be __________. The language of the proceedings shall be __________. The governing law of the contract shall be the substantive law of __________.",
      },
      {
        header: "Restrictions",
        text: "The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. No arbitration shall be joined with any other proceeding, and there is no authority for Disputes to be arbitrated on a class-action basis.",
      },
      {
        header: "Exceptions to Arbitration",
        text: "The Parties agree that Disputes concerning intellectual property rights, theft, piracy, or injunctive relief are not subject to arbitration. Such Disputes shall be decided by a court of competent jurisdiction.",
      },
    ],
  },
  {
    title: "Corrections",
    content: [
      {
        header: "Right to Correct Errors",
        text: "We reserve the right to correct any typographical errors, inaccuracies, or omissions on the Site at any time, without prior notice.",
      },
    ],
  },
  {
    title: "Disclaimer",
    content: [
      {
        header: "No Warranties",
        text: "The Site is provided on an 'as-is' and 'as-available' basis. We disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.",
      },
      {
        header: "Limited Responsibility",
        text: "We assume no liability for errors, interruptions, unauthorized access, or issues arising from linked third-party websites or content.",
      },
    ],
  },
  {
    title: "Limitations of Liability",
    content: [
      {
        header: "Exclusions",
        text: "In no event will we or our representatives be liable for any direct, indirect, consequential, or punitive damages arising from your use of the Site.",
      },
      {
        header: "Liability Cap",
        text: "Our liability will be limited to the lesser of the amount paid by you to us or __________. Certain jurisdictions may not allow these limitations, and some exclusions may not apply.",
      },
    ],
  },
  {
    title: "Indemnification",
    content: [
      {
        header: "User Obligations",
        text: "You agree to indemnify and hold us harmless from any claims, damages, or liabilities arising from your use of the Site, breach of terms, or violation of rights.",
      },
      {
        header: "Exclusive Defense",
        text: "We reserve the right to assume exclusive defense and control of any matter requiring indemnification at your expense.",
      },
    ],
  },
  {
    title: "User Data",
    content: [
      {
        header: "Data Management",
        text: "We maintain certain data for managing the Site but are not liable for loss or corruption of any user-transmitted data.",
      },
      {
        header: "Responsibility",
        text: "You are solely responsible for backing up any data related to your use of the Site.",
      },
    ],
  },
  {
    title: "Electronic Communications, Transactions, and Signatures",
    content: [
      {
        header: "Consent to Electronic Records",
        text: "By using the Site, you consent to receive electronic communications and agree that they satisfy legal requirements for written communication.",
      },
      {
        header: "Waiver of Non-Electronic Methods",
        text: "You waive any rights requiring non-electronic signatures, delivery, or retention of records.",
      },
    ],
  },
  {
    title: "Miscellaneous",
    content: [
      {
        header: "Entire Agreement",
        text: "These Terms of Use constitute the entire agreement between you and us regarding the Site.",
      },
      {
        header: "Severability",
        text: "If any provision is deemed unlawful or unenforceable, the remaining provisions will remain in effect.",
      },
    ],
  },
  {
    title: "Contact Us",
    content: [
      {
        header: "Contact Information",
        text: "For complaints or inquiries, please contact us at: ArkayaLighting, 142/2, Patparganj Rd, Patparganj, Mayur Vihar Phase-1, New Delhi, 110091 Phone: +919654612012. Email: contact@arkayalighting.com.",
      },
    ],
  },
];

const Container = styled.div`
  margin: 3rem 0;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  background-color: #f2f2f2;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  width: 100%;
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

const Background = styled.div`
  width: 100%;
  background-color: #ffc221;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  width: 100%;
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
  font-size: 1.3rem;
  font-weight: bold;
`;

const AccordionIcon = styled.div`
  font-size: 1.5rem;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
`;

const AccordionContent = styled.div`
  padding: 15px;
  background-color: #fff;
`;

const ContentHeader = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 10px 0;
  color: #444;
`;

const ContentParagraph = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin: 5px 0;
  line-height: 1.6;
`;
