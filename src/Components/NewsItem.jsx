import React from "react";

function NewsItem({
  title,
  description,
  urlToImage,
  url,
  author,
  source,
  publishedAt,
}) {
  const fallbackImage =
    "https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2025/06/Apple-Glasses-race-heats-up-as-Meta-changes-its-headset-plans.jpg?w=1500&quality=82&strip=all&ssl=1";

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString()
    : "Unknown";

  return (
    <div className="col-12 col-sm-6 col-lg-4 p-3">
      <div
        className="card shadow-sm m-0"
        style={{
          width: "100%",
          overflow: "hidden",
          height: "480px", 
          display: "flex", 
          flexDirection: "column",
        }}
      >
        <img
          src={urlToImage || fallbackImage}
          className="card-img-top"
          alt={title}
          style={{ height: "180px", objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
        <div className="card-body d-flex flex-column text-start">
          <h5 className="card-title">{title?.slice(0, 60) || "No Title"}...</h5>
          <p className="card-text">
            {description?.slice(0, 100) || "No Description"}...
          </p>
          <small className="text-muted">
            By {author || "Unknown"} | {formattedDate} |{" "}
            {source?.name || "Unknown Source"}
          </small>
          <div className="mt-auto">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary mt-2"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(NewsItem);
