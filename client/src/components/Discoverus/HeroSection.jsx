import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../styles/Button";

const HeroSection = () => {

  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          <div className="hero-section-data">
            <p className="intro-data">Welcome to </p>
            <h1> Arkaya Lighting </h1>
            <p>
              Arkaya Lighting is a dynamic company specializing in the trading and distribution of cutting-edge lighting and video equipment. Renowned for their innovative solutions, Arkaya seamlessly blends technology and design, catering to diverse industries. With a commitment to excellence, they illuminate spaces and elevate experiences through their high-quality products and services.
            </p>
            <NavLink to="/products">
              <Button>shop now</Button>
            </NavLink>
          </div>
          {/* our homepage image  */}
          <div className="hero-section-image">
            <figure>
              <img
                src="images/arkaya-logo-transformed.png"
                alt="hero-section-photo"
                className="img-style"
              />
            </figure>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default HeroSection;

const Wrapper = styled.section`
  padding: 10rem 2rem;

  /* Hero Section Text Content */
  .hero-section-data {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .intro-data {
      font-size: 1.6rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.helper};
      margin-bottom: 1rem;
    }

    h1 {
      font-size: 4rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.primary};
      margin-bottom: 2rem;
    }

    p {
      font-size: 1.6rem;
      line-height: 1.8;
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 3rem;
      text-align: justify;
    }

    a {
      text-decoration: none;
    }
  }

  /* Hero Section Image */
  .hero-section-image {
    display: flex;
    justify-content: center;
    align-items: center;

    figure {
      position: relative;
      width: 100%;
      max-width: 500px;

      img {
        width: 100%;
        height: auto;
        border-radius: 1rem;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    padding: 5rem 2rem;

    .hero-section-data {
      h1 {
        font-size: 3rem;
      }

      p {
        font-size: 1.4rem;
      }
    }

    .hero-section-image {
      figure {
        img {
          max-width: 300px;
        }
      }
    }
  }
`;

