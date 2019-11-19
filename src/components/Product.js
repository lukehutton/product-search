import React from "react";

const Product = ({ product }) => (
  <div className="product">
    <figure>
      <img
        src={product.default_image_urls.small_image_url}
        alt={product.name}
      />
      <figcaption>{product.name}</figcaption>
    </figure>
  </div>
);

export default Product;
