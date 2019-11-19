import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ProductSearch } from "./ProductSearch";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import ProductSearchGrid from "./ProductSearchGrid";

Enzyme.configure({ adapter: new Adapter() });

describe("ProductSearch", () => {
  const PROXY_URL = "https://cors-anywhere.herokuapp.com";
  const API_URL = "https://www.mec.ca/api/v1/products";
  let enzymeWrapper;
  let mockApi;
  let props;

  beforeEach(function() {
    props = {
      history: { push: jest.fn() }
    };
    mockApi = new MockAdapter(axios);
    enzymeWrapper = shallow(<ProductSearch {...props} />);
  });

  it("should render self", () => {
    expect(enzymeWrapper.find("h2").text()).toBe("Product Search");
  });

  it("should call pass products to grid component and push history when submit and api succeeds", async () => {
    const keyword = "Product";
    const response = {
      total_product_count: 2,
      products: [{ name: "Product 1" }, { name: "Product 2" }]
    };
    mockApi
      .onGet(`${PROXY_URL}/${API_URL}/search?keywords=${keyword}`)
      .reply(200, response);

    const input = enzymeWrapper.find("input").at(0);
    input.simulate("change", { target: { name: "keyword", value: keyword } });

    const form = enzymeWrapper.find("form");
    await form.props().onSubmit({ preventDefault: () => {} });
    const component = enzymeWrapper.find(ProductSearchGrid);
    expect(component.props().products).toEqual(response.products);
    expect(props.history.push).toHaveBeenCalledWith({
      pathname: "/",
      search: `?keyword=${keyword}`
    });
  });

  it("should display error if api network error", async () => {
    const keyword = "Product";
    mockApi
      .onGet(`${PROXY_URL}/${API_URL}/search?keywords=${keyword}`)
      .networkError();

    const input = enzymeWrapper.find("input").at(0);
    input.simulate("change", { target: { name: "keyword", value: keyword } });

    const form = enzymeWrapper.find("form");
    await form.props().onSubmit({ preventDefault: () => {} });
    expect(enzymeWrapper.find(".product-search-error").text()).toContain(
      "Error occurred: Network Error"
    );
  });
});
