import { useCategoryContext } from '../../context/category-context';
import ThemeProductGridView from './ThemeProductGridView';
import ThemeProductListView from './ThemeProductListView';

const ThemeProductList = () => {
    const { grid_view } = useCategoryContext();

    if (grid_view === true) {
        return <ThemeProductGridView />;
    }

    if (grid_view === false) {
        return <ThemeProductListView />;
    }
}

export default ThemeProductList




