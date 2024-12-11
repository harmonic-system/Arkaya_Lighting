import { Link } from "react-router-dom";
import { useCategoryContext } from "../../../../context/category-context";
import styled from "styled-components";

const TheaterStudioTelevision = () => {
  const { setCategoryinlocalStorage } = useCategoryContext()
  return (
    <>
      <Wrapper>
        <div className="products-image">
          <div className="title">
            <h1>Our <strong className="black">Theater, Studio & Television Lighting</strong> Products</h1>
            <span>Professional lighting solutions to create the perfect atmosphere on stage and screen</span>
          </div>
          <div className="container">
            <div className="grid grid-three-column">
              <Link to="/products" onClick={() => setCategoryinlocalStorage("theaters")}>
                <div className="products-image-box">
                  <img src="images/products/threaterstudiotelevision/threater.jpg" alt="threatercategory-image" />
                  <h3>Theater</h3>
                </div>
              </Link>
              <Link to="/products" onClick={() => setCategoryinlocalStorage("studios")}>
                <div className="products-image-box">
                  <img src="images/products/threaterstudiotelevision/studio.jpg" alt="studiocategory-image" />
                  <h3>Studio</h3>
                </div>
              </Link>
              <Link to="/products" onClick={() => setCategoryinlocalStorage("televisions")}>
                <div className="products-image-box">
                  <img src="images/products/threaterstudiotelevision/television.jpg" alt="televisioncategory-image" />
                  <h3>Television</h3>
                </div>
              </Link>
            </div>
            <p>Theater, studio, and television lighting are crucial for creating immersive experiences and enhancing visual storytelling. In theaters, lighting sets the mood, directs attention, and defines the atmosphere, supporting performances and conveying emotions. It utilizes spotlights, floods, and color gels to sculpt scenes dynamically. Television and studio lighting ensure clarity, consistency, and visual appeal for broadcasts. Advanced technologies like LED panels and programmable fixtures enable precise control over brightness, color temperature, and effects, accommodating diverse production needs. Both disciplines merge artistry with technical precision to illuminate actors, sets, and stages effectively, enriching the viewer's engagement and enhancing the overall production quality.</p>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

export default TheaterStudioTelevision;

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
  // width: auto;
}
}
`