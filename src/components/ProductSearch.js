import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { searchProducts } from "../services/productApi";
import { MoonLoader } from "react-spinners";
import ProductSearchGrid from "./ProductSearchGrid";
import queryString from "query-string";

export class ProductSearch extends Component {
  state = {
    products: [],
    loading: false,
    error: null,
    keyword: "",
    searchedKeyword: ""
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const query = queryString.parse(this.props.location.search);
      this.getProducts(query.keyword);
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getProducts = keyword => {
    this.setState({
      loading: true,
      error: null,
      products: [],
      keyword: keyword || "",
      searchedKeyword: keyword || ""
    });

    if (keyword && !keyword.length) return;

    return searchProducts(keyword)
      .then(response => {
        this.setState({
          products:
            response.data.total_product_count > 0 ? response.data.products : []
        });
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.history.push({
      pathname: "/",
      search: `?keyword=${this.state.keyword}`
    });

    return this.getProducts(this.state.keyword);
  };

  render() {
    const { keyword, searchedKeyword, loading, error, products } = this.state;
    return (
      <div>
        <h2>Product Search</h2>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="keyword">
            <strong>Keyword:</strong>
          </label>
          <input
            className="product-search-keyword"
            type="text"
            name="keyword"
            value={keyword}
            onChange={this.onChange}
          />
          <button type="submit" className="product-search-button">
            Search
          </button>
        </form>
        {loading && (
          <div className="product-search-loading">
            <MoonLoader
              css={"margin: 0 auto;"}
              color={"#0BA948"}
              loading={this.state.loading}
              size={30}
            />
            Loading products ...
          </div>
        )}
        {error && (
          <div className="product-search-error">
            <strong>Error occurred:</strong> {error}
          </div>
        )}
        {!loading && products.length > 0 && (
          <div>
            <strong>Search Results</strong> for
            <strong>"{searchedKeyword}"</strong>:{products.length}
          </div>
        )}
        {!loading && products.length === 0 && searchedKeyword.length > 0 && (
          <div>
            <strong>No Search Results</strong> for
            <strong>"{searchedKeyword}"</strong>
          </div>
        )}
        <ProductSearchGrid products={products} />
      </div>
    );
  }
}

export default withRouter(ProductSearch);
