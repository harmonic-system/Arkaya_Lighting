import styled from "styled-components";
import Sort from "../components/Products/Sort";
import ProductList from "../components/Products/ProductList";

const Product = () => {

  return (
    <>
      <Wrapper>
        <div className="container">
          <Sort />
          <ProductList />
        </div>
      </Wrapper>

    </>
  )
}

export default Product

const Wrapper = styled.section`
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;