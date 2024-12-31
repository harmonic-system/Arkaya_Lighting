import styled from "styled-components";
import { useProductContext } from "../context/product-context";

const TechnologyPatners = () => {
  const { patner } = useProductContext()
  // const technologyPatner = [
  //   {
  //     name: "Led Stip Studio",
  //     des: "",
  //     image: "./images/patner/lss.png",
  //     link: "https://www.ledstripstudio.com/"
  //   },
  //   {
  //     name: "Black Trax",
  //     des: "",
  //     image: "./images/patner/blacktrax.png",
  //     link: "https://cast-soft.com/blacktrax/"
  //   },
  //   {
  //     name: "Digi Dot",
  //     des: "",
  //     image: "./images/patner/digidot.png",
  //     link: "https://digidot.eu/"
  //   },
  //   {
  //     name: "Wygarrow",
  //     des: "",
  //     image: "./images/patner/wygarrow.png",
  //     link: "https://cast-soft.com/wysiwyg/"
  //   },
  // ]
  return (
    <>
      <Wrapper>
        <div className="container">
          <div className="title">
            <h1>Our <strong className="black">Valued Partners</strong></h1>
            <span>Collaborating with leading brands to brighten your spaces</span>
          </div>
          <div className="grid grid-tem-view">
            {patner.map((patner, index) => (
              <a href={patner?.link} target="_blank" key={index} className="contact-box">
                <img src={patner?.technologypatnerfile?.url} alt={`${patner?.name}-image`} />
                <h3>{patner?.name}</h3>
                <p>{patner?.des}</p>
              </a>
            ))}
          </div>
        </div>

      </Wrapper>
    </>
  );
};

export default TechnologyPatners;

// Styled Components
const Wrapper = styled.section`
  padding: 5rem 1rem;
  background-color: #f9f9f9;

  .contact-box {
    padding: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    background-color: #ffffff;
    transition: all 0.3s ease-in-out;
    text-align: center;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    img {
      width: 100%;
      height: 150px;
      object-fit: contain;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.6rem;
      margin-bottom: 0.5rem;
      color: #333;
    }

    p {
      font-size: 1.2rem;
      color: #666;
      text-align: center;
    }
  }

  /* Mobile Responsiveness */
  @media (max-width: 768px) {
    padding: 3rem 1rem;

    .contact-box {
      padding: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .contact-box {
      padding: 1rem;
    }

    h3 {
      font-size: 1.4rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;