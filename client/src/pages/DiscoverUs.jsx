import styled from "styled-components";
import HeroSection from "../components/Discoverus/HeroSection";

const DiscoverUs = () => {

  const data = {
    name: "Arkaya Lighting is a dynamic company specializing in the trading and distribution of cutting-edge lighting and video equipment. Renowned for their innovative solutions, Arkaya seamlessly blends technology and design, catering to diverse industries. With a commitment to excellence, they illuminate spaces and elevate experiences through their high-quality products and services.",
  };

  return (
    <>
      {/* {myName} */}
      <HeroSection />
      <Wrapper>

        <div className="container">
          <h2>Know About Us ?</h2>

          <p> Arkaya Lighting is an excellent online retailer specializing in Lighting products. At arkaya lighting, we offer smart Lighting for Everything.</p>

          <p>Arkaya Lighting has been dedicated to helping customers get the best Lighting for their needs for years, and provides quality customization services to customers.</p>

          <p>Arkaya Lighting offers a complete Lighting system . Our product line is comprehensive, including various LED light fixtures (LED strip lights, LED neon lights, LED module string lights, LED stair lights, LED wall washer lights, LED diffusers, LED channels, LED fiber optic lights, LED linear bar lights...), LED light control systems ( Miboxer, Skydance, Ltech, Bincolor ), LED power supply systems ( power adapter, switching power supply, lithium battery, waterproof / rainproof led power supply, CCTV power supply box ), and LED light accessories.</p>

          <p>Arkaya Lighting is a Leading Supplier of Lights to Industrial, Commercial, Residential, Retail and Hospitality Projects in India. Light Concepts started its journey as a quality product supplier catering to all segments of customers.</p>

          <h3><strong>Over the years we have been able to win the trust and confidence of our Customers because of following attributes:</strong></h3>

          <ul>
            <li style={{ listStyleType: "disc" }}>Excellent Value for Money Preposition</li>
            <li style={{ listStyleType: "disc" }}>Timely Deliveries</li>
            <li style={{ listStyleType: "disc" }}>Customization as per the Client brief</li>
            <li style={{ listStyleType: "disc" }}>Right Price for the right Product.</li>
            <li style={{ listStyleType: "disc" }}>Timely Service.</li>
            <li style={{ listStyleType: "disc" }}>Onsite Support in case of Any Challenges in execution of the project.</li>
          </ul>

          <br />
          <br />

          <p>Due to the above attributes our customers treat us as part of their inhouse team, which helps them in timely execution of their projects. Our clients entrust us with their most challenging situations, to focus on other critical things and we deliver as per their expectations time and again.</p>
          <p>At Arkaya Lighting we believe in CVP - Customer Vendor Partnership. Which builds a trustworthy alliance focusing on deliverables.</p>

          <h2 style={{marginTop:"50px"}}>Our Key Points</h2>

          <p><strong>Quality Assurance - </strong>We test our products before we send them out to ensure that the items you receive are ready for use.</p>

          <p><strong>Many years of experience in the LED lights industry, experienced.</strong></p>

          <p><strong>Product competitiveness & price competitiveness. - </strong>Constantly optimize our products and prices.</p>

          <p><strong>Pre-sales and after-sales service - </strong>Provide professional lighting solution services to help customers make informed decisions about LED lighting.</p>

          <p><strong>Information Security - </strong>Login to the website, all your information is private and secure.</p>


        </div>
      </Wrapper>
    </>
  );
};

export default DiscoverUs;

const Wrapper = styled.section`

  margin-bottom:50px;

  h2{
  margin-bottom:40px;
  }

  p{
    margin-bottom:10px;
  }

  h3{
  margin-top:40px;
  margin-bottom:40px;
  }

  ul li{
  line-height:40px;
  font-size:15px;
  }
`