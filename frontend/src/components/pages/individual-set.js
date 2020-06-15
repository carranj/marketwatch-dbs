import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';

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
        <div className="row">
              <div className="col-md-5">
                <h2>Product Name</h2>
              </div>
              <div className="col-md-3">
                <h2>Rarity</h2>
              </div>
              <div className="col-md-2">
                <h2>TCG Low Price</h2>
              </div>
              <div className="col-md-2">
                <h2>Imported Date</h2>
              </div>
            </div>
        {this.state.productsInSet.map( (val) => (
          <div>
            <div className="row">
              <div className="col-md-5">
                <Link to={{pathname:`/products/${val.product_id}`}}>{val.clean_name}</Link>
              </div>
              <div className="col-md-3">
                {val.rarity}
              </div>
              <div className="col-md-2">
                {val.low_price === null ? val.low_price = "Unavailable" : <NumberFormat value={val.low_price}  fixedDecimalScale={true} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'$'} /> }
              </div>
              <div className="col-md-2">
                <Moment format="MM/DD/YYYY">{val.imported_date}</Moment>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default IndividualSet;