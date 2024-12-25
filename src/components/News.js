import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateNews = async () => {
    props.setProgress(10);
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);

      let data = await fetch(url);
      props.setProgress(30);
      if (!data.ok) throw new Error("Failed to fetch data");
      let parsedData = await data.json();
      props.setProgress(70);

      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
    props.setProgress(100);
  };

  const fetchMoreData = async () => {
    if (articles.length < totalResults) {
      try {
        const nextPage = page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;

        let data = await fetch(url);
        if (!data.ok) throw new Error("Failed to fetch data");
        let parsedData = await data.json();

        setArticles((prevArticles) =>
          prevArticles.concat(parsedData.articles || [])
        );
        setPage(nextPage);
        setTotalResults(parsedData.totalResults || totalResults);
      } catch (error) {
        console.error("Error fetching more news:", error);
      }
    }
  };

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>

      {loading && <Spinner />}

      <InfiniteScroll
        pageStart={0}
        loadMore={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={
          <div className="loader text-center" key={0}>
            <Spinner />
          </div>
        }
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => (
              <div className="col-md-4" key={`${element.url}-${index}`}>
                <NewsItem
                  title={element.title || "Untitled"}
                  description={
                    element.description || "No description available"
                  }
                  imageUrl={
                    element.urlToImage ||
                    "https://tse1.mm.bing.net/th?id=OIP.8V6L690Z5ltOOFs4YrKhgwHaEK&pid=Api&P=0&h=180"
                  }
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
};

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;