import React from 'react'
import styled from 'styled-components'

const HomeText = () => {
  return (
    <Wrapper>
      <div className="container">
        <h1>
        Welcome to Arkaya Lighting, your ultimate destination for high-quality lights and accessories. We offer an extensive range of Lighting products to customize any lighting, illuminate your indoor and outdoor space in a stylish and efficient way. Discover our versatile selection of LED light strips, including COB LED strip, addressable LED strip, flex LED neon lights, etc. They create a vibrant and eye-catching ambiance effortlessly, perfect for adding a captivating glow to any room or accentuating architectural features. To ensure the perfect lighting experience, we offer LED strip diffuser which diffuses light evenly and reduces glare to give your space a polished look with dotless linear light. Additionally, our smart LED Controller and LED power supply systems ensure stable and efficient performance for your LED lighting control. Illuminate your home and commercial spaces with Super Lighting LED. Shop now and find the best LED lighting solution for your project.
      </h1>
      </div>
    </Wrapper>
  )
}

export default HomeText

const Wrapper = styled.section`
  text-align: center;
  display: flex;
  justify-content: center;
  padding: 0 20px;
  
  h1 {
    width: 100%;
    line-height: 1.8;
    text-align: justify;
    font-size: 1.6rem;
    font-weight: 500;
    margin: 0 auto;
  }

  @media (max-width: 1024px) {
    h1 {
      font-size: 1.4rem;
      line-height: 1.6;
      padding: 0 20px;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.4rem;
      padding: 0 15px;
    }
  }

  @media (max-width: 425px) {
    h1 {
      font-size: 1.2rem;
      padding: 0 10px;
    }
  }
`
