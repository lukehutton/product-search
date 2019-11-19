import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ProductSearchGrid from "./ProductSearchGrid";
import Masonry from "react-masonry-css";
import Product from "./Product";

Enzyme.configure({ adapter: new Adapter() });

describe("ProductSearchGrid", () => {
  let enzymeWrapper;

  beforeEach(function() {
    const props = {
      products: [{ name: "Product 1" }, { name: "Product 2" }]
    };
    enzymeWrapper = shallow(<ProductSearchGrid {...props} />);
  });

  it("should render Masonry component", () => {
    const components = enzymeWrapper.find(Masonry);
    expect(components.length).toEqual(1);
  });

  it("should render two Product components", () => {
    const components = enzymeWrapper.find(Product);
    expect(components.length).toEqual(2);
  });
});
