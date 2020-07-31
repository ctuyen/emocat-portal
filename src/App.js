import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import EmoFace from "./EmoFace";
import Statistics from "./Statistics";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={'/dashboard'}><Dashboard /></Route>
          <Route path={'/statistics'}><Statistics /></Route>
          <Route path={'/demo'}><EmoFace /></Route>
          <Route path={'/'}><EmoFace /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
