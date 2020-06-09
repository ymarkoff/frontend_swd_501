import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import * as axios from 'axios'

export class Review extends Component {
    state = {
        reviewData: {
            review: ''
        },
        isAdded: false
    }

    constructor(props) {
        super(props);

        this.subroute = props.subroute;
    }
 
    onChange = (e) => { 
        const { reviewData } = { ...this.state };
        const currentState = reviewData;
        const { name, value } = e.target;
        currentState[name] = value;
      
        this.setState({ reviewData: currentState });
      }

    onSubmit = (e) => {
        e.preventDefault();

        var securityToken = localStorage.getItem('securityToken');

        var reviewData = this.state.reviewData;
        reviewData.poi_id = this.props.params.id;

        var body = {
            token: securityToken,
            review_data: reviewData
        }

        axios.put(this.props.API_LINK + '/reviews', body)
        .then((res) => {
            var resData = res.data;
            if(resData.success) {
                alert(resData.response_message);
                this.setState({ isAdded: true });
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
        return (
           this.state.isAdded
           ?<Redirect to={ `${this.subroute}/points` } />
           :<div>
                <div className="container">
                    <form onSubmit={ this.onSubmit }>
                        <div className="form-group">
                            <label>Your Revew:</label>
                            <textarea type="text" className="form-control" value={ this.state.reviewData.review } name="review" onChange={ this.onChange } placeholder="Describe the location"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Review
