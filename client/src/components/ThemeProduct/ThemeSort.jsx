import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useCategoryContext } from "../../context/category-context";

const ThemeSort = () => {
  const {
    themeProductsSubCategory,
    setThemeSubCategoryProducts,
    themeProducts,
    grid_view,
    setGridView,
    setListView,
  } = useCategoryContext();

  return (
    <Wrapper>
      <div className="first-column">
        {/* Sorting buttons */}
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

        {/* Product count */}
        <div className="product-data">
          <p>{`${themeProducts?.length} Product${themeProducts?.length !== 1 ? "s" : ""} Available`}</p>
        </div>

        {/* Category dropdown */}
        {/* <div className="option">
          <select
            id="options"
            defaultValue=""
            onChange={(e) => setThemeSubCategoryProducts(e.target.value)}
          >
            <option value="All">
              All
            </option>
            {themeProductsSubCategory?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div> */}
      </div>

      <div className="second-column">
        <div className="option">
          <label>
            <input
              type="radio"
              name="themeCategory"
              value="All"
              onChange={(e) => setThemeSubCategoryProducts(e.target.value)}
            />
            All
          </label>
          {themeProductsSubCategory?.map((category) => (
            <label key={category}>
              <input
                type="radio"
                name="themeCategory"
                value={category}
                onChange={(e) => setThemeSubCategoryProducts(e.target.value)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default ThemeSort;

// const Wrapper = styled.section`
//   margin-top: 5rem;
//   background: linear-gradient(180deg, #fff, #eaeaea);
//     padding: 10px 15px;
//     border-radius: 0 0 15px 15px;
//     position: relative;
//   .first-column {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     gap: 1rem;
//     flex-wrap: nowrap;


//     /* Sorting Buttons */
//     .sorting-list--grid {
//       display: flex;
//       gap: 0.5rem;

//       .sort-btn {
//         padding: 0.8rem 1rem;
//         border: none;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         cursor: pointer;
//         background-color: ${({ theme }) => theme.colors.bg};
//         border-radius: 0.5rem;
//         transition: background-color 0.3s ease, color 0.3s ease;

//         &:hover {
//           background-color: ${({ theme }) => theme.colors.black};
//           color: #fff;
//         }
//       }

//       .icon {
//         font-size: 1.4rem;
//       }

//       .active {
//         background-color: ${({ theme }) => theme.colors.black};
//         color: #fff;
//       }
//     }

//     /* Product Count - Always Centered */
//     .product-data {
//       position: absolute;
//       left: 50%;
//       transform: translateX(-50%);
//       text-align: center;

//       p {
//         font-weight: 600;
//         font-size: 1.2rem;
//       }
//     }

//     /* Dropdown */
//     .option {
//       select {
//         padding: 0.5rem 1rem;
//         cursor: pointer;
//       }
//     }
//   }

//   /* Responsive Layout */
//   @media (max-width: 768px) {
//   .first-column {
//     .sorting-list--grid {
//       gap: 0.3rem;

//       .icon {
//         font-size: 1.2rem;
//       }
//     }

//     .product-data p {
//       font-size: 1.2rem;
//     }

//     .option select {
//       padding: 0.5rem 0.8rem;
//       font-size: 1.3rem;
//     }
//   }
//   }

//   @media (max-width: 480px) {
//   .first-column {
//     .sorting-list--grid {
//       gap: 0.2rem;

//       .icon {
//         font-size: 1rem;
//       }
//     }

//     .product-data p {
//       font-size: 1.2rem;
//     }

//     .option select {
//       padding: 0.4rem 0.6rem;
//       font-size: 1.3rem;
//     }
//   }
// }

//   /* Mobile View - Max Width 500px */
//   @media (max-width: 500px) {
//   .first-column {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 1rem;

//     .product-data {
//       text-align: left;
//     }

//     .option {
//       width: 100%;
//       align-self: flex-start;

//       select {
//         width: 100%;
//         padding: 0.5rem 1rem;
//         font-size: 1.3rem;
//       }
//     }
//   }
// }

// .second-column {
// margin-top:2rem;
// .option {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 10px;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   background-color: #f9f9f9;
//   max-width: 100%;
//   box-sizing: border-box;
// }

// /* Label styling */
// .option label {
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   cursor: pointer;
//   font-family: Arial, sans-serif;
//   font-size: 14px;
//   color: #333;
//   padding: 5px 8px;
//   border-radius: 4px;
//   transition: background-color 0.2s ease-in-out;
// }

// .option label:hover {
//   background-color: #f0f0f0;
// }

// .option input[type="radio"] {
//   accent-color: #007bff; 
//   width: 16px;
//   height: 16px;
// }

// /* Media query for smaller screens */
// @media (max-width: 600px) {
//   .option {
//     gap: 8px;
//     padding: 8px;
//   }

//   .option label {
//     font-size: 12px;
//     gap: 6px;
//   }
// }
// }
// `;


const Wrapper = styled.section`
  margin-top: 5rem;
  background: linear-gradient(180deg, #fff, #eaeaea);
  padding: 10px 15px;
  border-radius: 0 0 15px 15px;
  position: relative;

  /* First Column */
  .first-column {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: nowrap;

    /* Sorting Buttons */
    .sorting-list--grid {
      display: flex;
      gap: 0.5rem;

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
        font-size: 1.4rem;
      }

      .active {
        background-color: ${({ theme }) => theme.colors.black};
        color: #fff;
      }
    }

    /* Product Count - Always Centered */
    .product-data {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;

      p {
        font-weight: 600;
        font-size: 1.2rem;
      }
    }

    /* Dropdown */
    .option {
      select {
        padding: 0.5rem 1rem;
        cursor: pointer;
      }
    }
  }

  /* Second Column */
  .second-column {
    margin-top: 2rem;

    .option {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #f9f9f9;
      max-width: 100%;
      box-sizing: border-box;

      /* Label Styling */
      label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        font-family: Arial, sans-serif;
        font-size: 14px;
        color: #333;
        padding: 5px 8px;
        border-radius: 4px;
        transition: background-color 0.2s ease-in-out;

        &:hover {
          background-color: #f0f0f0;
        }
      }

      input[type="radio"] {
        accent-color: #007bff;
        width: 16px;
        height: 16px;
      }
    }
  }

  /* Media Queries */
  @media (max-width: 768px) {
    .first-column {
      .sorting-list--grid {
        gap: 0.3rem;

        .icon {
          font-size: 1.2rem;
        }
      }

      .product-data p {
        font-size: 1.2rem;
      }

      .option select {
        padding: 0.5rem 0.8rem;
        font-size: 1.3rem;
      }
    }
  }

  @media (max-width: 480px) {
    .first-column {
      .sorting-list--grid {
        gap: 0.2rem;

        .icon {
          font-size: 1rem;
        }
      }

      .product-data p {
        font-size: 1.2rem;
      }

      .option select {
        padding: 0.4rem 0.6rem;
        font-size: 1.3rem;
      }
    }
  }

  /* Mobile View - Max Width 500px */
  @media (max-width: 500px) {
    .first-column {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;

      .product-data {
        text-align: left;
      }

      .option {
        width: 100%;
        align-self: flex-start;

        select {
          width: 100%;
          padding: 0.5rem 1rem;
          font-size: 1.3rem;
        }
      }
    }
  }

  /* Media query for smaller screens */
  @media (max-width: 600px) {
    .second-column .option {
      gap: 8px;
      padding: 8px;
    }

    .second-column .option label {
      font-size: 12px;
      gap: 6px;
    }
  }
`;
