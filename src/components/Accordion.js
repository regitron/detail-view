import classes from "./Accordion.module.scss";
import { useState } from "react";

function Accordion(props) {
  const dataset = props.dataset;
  const movies = [];

  // Create array from object
  for (const key in dataset) {
    const movie = {
      key: key,
      ...dataset[key],
    };
    movies.push(movie);
  }

  return (
    <div className={classes.accordion}>
      {movies.map((movie) => {
        return <AccordionItem item={movie} key={movie.key}></AccordionItem>;
      })}
    </div>
  );
}

// For each item in accordion
function AccordionItem(props) {
  const movie = props.item;
  const [isHidden, setIsHidden] = useState(true);
  function toggleItem() {
    isHidden ? setIsHidden(false) : setIsHidden(true);
    console.log(movie);
  }
  return (
    <div key={movie.key} className={classes.item}>
      <div className={classes.title} onClick={toggleItem}>
        #{parseInt(movie.key) + 1} <span>{movie.display_title}</span>
      </div>
      <div
        className={
          isHidden ? classes.inner : classes.inner + " " + classes.show
        }
      >
        <div className={classes.tab}>
          <div className={classes.pills}>
            <span className={classes.pill + " " + classes.active}>
              Short summary
            </span>
            <span className={classes.pill}>Articles</span>
            <span className={classes.pill}>Dates</span>
          </div>
          <div className={classes.contents}>
            <div className={classes.content + " " + classes.active}>
              <img alt={movie.headline} src={movie.multimedia.src} />
              <div>
                <h3>{movie.display_title}</h3>
                <small>By: {movie.byline}</small>
                <p>{movie.summary_short}</p>
              </div>
            </div>
            <div className={classes.content}>
              <p>
                <a href={movie.link.url} target="_blank" rel="noreferrer">
                  {movie.link.suggested_link_text}
                </a>
              </p>
            </div>
            <div className={classes.content + " " + classes.active}>
              <div>
                <p>Date updated: {movie.date_updated}</p>
                <p>Opening date: {movie.opening_date}</p>
                <p>Publication date: {movie.publication_date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
