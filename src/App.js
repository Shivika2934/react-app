import logo from "./logo.svg";
import "./App.css";
import Weather from "./Weather.js";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Welcome!</h2>
        <Weather city="Paris"/>
      </header>
    </div>
  );
}

export default App;
