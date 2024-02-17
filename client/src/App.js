import React from "react";
import Home from "./home/home";
import Auth from "./components/auth/auth";
import {BrowserRouter as Router , Link , Routes, Route} from "react-router-dom"
const App = () => {
 

  return (
    <div className='container'>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path = "/auth" exact element = {<Auth />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
