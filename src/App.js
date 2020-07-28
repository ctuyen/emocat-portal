import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import EmoFace from "./EmoFace";
import Statistics from "./Statistics";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={'/statistics'}><Statistics /></Route>
          <Route path={'/demo'}><EmoFace /></Route>
          <Route path={'/'}><EmoFace /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
