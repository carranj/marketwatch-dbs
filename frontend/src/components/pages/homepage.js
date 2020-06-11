import React, { Component } from 'react';

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
                      <td>{val.set_name}</td>
                      <td>{val.release_date}</td>
                    </tr>
                    
                  ))}
                
                </tbody>
            </table>
            
      </div>

    );
  }
}

 
export default Homepage;
