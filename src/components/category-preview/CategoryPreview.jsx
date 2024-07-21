import { useNavigate } from "react-router-dom";
import ProductCard from "../product-card/ProductCard";
import "./category-preview.scss";

const CategoryPreview = ({ title, products }) => {
  const navigate = useNavigate();
  const goToSubCategory = () => {
    navigate(title);
  };

  return (
    <div className="category-preview-container">
      <h2>
        <span className="title" onClick={goToSubCategory}>
          {title}
        </span>
      </h2>

      <div className="products-container">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default CategoryPreview;
