import React, { Component } from 'react'
import * as axios from 'axios'

export default class UnaprovedReviews extends Component {
    state = {
        reviews: []
    }

    constructor(props) {
        super(props);

        axios.get(`${this.props.API_LINK}/unaproved-reviews?token=${this.props.token}`)
        .then((res) => {
            this.setState({ reviews: res.data.reviews});
        },
        function (error) {
            if (error.response.status === 401) {
                alert('You must authorise first!');
            }
        });
    }

    approveReview = (id) => {
        this.setState({ reviews: [...this.state.reviews.filter(review => review.id !== id)] });
        var securityToken = localStorage.getItem('securityToken');

        const reviewData = {id}

        var body = {
            token: securityToken,
            review_data: reviewData
        }

        axios.post(this.props.API_LINK + '/reviews', body)
        .then((res) => {
            var resData = res.data;
            if(resData.success) {
                
            } else {
                alert('An unexpected server error occured');
            }
        },
        function(error) {
            if(error.response.status === 401) {
                alert('You must authorise first!');
            }
        } );
    }

    render() {
        var reviews = this.state.reviews.map((review, key) => 
            <div key={ key } className="col-md-4 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title text-center">Point of Interest</h4>
                        <p className="card-text">{ review.review }</p>
                    </div>
                    <div className="card-footer">
                        <button  onClick={() => this.approveReview(review.id) } className="btn btn-block btn-warning recommend-button">Aprove</button>
                    </div>
                </div>
            </div>
        ); 
        return (
            <div>
                <div className="container">
                    <div className="row">
                        {reviews}
                    </div>
                </div>
            </div>
        )
    }
}
