import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {

  render() { 
    return (  
        <header>
            <div className ="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        MarketWatch
                    </div>
                    <div className="col-md-9">
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/marketwatch">Market Watch</Link></li>
                        </ul>
                    </nav>
                    </div>
                </div>
            </div>
      </header>
    );
  }
}

 
export default Header;
