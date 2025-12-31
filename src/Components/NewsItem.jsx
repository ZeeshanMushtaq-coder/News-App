import React from "react";

function NewsItem({ title, description, image, url, author, published }) {
  const fallbackImage =
    "https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2025/06/Apple-Glasses-race-heats-up-as-Meta-changes-its-headset-plans.jpg";

  const formattedDate = published
    ? new Date(published).toLocaleDateString()
    : "Unknown";

  return (
    <div className="col-12 col-sm-6 col-lg-4 p-3">
      <div
        className="card shadow-sm"
        style={{ height: "460px", display: "flex", flexDirection: "column" }}
      >
        <img
          src={image || fallbackImage}
          className="card-img-top"
          alt={title}
          style={{ height: "180px", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title?.slice(0, 60) || "No Title"}...</h5>

          <p className="card-text">
            {description?.slice(0, 100) || "No Description"}...
          </p>

          <small className="text-muted">
            By {author || "Unknown"} | {formattedDate}
          </small>

          <div className="mt-auto">
            <a
              href={url || "#"}
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
