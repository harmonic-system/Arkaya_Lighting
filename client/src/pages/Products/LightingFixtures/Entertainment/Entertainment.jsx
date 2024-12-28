import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCategoryContext } from "../../../../context/category-context";

const Entertainment = () => {
  const { setCategoryinlocalStorage } = useCategoryContext()
  return (
    <>
      <Wrapper>
        <div className="products-image">
          <div className="container">
            <div className="title">
              <h1>Our <strong className="black">Entertainment Lighting</strong> Products</h1>
              <span>Dynamic lighting solutions to elevate your entertainment spaces</span>
            </div>
          </div>
          <div className="container">
            <div className="grid grid-three-column">
              <Link to="/products" onClick={() => setCategoryinlocalStorage("Moving Head Series Lamps")}>
                <div className="products-image-box">
                  <img src="images/products/Entertainment/mhslamp.png" alt="mhslampcategory-image" />
                  <h3>Moving Head Series - Lamp</h3>
                </div>
              </Link>
              <Link to="/products" onClick={() => setCategoryinlocalStorage("Moving Head Series Leds")}>
                <div className="products-image-box">
                  <img src="images/products/Entertainment/mhsled.jpg" alt="mhsledcategory-image" />
                  <h3>Moving Head Series - LED</h3>
                </div>
              </Link>
              <Link to="/products" onClick={() => setCategoryinlocalStorage("Static Leds")}>
                <div className="products-image-box">
                  <img src="images/products/Entertainment/staticled.avif" alt="staticledcategory-image" />
                  <h3>Static LED</h3>
                </div>
              </Link>
              <Link to="/products" onClick={() => setCategoryinlocalStorage("Effect Lights")}>
                <div className="products-image-box">
                  <img src="images/products/Entertainment/effectslight.avif" alt="effectslightcategory-image" />
                  <h3>Effects Light</h3>
                </div>
              </Link>
            </div>
            <p>Entertainment lighting is the art of using light to enhance performances, events, and spaces. It goes beyond basic illumination to create atmospheres that evoke emotions and amplify experiences. Through color, intensity, and movement, it transforms stages, concerts, and themed environments into immersive spectacles. Advanced technologies like LEDs and intelligent lighting control systems allow for precise, dynamic effects that sync with sound and narrative, captivating audiences and enhancing storytelling. Entertainment lighting designers collaborate closely with directors, producers, and performers to craft visual narratives that resonate, ensuring each moment is heightened with drama, emotion, and spectacle, making it an integral part of the entertainment experience.</p>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

export default Entertainment;

const Wrapper = styled.section`
.grid{
  gap:20px;
}

.products-image {
  background: #fff;
  padding-top: 90px;
  margin-bottom: 50px;
}

h1{
  font-size: 3rem;
}

span{
  font-size: 1.8rem;
}

.products-image .products-image-box {
  padding: 30px 20px;
  box-shadow: #00000040 0px 0px 19px 0px;
  margin-bottom: 30px;
  text-align: center;
  height: 300px;
  border-radius: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.products-image .products-image-box img {
  height: 80%;
  border-radius: 20px;
  width: 80%;
  transition: transform 0.3s ease;
}

.products-image .products-image-box h3 {
  font-weight: 500;
  font-size: 22px;
  line-height: 22px;
  color: #050000;
  padding: 20px 0px;
}

.products-image .products-image-box:hover {
  transform: scale(1.05);
  box-shadow: #00000070 0px 0px 19px 0px;
}

@media (max-width: 768px) {
  .grid-three-column {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 525px) {
  .grid-three-column {
    grid-template-columns: repeat(1, 1fr);
  }
}
`