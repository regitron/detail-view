import Header from "./layout/Header";
import Section from "./layout/Section";
import DatasetMovies from "./Dataset/Movies";

import "./App.module.scss";
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Section>
        <h1>Critics Top 20 Movies</h1>
        <DatasetMovies></DatasetMovies>
      </Section>
    </div>
  );
}

export default App;
