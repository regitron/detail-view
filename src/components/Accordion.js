import classes from "./Accordion.module.scss";
import { createRef, useState, useEffect } from "react";
import { TabContextProvider, TabPills, TabContent } from "./Tabs";

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

  const [openAllAccordion, setOpenAllAccordion] = useState(false);
  function openAll() {
    setOpenAllAccordion((openAllAccordion) => !openAllAccordion);
  }

  const ref = createRef();
  // For accessibility
  const handleKeyPress = (event) => {
    event.preventDefault();
    // Keycode 0 is spacebar
    if (event.keyCode === 0 && document.activeElement === ref.current) {
      openAll();
    }
  };

  return (
    <div className={classes.outer}>
      <span ref={ref} className={classes.expand} onClick={openAll} tabIndex={1} onKeyPress={handleKeyPress}>
        {openAllAccordion ? "Close all" : "Expand all"}
      </span>

      <div className={classes.accordion}>
        {movies.map((movie) => {
          return <AccordionItem item={movie} key={movie.key} openAllAccordion={openAllAccordion}></AccordionItem>;
        })}
      </div>
    </div>
  );
}

// For each item in accordion
function AccordionItem(props) {
  const movie = props.item;
  const [isHidden, setIsHidden] = useState(true);
  function toggleItem() {
      isHidden ? setIsHidden(false) : setIsHidden(true);
  }
  useEffect(() => {
      setIsHidden(!props.openAllAccordion);
  }, [props.openAllAccordion])
  

  const ref = createRef();
  // For accessibility
  const handleKeyPress = (event) => {
    event.preventDefault();

    // Keycode 0 is spacebar
    if (event.keyCode === 0 && document.activeElement === ref.current) {
      toggleItem();
    }
  };

  return (
    <div ref={ref} key={movie.key} className={classes.item} tabIndex={1} onKeyPress={handleKeyPress}>
      <div className={classes.title} onClick={toggleItem}>
        #{parseInt(movie.key) + 1} <span>{movie.display_title}</span>
        <small>&nbsp;{isHidden ? "(Click to open)" : "(Click to close)"}</small>
      </div>
      <div className={isHidden ? classes.inner : classes.inner + " " + classes.show}>
        <TabContextProvider>
          <TabPills labels={["Short summary", "Articles", "Dates"]}></TabPills>
          <TabContent index={0}>
            <img alt={movie.headline} src={movie.multimedia.src} />
            <div>
              <h3>{movie.display_title}</h3>
              <small>Author: {movie.byline}</small>
              <p>{movie.summary_short}</p>
            </div>
          </TabContent>
          <TabContent index={1}>
            <p>
              <a href={movie.link.url} target="_blank" rel="noreferrer" tabIndex={1}>
                {movie.link.suggested_link_text}
              </a>
            </p>
          </TabContent>
          <TabContent index={2}>
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
          </TabContent>
        </TabContextProvider>
      </div>
    </div>
  );
}

export default Accordion;
