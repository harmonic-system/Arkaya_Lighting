import { Link } from "react-router-dom";
import { useCategoryContext } from "../../../../context/category-context";
import styled from "styled-components";

const LEDPixels = () => {
  const { setCategoryinlocalStorage } = useCategoryContext()
  return (
    <>
      <Wrapper>
        <div className="products-image">
          <div className="container">
            <div className="title">
              <h1>Our <strong className="black">LED Pixel Lighting</strong> Products</h1>
              <span>Advanced LED pixel solutions for dynamic and creative lighting designs</span>
            </div>
          </div>
          <div className="container">
            <div className="grid grid-three-column">
              <Link to="/products" onClick={() => setCategoryinlocalStorage("Strips")}>
                <div className="products-image-box">
                  <img src="images/products/LEDPixels/strip.avif" alt="stripcategory-image" />
                  <h3>Strips</h3>
                </div>
              </Link>
              <Link to="/products" onClick={() => setCategoryinlocalStorage("Dot Pixels")}>
                <div className="products-image-box">
                  <img src="images/products/LEDPixels/dotpixel.jpeg" alt="dotpixelcategory-image" />
                  <h3>DOT Pixels</h3>
                </div>
              </Link>
              <Link to="/products" onClick={() => setCategoryinlocalStorage("Led Matrixes")}>
                <div className="products-image-box">
                  <img src="images/products/LEDPixels/ledmatrix.jpg" alt="ledmatrixcategory-image" />
                  <h3>LED Matrix</h3>
                </div>
              </Link>
              <Link to="/products" onClick={() => setCategoryinlocalStorage("Neon Flex")}>
                <div className="products-image-box">
                  <img src="images/products/LEDPixels/neonflex.jpg" alt="ledmatrixcategory-image" />
                  <h3>Neon Flex</h3>
                </div>
              </Link>
              <Link to="/products" onClick={() => setCategoryinlocalStorage("Media Pixel Bar")}>
                <div className="products-image-box">
                  <img src="images/products/LEDPixels/mediapixelbar.jpg" alt="ledmatrixcategory-image" />
                  <h3>Media Pixel Bar</h3>
                </div>
              </Link>
              <Link to="/products" onClick={() => setCategoryinlocalStorage("360 Media Bar")}>
                <div className="products-image-box">
                  <img src="images/products/LEDPixels/360mediatube.jpg" alt="ledmatrixcategory-image" />
                  <h3>360 Media Bar</h3>
                </div>
              </Link>
              <Link to="/products" onClick={() => setCategoryinlocalStorage("Led Rings")}>
                <div className="products-image-box">
                  <img src="images/products/LEDPixels/ledrings.png" alt="ledmatrixcategory-image" />
                  <h3>Led Rings</h3>
                </div>
              </Link>
            </div>
            <p>LED pixel lighting revolutionizes visual displays by combining individual LEDs into programmable units, known as pixels. Each pixel can emit its own color and brightness, enabling intricate patterns, animations, and dynamic effects previously impossible with traditional lighting. Used in large-scale displays, concerts, architectural lighting, and signage, LED pixels offer versatility and creativity. They enhance visual impact through seamless integration, precise control, and synchronization with music or video, transforming static environments into dynamic, interactive experiences. This technology's flexibility in design and energy efficiency has made it a preferred choice for creating immersive lighting installations that engage and captivate audiences worldwide.</p>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

export default LEDPixels;

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