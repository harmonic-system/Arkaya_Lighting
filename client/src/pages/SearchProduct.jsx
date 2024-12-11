import styled from 'styled-components';
import SearchSort from '../components/SearchProduct/SearchSort';
import SearchProductList from '../components/SearchProduct/SearchProductList';

const SearchProduct = () => {
  return (
    <>
      <Wrapper>
        <div className="container">
          <SearchSort />
          <SearchProductList />
        </div>
      </Wrapper>

    </>
  )
}

export default SearchProduct

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