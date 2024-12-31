import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useCategoryContext } from "../../context/category-context";

const ThemeSort = () => {
  const { themeProducts, grid_view, setGridView, setListView } = useCategoryContext();

  return (
    <Wrapper className="sort-section">
      {/* 1st column: Sorting buttons */}
      <div className="sorting-list--grid">
        <button
          className={grid_view ? "active sort-btn" : "sort-btn"}
          onClick={setGridView}
        >
          <BsFillGridFill className="icon" />
        </button>

        <button
          className={!grid_view ? "active sort-btn" : "sort-btn"}
          onClick={setListView}
        >
          <BsList className="icon" />
        </button>
      </div>

      {/* 2nd column: Product count */}
      <div className="product-data">
        <p>{`${themeProducts?.length} Product${themeProducts?.length !== 1 ? "s" : ""} Available`}</p>
      </div>
    </Wrapper>
  );
};

export default ThemeSort;

const Wrapper = styled.section`
  margin-top: 5rem;
  display: flex;
  flex-wrap: wrap; 
  gap: 1rem; 

  .sorting-list--grid,
  .product-data {
    flex: 1;
    display: flex;
    justify-content: flex-start !important;
    align-items: center;
  }

  .sorting-list--grid {
    gap: 10px;

    .sort-btn {
      padding: 0.8rem 1rem;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.bg};
      border-radius: 0.5rem;
      transition: background-color 0.3s ease, color 0.3s ease;

      &:hover {
        background-color: ${({ theme }) => theme.colors.black};
        color: #fff;
      }
    }

    .icon {
      font-size: 1.6rem;
    }

    .active {
      background-color: ${({ theme }) => theme.colors.black};
      color: #fff;
    }
  }

  .product-data {
    justify-content: center;
    text-align: center;

    p {
      font-weight: bold;
      font-size: 1.4rem;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column; /* Stacks items vertically */
    align-items: center;

    .sorting-list--grid {
      justify-content: center;
    }

    .product-data {
      text-align: center;
      justify-content: center;

      p {
        font-size: 1.2rem;
      }
    }
  }

  @media (max-width: 425px) {
    gap: 0.5rem;

    .sorting-list--grid {
      .sort-btn {
        padding: 0.6rem 0.8rem;
      }

      .icon {
        font-size: 1.4rem;
      }
    }

    .product-data p {
      font-size: 1rem;
    }
  }
`;