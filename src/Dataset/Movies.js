import { useState, useEffect } from "react";
import Accordion from "../components/Accordion";

function DatasetMovies() {
  /**
   * URL To API: https://api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key=hMcGn50QL7EcGmLhM0SQkLf8ftLSvXMA
   */

  const [isLoading, setIsLoading] = useState(true);
  const [loadedMovies, setLoadedMovies] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key=hMcGn50QL7EcGmLhM0SQkLf8ftLSvXMA"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setLoadedMovies(data);
      });
  }, []); // To avoid loops

  if (isLoading) {
    return <p>Loading movies...</p>;
  }
  return <Accordion dataset={loadedMovies.results}></Accordion>;
}

export default DatasetMovies;
