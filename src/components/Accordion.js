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

function AccordionItem(props) {
  const movie = props.item;
  const [isHidden, setIsHidden] = useState(true);
  function toggleItem() {
    isHidden ? setIsHidden(false) : setIsHidden(true);
  }
  return (
    <div key={movie.key} className={classes.item} onClick={toggleItem}>
      <div className={classes.title}>#{parseInt(movie.key)+1} <span>{movie.display_title}</span></div>
      <div className={isHidden ? classes.inner : classes.inner + ' ' + classes.show}>
        <p>Tabs goes here</p>
      </div>
    </div>
  );
}

export default Accordion;
