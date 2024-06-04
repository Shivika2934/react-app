import "./App.css";
import Forecast from "./Forecast.js";

function App() {
  return (
    <div className="contents">
      <header>
        <Forecast />
      </header>
      <footer>
        <p>
          This page was coded by
          <a href="https://github.com/Shivika2934" link="">
            Shivika Mittal
          </a>
          and is on
          <a href="https://github.com/Shivika2934/react-app">Github</a> and
          hosted on
          <a href="https://main--super-sundae-82deb3.netlify.app/">Netlify</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
