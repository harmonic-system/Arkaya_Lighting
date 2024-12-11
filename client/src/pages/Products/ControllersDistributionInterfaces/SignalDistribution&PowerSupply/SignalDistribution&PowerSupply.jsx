import { Link } from "react-router-dom"
import styled from "styled-components"
import { useCategoryContext } from "../../../../context/category-context"

const SignalDistributionAndPowerSupply = () => {
    const { setCategoryinlocalStorage } = useCategoryContext()
    return (
        <>
            <Wrapper>
                <div className="products-image">
                    <div className="title">
                        <h1>Our <strong className="black">Signal Distribution & Power Supply</strong> Lighting Products</h1>
                        <span>Reliable and efficient solutions for seamless lighting control and power management</span>
                    </div>
                    <div className="container">
                        <div className="grid grid-three-column">
                            <Link to="/products" onClick={() => setCategoryinlocalStorage("signaldistributions")}>
                                <div className="products-image-box">
                                    <img src="images/products/signaldistributionandpowersupply/signaldistribution.png" />
                                    <h3>Signal Distribution</h3>
                                </div>
                            </Link>
                            <Link to="/products" onClick={() => setCategoryinlocalStorage("powersupplies")}>
                                <div className="products-image-box">
                                    <img src="images/products/signaldistributionandpowersupply/powersupply.png" />
                                    <h3>Power Supply</h3>
                                </div>
                            </Link>
                        </div>
                        <p>
                            Signal distribution products are critical in lighting systems, facilitating the efficient transmission of control signals from centralized controllers to individual fixtures. Key components include DMX cables, which carry digital signals that regulate parameters like intensity and color. Splitters and amplifiers ensure signals reach multiple fixtures or cover long distances without loss. Wireless DMX systems offer flexibility by eliminating the need for physical cables, ideal for complex setups or temporary installations. These products ensure reliable communication between controllers and lighting fixtures, enabling precise control over lighting effects in both theatrical and architectural applications. Their role in enhancing operational efficiency and creative possibilities underscores their importance in modern lighting design.
                        </p>
                        <p className="mt-3">
                            Power supply products are essential components in lighting systems, converting electrical power to a form suitable for lighting fixtures. LED drivers, for instance, regulate voltage and current to match LED requirements, ensuring optimal performance and longevity. Power supplies (PSUs) transform AC mains voltage to the necessary DC voltage for various lighting components. Transformers and converters adjust voltage levels to accommodate different fixture specifications, enhancing flexibility in lighting design. These products play a crucial role in maintaining stable and efficient operation of lighting setups, contributing to energy savings and reliable performance in both residential and commercial applications.
                        </p>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default SignalDistributionAndPowerSupply

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