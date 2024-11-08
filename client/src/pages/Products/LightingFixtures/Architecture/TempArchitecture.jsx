import { Link } from "react-router-dom"
import styled from "styled-components"
import { useCategoryContext } from "../../../../context/category-context"

const TempArchitecture = () => {
    const { setCategoryinlocalStorage } = useCategoryContext()

    return (
        <>
            <Wrapper>
                <div className="products-image">
                    <div className="container">
                        <div className="grid grid-three-column">
                            <Link to="/products" onClick={() => setCategoryinlocalStorage("floodlights")}>
                                <div className="products-image-box">
                                    <img src="./images/products/Architecture/temp/flood-light.jpg" />
                                    <h3>Flood Lights</h3>
                                </div>
                            </Link>
                            <Link to="/products" onClick={() => setCategoryinlocalStorage("undergroundlights")}>
                                <div className="products-image-box">
                                    <img src="./images/products/Architecture/temp/underground-Light.jpg" />
                                    <h3>Underground Lights</h3>
                                </div>
                            </Link>
                            <Link to="/products" onClick={() => setCategoryinlocalStorage("underwaterlights")}>
                                <div className="products-image-box">
                                    <img src="./images/products/Architecture/temp/underwater-lights.jpeg" />
                                    <h3>Underwater Lights</h3>
                                </div>
                            </Link>
                            <Link to="/products" onClick={() => setCategoryinlocalStorage("wallwashers")}>
                                <div className="products-image-box">
                                    <img src="./images/products/Architecture/temp/wall-washer.jpg" />
                                    <h3>Wall Washer Lights</h3>
                                </div>
                            </Link>
                            <Link to="/products" onClick={() => setCategoryinlocalStorage("treehangings")}>
                                <div className="products-image-box">
                                    <img src="./images/products/Architecture/temp/tree-hugging.jpg" />
                                    <h3>Tree Hanging Lights</h3>
                                </div>
                            </Link>
                            <Link to="/products" onClick={() => setCategoryinlocalStorage("mediapixels")}>
                                <div className="products-image-box">
                                    <img src="./images/products/Architecture/temp/media-pixels.jpeg" />
                                    <h3>Media Pixels Light</h3>
                                </div>
                            </Link>
                        </div>
                        <p>
                            Architecture lighting plays a pivotal role in shaping the ambiance and functionality of spaces. Beyond mere illumination, it accentuates architectural features, guides circulation, and enhances user experience. From natural daylight integration to artificial solutions like LEDs, it balances practical needs with aesthetic intent, creating dynamic environments that evolve throughout the day. Thoughtful lighting design considers energy efficiency, sustainability, and human well-being, aligning with the architectural vision to foster comfort and visual appeal. Whether highlighting textures, defining volumes, or setting moods, architecture lighting transforms spaces into engaging, functional, and visually striking settings that resonate with their occupants.</p>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default TempArchitecture

const Wrapper = styled.section`
.grid{
  gap:20px;
}

.products-image {
  background: #fff;
  padding-top: 90px;
  margin-bottom: 50px;
}

.products-image .products-image-box {
  padding: 30px 20px;
  box-shadow: #00000040 0px 0px 19px 0px;
  margin-bottom: 30px;
  text-align: center;
  height: 300px;
  border-radius: 1rem;
}

.products-image .products-image-box img {
  height: 80%;
  border-radius: 20px;
  width: 80%;
}

.products-image .products-image-box h3 {
  font-weight: 500;
  font-size: 22px;
  line-height: 22px;
  color: #050000;
  padding: 20px 0px;
}

@media (max-width: 768px) {
.products-image .products-image-box img {
  height: 80%;
  border-radius: 20px;
  width: auto;
}
}
`