import { Link } from "react-router-dom";
import { useCategoryContext } from "../../../../context/category-context";
import styled from "styled-components";

const Decorative = () => {
  const { setCategoryinlocalStorage } = useCategoryContext()
  return (
    <>
      <Wrapper>
        <div className="products-image">
          <div className="container">
            <div className="title">
              <h1>Our <strong className="black">Decorative Lighting</strong> Products</h1>
              <span>Beautiful and functional lighting to add elegance to any space</span>
            </div>
          </div>
          <div className="container">
            <div className="grid grid-three-column">
              <Link to="/products" onClick={() => setCategoryinlocalStorage("Chandeliers")}>
                <div className="products-image-box">
                  <img src="images/products/decorative/chandeliers.PNG" alt="chandelierscategory-image" />
                  <h3>Chandeliers</h3>
                </div>
              </Link>
            </div>
            <p>Chandeliers embody elegance and sophistication in lighting design, historically serving as ornate centerpieces in grand interiors. These fixtures feature multiple arms adorned with crystals, glass, or other materials, suspended from the ceiling. They provide ambient and focal illumination, often complementing formal dining rooms, ballrooms, and entryways with their dazzling presence. Modern interpretations range from traditional to contemporary styles, offering versatility in size and finish to suit diverse interior aesthetics. Beyond their decorative appeal, chandeliers evoke a sense of luxury and timeless beauty, creating a captivating interplay of light and shadow that enhances the ambiance and architectural details of any space they adorn.</p>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

export default Decorative;

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