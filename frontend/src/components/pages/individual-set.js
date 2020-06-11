import React, { Component } from 'react';

class IndividualSet extends Component {
  groupId = this.props.match.params.id;
  state = {
    setInfo: [],
    productsInSet: []
  }
  
  componentDidMount() {
    fetch(`http://localhost:3000/sets/${this.groupId}`)
    .then((response) => response.json())
    .then(res => {
        this.setState({ 
          setInfo: res
        });
    });

    fetch(`http://localhost:3000/products/sets/${this.groupId}`)
    .then((response) => response.json())
    .then(res => {
        this.setState({ 
          productsInSet: res
        });
    });
  }
  render() { 
    return (  
      <div className="container-fluid">
        <h1>{this.state.setInfo.set_name}</h1>
        {this.state.productsInSet.map( (val) => (
          <div>
            <div className="row">
              <div className="col-md-6">
                {val.clean_name}
              </div>
              <div className="col-md-3">
                ${val.low_price}
              </div>
              <div className="col-md-3">
                {val.imported_date}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default IndividualSet;