import classes from "./Tabs.module.scss";
import { useState } from "react";
import { createContext, useContext } from "react";

const TabIndexContext = createContext(0);

export function TabSummary(props) {
  const tabIndex = useContext(TabIndexContext);
  const movie = props.movie;
  return (
    <div className={props.index === tabIndex ? classes.content + " " + classes.active : classes.content}>
      <img alt={movie.headline} src={movie.multimedia.src} />
      <div>
        <h3>{movie.display_title}</h3>
        <small>Byline: {movie.byline}</small>
        <p>{movie.summary_short}</p>
      </div>
    </div>
  );
}

export function TabArticles(props) {
  const tabIndex = useContext(TabIndexContext);
  const movie = props.movie;
  return (
    <div className={props.index === tabIndex ? classes.content + " " + classes.active : classes.content}>
      <p>
        <a href={movie.link.url} target="_blank" rel="noreferrer">
          {movie.link.suggested_link_text}
        </a>
      </p>
    </div>
  );
}

export function TabDates(props) {
  const tabIndex = useContext(TabIndexContext);
  const movie = props.movie;
  return (
    <div className={props.index === tabIndex ? classes.content + " " + classes.active : classes.content}>
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
  );
}

export function TabPills(props) {
  const [tabIndex, setTabIndex] = useState(0);

  function changeTab(index) {
    setTabIndex(index);
  }

  const tabLabels = props.tabs;
  return (
    
      <div className={classes.pills}>
        {tabLabels.map((tab, index) => {
          // render the tabs
          return (
            <span key={index} className={tabIndex === index ? classes.pill + " " + classes.active : classes.pill} onClick={() => changeTab(index)}>
              {tab}
            </span>
          );
        })}
      </div>
    
  );
}
