import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useCategoryContext } from "../../context/category-context";

const SearchSort = () => {
  const { searchProducts, grid_view, setGridView, setListView } = useCategoryContext()


  return (
    <Wrapper className="sort-section">
      {/* 1st column  */}
      <div className="sorting-list--grid">
        <button
          className={grid_view ? "active sort-btn" : "sort-btn"}
          onClick={setGridView}>
          <BsFillGridFill className="icon" />
        </button>

        <button
          className={!grid_view ? "active sort-btn" : " sort-btn"}
          onClick={setListView}>
          <BsList className="icon" />
        </button>
      </div>

      {/* 2nd column  */}
      <div className="product-data">
        <p>{`${searchProducts?.length} Product Available`}</p>
      </div>

      {/* 3rd column  */}
      {/* <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            placeholder="Search"
            value={text}
            onChange={updateFilterValue}
          />
        </form>
      </div> */}
    </Wrapper>
  );
};

export default SearchSort;

const Wrapper = styled.section`
  // display: flex;
  // justify-content: space-evenly;
  // align-items: center;
  margin-top: 5rem;

  .sorting-list--grid,
  .product-data,
  .filter-search {
    flex: 1;
  }

  .sorting-list--grid{
    text-align: start;
    display: flex;
    gap: 10px;

    .sort-btn {
      padding: 0.8rem 1rem;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .icon {
      font-size: 1.6rem;
    }
    .active {
      background-color: ${({ theme }) => theme.colors.black};
      color: #fff;
    }
  }

  .filter-search{
    text-align: end;
  }

  .product-data {
    font-weight: bold;
    text-align: center;
  }

  .filter-search input {
    width: 100%; /* Adjust this as needed */
    max-width: 200px;
    padding: 0.6rem 1rem;
    border-radius: 1rem;
    transition: all 500ms ease;
  }

  .filter-search input:hover {
    transform: scale(1.04);
  }

  @media (max-width: 425px) {
    .sorting-list--grid,
    .product-data,
    .filter-search {
      flex: 1;
      margin: 0 5px; /* Adjust spacing if needed */
    }

    .product-data p{
      font-size: 1.2rem; /* Adjust font size for smaller screens */
    }

    .sort-btn svg {
      font-size: 1.2rem !important;
    }

    .sort-selection--style {
      width: 10rem;
    }

    .filter-search input {
      max-width: 100%; /* Ensure input doesn't overflow */
      padding: 0.5rem; /* Adjust padding for smaller screens */
    }
  }
`;


