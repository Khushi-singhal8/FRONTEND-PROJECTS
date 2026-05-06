import React from 'react'

const NewsItem = ({ title, description, src, url }) => {
  return (

    <div
      className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 py-2 px-2"
      style={{ maxWidth: "345px" }}
    >

      <img
        src={src ? src : "https://via.placeholder.com/345x200"}
        className="card-img-top"
        alt="News"
        style={{
          height: "200px",
          width: "100%",
          objectFit: "cover"
        }}
      />

      <div className="card-body">

        <h5 className="card-title">
          {title ? title.slice(0, 50) : "No Title"}
        </h5>

        <p className="card-text">
          {description ? description.slice(0, 100) : "No Description Available"}
        </p>

        <a
          href={url}
          className="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More
        </a>

      </div>
    </div>
  )
}

export default NewsItem