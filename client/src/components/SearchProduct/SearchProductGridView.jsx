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

  @media (max-width: 1024px) {
    padding: 6rem 0;
  }

  @media (max-width: 420px) {
    padding: 3rem 0;
  }

  .container {
    max-width: 120rem;
  }

  .grid {
    gap: 3.2rem;
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