import React from "react";
import ProductsGrid from "./ProductsGrid";
import SectionTitle from "./SectionTitle";

const FeaturedProducts: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Our picks</h2>
      <ProductsGrid />
    </div>
  );
};

export default FeaturedProducts;
