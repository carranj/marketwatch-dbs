import React, { Component } from 'react';
import axios from 'axios';

class Homepage extends Component {

    constructor () {
        super()
    }


  render() { 
    return (  
      <div className="container-fluid">
          <h2>List of Sets</h2>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">Set Name</th>
                        <th scope="col">Release Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Universal Onslaught</td>
                        <td>February 14, 2020</td>
                    </tr>
                </tbody>
            </table>
            
      </div>

    );
  }
}

 
export default Homepage;
