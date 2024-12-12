import styled from "styled-components";
import ListViewProduct from "./ListViewProduct";
import { Button } from "../../styles/Button";
import { useEffect, useState } from "react";
import { useCategoryContext } from "../../context/category-context";
import NoProduct from "../../pages/NoProduct";

const ListView = () => {
  const { filterProducts, getCategoryFilteredProducts } = useCategoryContext()
  // console.log(filterProducts);

  useEffect(() => {
    getCategoryFilteredProducts();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(filterProducts.length / itemsPerPage);

  // Get current page data
  const currentItems = filterProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

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
    <Wrapper className="section">
      <div className="container grid">
        {
          currentItems.map((curElem) => {
            return (<ListViewProduct key={curElem._id} curElem={curElem} />
            )
          })
        }
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
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;

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

export default ListView;
