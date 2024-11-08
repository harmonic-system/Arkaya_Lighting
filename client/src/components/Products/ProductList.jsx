import React from "react";
import GridView from "./GridView";
import ListView from "./ListView";
import { useCategoryContext } from "../../context/category-context";

const ProductList = () => {
  const { grid_view } = useCategoryContext();

  if (grid_view === true) {
    return <GridView />;
  }

  if (grid_view === false) {
    return <ListView />;
  }
};

export default ProductList;
