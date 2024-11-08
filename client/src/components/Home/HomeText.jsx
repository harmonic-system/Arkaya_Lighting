import React from 'react'
import styled from 'styled-components'

const HomeText = () => {
  return (
    <>
    <Wrapper>
    <p> <big> Welcome to Arkaya Lighting, your ultimate destination for high-quality lights and accessories. We offer an extensive range of Lighting products to customize any lighting, illuminate your indoor and outdoor space in a stylish and efficient way. Discover our versatile selection of LED light strips, including COB LED strip, addressable LED strip, flex LED neon lights, etc. They create a vibrant and eye-catching ambiance effortlessly, perfect for adding a captivating glow to any room or accentuating architectural features. To ensure the perfect lighting experience, we offer LED strip diffuser which diffuses light evenly and reduces glare to give your space a polished look with dotless linear light. Additionally, our smart LED Controller and LED power supply systems ensure stable and efficient performance for your LED lighting control. Illuminate your home and commercial spaces with Super Lighting LED. Shop now and find the best LED lighting solution for your project.</big></p>
    </Wrapper>
    </>
  )
}

export default HomeText

const Wrapper = styled.section`
  text-align: center;
  display: flex;
  justify-content: center;

p {
  width: 80%;
  line-height:2;
  text-align:justify;
}
`