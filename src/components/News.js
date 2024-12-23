import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async updateNews() {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0540761f903e44c8b242309d538b483a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });

      let data = await fetch(url);
      if (!data.ok) throw new Error("Failed to fetch data");
      let parsedData = await data.json();

      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    await this.updateNews();
  }

  fetchMoreData = async () => {
    if (this.state.articles.length < this.state.totalResults) {
      try {
        const nextPage = this.state.page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0540761f903e44c8b242309d538b483a&page=${nextPage}&pageSize=${this.props.pageSize}`;

        let data = await fetch(url);
        if (!data.ok) throw new Error("Failed to fetch data");
        let parsedData = await data.json();

        this.setState({
          articles: this.state.articles.concat(parsedData.articles || []),
          page: nextPage,
          totalResults: parsedData.totalResults || this.state.totalResults,
        });
      } catch (error) {
        console.error("Error fetching more news:", error);
      }
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>

        {this.state.loading && <Spinner />}

        <InfiniteScroll
          pageStart={0}
          loadMore={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={
            <div className="loader text-center" key={0}>
              <Spinner />
            </div>
          }
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element, index) => (
                <div className="col-md-4" key={`${element.url}-${index}`}>
                  <NewsItem
                    title={element.title || "Untitled"}
                    description={element.description || "No description available"}
                    imageUrl={element.urlToImage || "https://via.placeholder.com/150"}
                    newsUrl={element.url}
                    author={element.author || "Unknown"}
                    date={element.publishedAt || "Unknown date"}
                    source={element.source.name || "Unknown source"}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;

