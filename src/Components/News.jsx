import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import NewsItem from "./NewsItem";
import { CategoryContext } from "../context/CategoryContext";

const PAGE_SIZE = 20;
const MAX_RESULTS = 100;

// 🔴 CHANGE 1: Currents API key
const API_KEY = "sso3m1tcq1-ltUicK3SIkFkBzlULoA9OewVTZN9-pf8Y5e4b";

export default function News() {
  const { state } = useContext(CategoryContext);
  const { category } = state;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // 🔴 CHANGE 2: API function updated
  const fetchNews = useCallback(async (pageNum, category) => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://api.currentsapi.services/v1/latest-news?category=${category}&language=en&page_number=${pageNum}&page_size=${PAGE_SIZE}&apiKey=${API_KEY}`
      );

      const data = await res.json();

      setArticles(data.news || []);
      setPage(pageNum);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔴 CHANGE 3: useEffect remains same
  useEffect(() => {
    fetchNews(1, category);
  }, [category, fetchNews]);

  const handlePrevious = () => {
    if (page > 1) fetchNews(page - 1, category);
  };

  const handleNext = () => {
    if (page * PAGE_SIZE < MAX_RESULTS) {
      fetchNews(page + 1, category);
    }
  };

  // 🔴 CHANGE 4: total pages logic simplified
  const totalPages = useMemo(() => Math.ceil(MAX_RESULTS / PAGE_SIZE), []);

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
          articles.map((article) => <NewsItem key={article.id} {...article} />)}
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
          Page <strong>{page}</strong>
        </span>

        <button className="btn btn-info" onClick={handleNext}>
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
