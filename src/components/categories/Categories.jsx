import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories-context/CategoriesContext";
import "./categories.scss";
import CategoryPreview from "../category-preview/CategoryPreview";

const Categories = () => {
  const { categories } = useContext(CategoriesContext);
  return (
    <div className="category-preview-container">
      {Object.keys(categories).map((title) => {
        return (
          <CategoryPreview
            key={title}
            title={title}
            products={categories[title].slice(0, 4)}
          />
        );
      })}
    </div>
  );
};

export default Categories;
