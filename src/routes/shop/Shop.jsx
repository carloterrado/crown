import { Route, Routes } from "react-router-dom";
import Categories from "../../components/categories/Categories";
import SubCategory from "../../components/sub-category/SubCategory";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<Categories />} />
      <Route path=":category" element={<SubCategory />} />
    </Routes>
  );
};

export default Shop;
