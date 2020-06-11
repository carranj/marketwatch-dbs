import React, { Component } from 'react';

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
        <h1>{this.product.product_name}</h1>
        <div className="row">
          <div className="col-md-3">
            <img src={this.product.image_url} />
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
                <div className="col-md-3">{val.low_price}</div>
                <div className="col-md-3">{val.imported_date}</div>
              </div>
            )
          )
        }
        
      </div>
    );
  }
}

export default IndividualProduct;