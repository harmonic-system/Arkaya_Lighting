import React from "react";
import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useCategoryContext } from "../../context/category-context";
import { useNavigate } from "react-router-dom";
import { Button } from "../../styles/Button";

const Sort = () => {
  const { filters: { text }, filterProducts, grid_view, setGridView, setListView, updateFilterValue } = useCategoryContext()
  const navigate = useNavigate()

  return (
    <>
      <Wrapper className="sort-section">
        <div className="first-column">
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
            <p>{`${filterProducts?.length} Product Available`}</p>
          </div>

          {/* 3rd column  */}
          <div className="filter-search">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                name="text"
                placeholder="Search"
                value={text}
                onChange={updateFilterValue}
              />
            </form>
          </div>
        </div>
        <div className="second-column">
          <Button onClick={() => navigate(-1)}>Go Back</Button>
          <div className="option">
            <select name="options" id="options" onChange={updateFilterValue}>
              <option value="">All</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
            </select>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Sort;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: linear-gradient(180deg, #fff, #eaeaea);
  padding: 0 15px;
  border-radius: 0 0 15px 15px;

  .first-column {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 5rem;

    .sorting-list--grid,
    .product-data,
    .filter-search {
      flex: 1;
    }

    .sorting-list--grid {
      gap: 10px;
      display:flex;

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

    .filter-search {
      text-align: end;
    }

    .product-data {
      font-weight: bold;
      text-align: center;
    }

    .filter-search input {
      width: 100%;
      max-width: 200px;
      padding: 0.6rem 1rem;
      border-radius: 5px;
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
        margin: 0 5px;
      }

      .product-data p {
        font-size: 1.2rem;
      }

      .sort-btn svg {
        font-size: 1.2rem !important;
      }

      .sort-selection--style {
        width: 10rem;
      }

      .filter-search input {
        max-width: 100%;
        padding: 0.5rem;
      }
    }
  }

  .second-column {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px 20px;
    gap: 20px;
  }

  .second-column select {
    width: 100%;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 1.2rem;
    font-weight: bold;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;
  }

  .second-column select:focus {
    border-color: #fcc221;
  }

  .second-column option {
    padding: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    background-color: #fff;
    transition: background-color 0.3s ease;
  }

  .second-column option:hover {
    background-color: #f0f0f0;
  }

  /* Button Styles */
  Button {
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    border: 1px solid #fcc221;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #333;
  }

  Button:hover {
    background-color: #fcc221;
    border: 1px solid #fcc221;
    color: #fff;
  }

  /* Media Queries for Responsiveness */
  @media (max-width: 425px) {
    .second-column {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
    }

    .second-column Button {
      width: 100%;
    }

    .second-column .option {
      width: 100%;
      font-size: 1.2rem;
    }

    .second-column select {
      font-size: 1.2rem;
      padding: 10px 14px;
    }
  }
`;

