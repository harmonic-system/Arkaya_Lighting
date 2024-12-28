import styled from 'styled-components';
import ThemeSort from '../components/ThemeProduct/ThemeSort';
import ThemeProductList from '../components/ThemeProduct/ThemeProductList';

const ThemeProduct = () => {
    return (
        <>
            <Wrapper>
                <div className="container">
                    <ThemeSort />
                    <ThemeProductList />
                </div>
            </Wrapper>

        </>
    )
}

export default ThemeProduct

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