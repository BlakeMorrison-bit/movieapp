import React, { useState } from "react";
import ResultCard from "./ResultCard";

const Add = () => {
  // keeps the query string
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const api = "b981853d3cd7df1f73f9ca5c3758fbea";

  const onChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${api}&language=en-US&page=1&include_adult=false&query=${event.target.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      });
  };

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search Something"
              value={query}
              onChange={onChange}
            />
          </div>
          {results.length > 0 && (
            <ul className="results">
              {results.map((movie) => (
                <li key={movie.id}>
                  <ResultCard movie={movie} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Add;
