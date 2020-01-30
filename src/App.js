import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/navBar";
import Home from "./components/Home";
import Flatmates from "./components/Flatmates";
import Chat from "./components/Chat";
import Kitchen from "./components/rooms/Kitchen/Kitchen";
import Living from "./components/rooms/Living/Living";
import Washroom from "./components/rooms/Washroom/Washroom";
import Entrance from "./components/rooms/Entrance/Entrance";
import Terrace from "./components/rooms/Terrace/Terrace";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route path="/flatmates" component={Flatmates} />
        <Route path="/chat" component={Chat} />
        <Route path="/kitchen" component={Kitchen} />
        <Route path="/living" component={Living} />
        <Route path="/washroom" component={Washroom} />
        <Route path="/entrance" component={Entrance} />
        <Route path="/terrace" component={Terrace} />
      </div>
    </Router>
  );
}

export default App;
