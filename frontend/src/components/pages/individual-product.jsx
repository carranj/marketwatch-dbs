import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import NumberFormat from 'react-number-format';

class IndividualProduct extends Component {
  productId = this.props.match.params.id;
  product = [{}];
  state = {
    archiveInfo: [],
  }
  
  componentDidMount() {

    fetch(`http://localhost:3000/products/${this.productId}`)
    .then((response) => response.json())
    .then(res => {
      this.product = res[0];
      this.setState({ 
        setInfo: res[0]
      });
    })

    fetch(`http://localhost:3000/products/archive/${this.productId}`)
    .then((response) => response.json())
    .then(res => {
      this.setState({ 
        archiveInfo: res
      });
    })
  }

  render() {
    return (  
      <div className="container-fluid">
        <Link to={location => `/sets/${this.product.group_id}`}>View all cards in set</Link>
        <h1>{this.product.product_name}</h1>
        <div className="row">
          <div className="col-md-3">
            <a target="_blank" href={this.product.tcg_url}>
            
              <img src={this.product.image_url} alt={this.product.productName} />
            </a>
           </div>
           <div className="col-md-9">
              <p>Last Imported Date: {this.product.imported_price}</p>
           </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h3>Price History</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <h4>Price</h4>
          </div>
          <div className="col-md-3">
            <h4>Date</h4>
          </div>
        </div>
        
        {
          this.state.archiveInfo.map( 
            (val) => (
              <div className="row">
                <div className="col-md-3">
                {val.low_price === null ? val.low_price = "Unavailable" : <NumberFormat value={val.low_price}  fixedDecimalScale={true} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'$'} /> }
                </div>
                <div className="col-md-3"><Moment format="MM/DD/YYYY">{val.imported_date}</Moment></div>
              </div>
            )
          )
        }
        
      </div>
    );
  }
}

export default IndividualProduct;