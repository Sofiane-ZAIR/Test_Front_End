import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DialogFormulaire from "./Components/DialogFormulaire";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <DialogFormulaire />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
