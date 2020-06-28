import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';

class Homepage extends Component {
  state = {
    sets: []
  }
    componentDidMount() {
      fetch("http://localhost:3000/sets")
      .then((response) => response.json())
      .then(res => {
          this.setState({ 
            sets: res
          });
      });
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
                  {this.state.sets.map( (val) => (
                    <tr key = {val.group_id}>
                      <td><Link to={{ pathname: `sets/${val.group_id}` }}>{val.set_name}</Link></td>
                      <td><Moment format="MMMM DD, YYYY">{val.release_date}</Moment></td>
                    </tr>
                    
                  ))}
                
                </tbody>
            </table>
            
      </div>

    );
  }
}

 
export default Homepage;
