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
  const [tabIndex, setTabIndex] = useState(0);
  function toggleItem() {
    isHidden ? setIsHidden(false) : setIsHidden(true);
  }

  // Create array of tab labels for use with tabIndex;
  const tabLabels = ["Short summary", "Articles", "Dates"];

  function changeTab(index) {
    setTabIndex(index);
  }

  return (
    <div key={movie.key} className={classes.item}>
      <div className={classes.title} onClick={toggleItem}>
        #{parseInt(movie.key) + 1} <span>{movie.display_title}</span>
      </div>
      <div className={isHidden ? classes.inner : classes.inner + " " + classes.show}>
        <div className={classes.tab}>
          <div className={classes.pills}>
            {tabLabels.map((tab, index) => {
              // render the tabs
              return (
                <span
                  key={index}
                  className={tabIndex === index ? classes.pill + " " + classes.active : classes.pill}
                  onClick={() => changeTab(index)}
                >
                  {tab}
                </span>
              );
            })}
          </div>
          <div className={classes.contents}>

            <div className={tabIndex === 0 ? classes.content + " " + classes.active : classes.content}>
              <img alt={movie.headline} src={movie.multimedia.src} />
              <div>
                <h3>{movie.display_title}</h3>
                <small>By: {movie.byline}</small>
                <p>{movie.summary_short}</p>
              </div>
            </div>

            <div className={tabIndex === 1 ? classes.content + " " + classes.active : classes.content}>
              <p>
                <a href={movie.link.url} target="_blank" rel="noreferrer">
                  {movie.link.suggested_link_text}
                </a>
              </p>
            </div>

            <div className={tabIndex === 2 ? classes.content + " " + classes.active : classes.content}>
              <div>
                <p>
                  <strong>Date updated</strong>: {movie.date_updated}
                </p>
                <p>
                  <strong>Opening date</strong>: {movie.opening_date}
                </p>
                <p>
                  <strong>Publication date</strong>: {movie.publication_date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
