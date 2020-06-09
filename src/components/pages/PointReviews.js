import React, { Component } from 'react'
import * as axios from 'axios'

export class PointReviews extends Component {
    state = {
        reviews: []
    }

    constructor (props) {
        super(props);

        axios.get(`${this.props.API_LINK}/points/${this.props.params.pointID}/reviews`)
        .then((res) => {
            if(!res.data.length) {
                alert('There are no approved reviews for this location yet!');
            } else {
                this.setState({ reviews: res.data});
            }
        },
        function(error) {
            if(error.response.status === 401) {
                alert('You must authorise first!');
            }
        });
    }

    render() {
        var reviews = this.state.reviews.map((point, key) => 
                <div key={ key } className="col-md-4 mb-4">
                    <div className="card rounded">
                        <div className="card-body text-center">
                            {/* <h4 className="card-title text-center">{ point.name }</h4> */}
                            <p>{ point.review }</p>
                        </div>
                    </div>
                </div>
            ); 

        return (
            <div>
                <div className="container">
                    <div className="row">
                        {reviews.length
                            ?reviews
                            :<h4>Loading...</h4>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default PointReviews
