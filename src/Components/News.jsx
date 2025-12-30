import { useContext, useEffect, useState, useMemo } from "react";
import NewsItem from "./NewsItem";
import { CategoryContext } from "../context/CategoryContext";

const PAGE_SIZE = 20;
const MAX_RESULTS = 100;
const API_KEY = "8f78683d52ea490ebf4bb22859c689dd";

export default function News() {
  const { state } = useContext(CategoryContext);
  const { category } = state;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchNews = async (pageNum, category) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}&page=${pageNum}&pageSize=${PAGE_SIZE}`
      );
      const data = await res.json();
      setArticles(data.articles || []);
      setPage(pageNum);
      setTotalResults(data.totalResults || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(1, category);
  }, [category]);

  const handlePrevious = () => {
    if (page > 1) fetchNews(page - 1, category);
  };

  const handleNext = () => {
    const totalPages = Math.ceil(
      Math.min(totalResults, MAX_RESULTS) / PAGE_SIZE
    );
    if (page < totalPages) fetchNews(page + 1, category);
  };

  const totalPages = useMemo(
    () => Math.ceil(Math.min(totalResults, MAX_RESULTS) / PAGE_SIZE),
    [totalResults]
  );

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">
        Top Headlines - {category.toUpperCase()}
      </h3>

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      <div className="row">
        {!loading &&
          articles.map((article) => (
            <NewsItem key={article.url} {...article} />
          ))}
      </div>

      <div className="d-flex justify-content-between align-items-center my-3">
        <button
          className="btn btn-info"
          onClick={handlePrevious}
          disabled={page === 1}
        >
          &larr; Previous
        </button>
        <span>
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          className="btn btn-info"
          onClick={handleNext}
          disabled={page >= totalPages}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
