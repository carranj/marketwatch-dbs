import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Link,
 } from "react-router-dom";

// Components
import Header from "./components/headerComponent/header";
import Footer from "./components/footerComponent/footer";
import HomePage from "./components/pages/homepage";
import Marketwatch from "./components/pages/market-watch";

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
        </div>
      </Router>
    );
  }
}

 
export default App;
