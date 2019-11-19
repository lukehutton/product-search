import React from "react";
import Masonry from "react-masonry-css";
import Product from "./Product";

const GRID_COLUMNS = 6;

const ProductSearchGrid = ({ products }) => (
  <Masonry
    breakpointCols={GRID_COLUMNS}
    className="product-search-grid"
    columnClassName="product-search-grid_column"
  >
    {products.map((product, i) => (
      <Product product={product} key={i} />
    ))}
  </Masonry>
);

export default ProductSearchGrid;
