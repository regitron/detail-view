import classes from "./Accordion.module.scss";

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
    <div className={classes.container}>
      {movies.map((movie) => {
        return (
          <div key={movie.key} className={classes.accordion}>
            {movie.display_title}
            <div className={classes.inner}>
              <p>Tabs goes here</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
