function Accordion(props){
  const dataset = props.dataset;
  const movies = [];

  // Create array from object
  for (const key in dataset){
    const movie = {
      ...dataset[key]
    }
    movies.push(movie);
  }

  return <div>{movies.map(movie => {
    return <div>{movie.display_title}</div>;
  })}</div>
}


export default Accordion;
