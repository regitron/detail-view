import classes from "./Accordion.module.scss";
import { useState } from "react";
import { TabPills, TabSummary, TabArticles, TabDates } from "./Tabs";

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
  }

  // Create array of tab labels for use with tabIndex;
  const tabLabels = ["Short summary", "Articles", "Dates"];

  return (
    <div key={movie.key} className={classes.item}>
      <div className={classes.title} onClick={toggleItem}>
        #{parseInt(movie.key) + 1} <span>{movie.display_title}</span>
      </div>
      <div className={isHidden ? classes.inner : classes.inner + " " + classes.show}>
        <div className={classes.tab}>
          <div className={classes.pills}>
            <TabPills tabs={tabLabels}></TabPills>
          </div>
          <div className={classes.contents}>
          
            <TabSummary index={0} movie={movie}></TabSummary>
            <TabArticles index={1} movie={movie}></TabArticles>
            <TabDates index={2} movie={movie}></TabDates>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
