import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import './Points.css'
import * as axios from 'axios'
import { Link } from 'react-router-dom'

export class Points extends Component {
    state = {
        points: []
    }

    constructor(props) {
        super(props);
        
        this.subroute = this.props.subroute;

        this.recommendPoint = this.recommendPoint.bind(this);

        axios.get(`${this.props.API_LINK}/points?token=${this.props.token}`)
        .then((res) => {
            this.setState({ points: res.data});
        },
        function (error) {
            if (error.response.status === 401) {
                alert('You must authorise first!');
            }
        });
    }

    recommendPoint = (point, key) => {
        axios.post(`${ this.props.API_LINK }/points`, {ID: point.ID})
        .then((res) => {
            if(res.data.success) {
                alert(res.data.response_message);

                point.recommended++;
                const points = this.state.points;
                points[key] = point;
                this.setState({ points: points});
            } else {
                //Error handling
            }
        })
    }

    render() {
        this.points = this.state.points.map((point, key) => 
            <div key={ key } className="col-md-4 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title text-center">{ point.name }</h4>
                        <p>Type: { point.type }</p>
                        <p>Country: { point.country }</p>
                        <p>Region: { point.region}</p>
                        <p className="card-text">{ point.description }</p>
                        <p><small>Added by: {point.username }</small></p>
                        <p>Recommended { point.recommended } times
                        </p>
                        <p className="text-center">
                            <u>
                                <Link to={ this.props.subroute + '/points/' + point.ID + '/review'} className="mr-3">Review</Link>| 
                                <Link to={ this.props.subroute + '/points/' + point.ID + '/reviews'} className="ml-3">Read Reviews</Link>
                            </u>
                        </p>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-block btn-warning recommend-button" onClick={ () => this.recommendPoint(point, key) }>Recommend</button>
                    </div>
                </div>
            </div>
        ); 

        return (
            <div>
                <div className="container">
                    <div className="row">
                        {this.points}
                    </div>
                </div>
            </div>
        )
    }
}

export default Points
