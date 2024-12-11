import { useCategoryContext } from '../../context/category-context';
import SearchProductGridView from './SearchProductGridView';
import SearchProductListView from './SearchProductListView';

const SearchProductList = () => {
  const { grid_view } = useCategoryContext();

  if (grid_view === true) {
    return <SearchProductGridView />;
  }

  if (grid_view === false) {
    return <SearchProductListView />;
  }
}

export default SearchProductList




