import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import Header from "./components/headerComponent/header";
import HomePage from "./components/pages/homepage";
import Marketwatch from "./components/pages/market-watch";
import IndividualSet from "./components/pages/individual-set";
import IndividualProduct from "./components/pages/individual-product";

//includes
import './App.css';
import './styles.scss';


class App extends Component {

  render() { 
    return (
      <Router> 
        <div className="App">
          <Header/>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/marketwatch' component={Marketwatch}/>
          <Route exact path='/sets/:id' component={IndividualSet}/>
          <Route exact path='/products/:id' component={IndividualProduct}/>
        </div>
      </Router>
    );
  }
}

 
export default App;
