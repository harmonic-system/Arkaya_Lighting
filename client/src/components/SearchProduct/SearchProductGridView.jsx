import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useCategoryContext } from '../../context/category-context';
import NoProduct from '../../pages/NoProduct';
import GridViewProduct from '../Products/GridViewProduct';
import { Button } from '../../styles/Button';

const SearchProductGridView = () => {

  const { searchProducts, getHeroSearchProducts } = useCategoryContext()
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  // console.log(searchProducts);

  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("heroSearchProduct")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      const newCategory = localStorage.getItem("heroSearchProduct");
      if (newCategory !== selectedCategory) {
        setSelectedCategory(newCategory);
        getHeroSearchProducts(); // Re-fetch the filtered products
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [selectedCategory, getHeroSearchProducts]);

  // Re-fetch the category filtered products when selectedCategory changes
  useEffect(() => {
    getHeroSearchProducts();
  }, [selectedCategory, getHeroSearchProducts]);

  const totalPages = Math.ceil(searchProducts?.length / itemsPerPage);

  // Get current page data
  const currentItems = searchProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (currentItems.length === 0) {
    return (
      <Wrapper className="section">
        <div className="container grid">
          <NoProduct />
        </div>
      </Wrapper>
    )
  }

  return (
    <>
      <Wrapper className="section">
        <div className="container grid grid-tem-view">
          {currentItems?.map((curElem) => {
            return <GridViewProduct key={curElem._id} {...curElem} />;
          })}
        </div>
        {/* Pagination Controls */}
        <div className="container pagination">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            className={currentPage <= 1 ? 'disabled-button' : ''}
            disabled={currentPage <= 1}>
            Prev
          </Button>
          <span className="pagination-info">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            className={currentPage === totalPages ? 'disabled-button' : ''}
            disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </Wrapper>

    </>
  )
}

export default SearchProductGridView

const Wrapper = styled.section`
  padding: 9rem 0;

  .container {
    max-width: 120rem;
  }

  .grid {
    gap: 3.2rem;
  }

  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
      border-radius: 1rem;
    }
  }

  .card {
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 1rem;

    .card-data {
      padding: 0 1rem;
    }

    .card-data-flex {
      margin: 2rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-data--price {
      color: ${({ theme }) => theme.colors.helper};
    }

    h3 {
      color: ${({ theme }) => theme.colors.text};
      text-transform: capitalize;
    }

    .btn {
      margin: 2rem auto;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: rgb(98 84 243);
      }

      &:hover a {
        color: #fff;
      }
      a {
        color: rgb(98 84 243);
        font-size: 1.4rem;
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 2rem;
    align-items: center;

    .pagination-info {
      font-size: 1rem;
    }
  }
`;