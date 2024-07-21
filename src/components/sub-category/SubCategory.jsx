import { useParams } from "react-router-dom";
import ProductCard from "../product-card/ProductCard";
import "./sub-category.scss";
import { useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../contexts/categories-context/CategoriesContext";

const SubCategory = () => {
  const { category } = useParams();
  const { categories } = useContext(CategoriesContext);

  const [products, setProducts] = useState(categories[category]);

  useEffect(() => {
    setProducts(categories[category]);
  }, [category, categories]);

  return (
    <div className="sub-category-container">
      <h2>
        <span className="title">{category.toUpperCase()}</span>
      </h2>

      <div className="products-container">
        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
    </div>
  );
};

export default SubCategory;
