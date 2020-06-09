import React from 'react'
// import PropTypes from 'prop-types'
import * as axios from 'axios'
import { Redirect } from 'react-router-dom';
import Authable from '../auth/Authable';

export class AddPoint extends Authable {
    state = {
        pointData: {
            name: '',
            type: '',
            country: '',
            region: '',
            description: ''
        },
        isAdded: false,
    }

    constructor(props) {
        super(props);

        this.subroute = props.subroute;
    }

    onChange = (e) => { 
        const { pointData } = { ...this.state };
        const currentState = pointData;
        const { name, value } = e.target;
        currentState[name] = value;
      
        this.setState({ pointData: currentState });
      }
    
    onSubmit = (e) => {
        e.preventDefault();

        var securityToken = localStorage.getItem('securityToken');

        var body = {
            token: securityToken,
            point_data: this.state.pointData
        }

        axios.put(this.props.API_LINK + '/points', body)
        .then((res) => {
            var resData = res.data;
            if(resData.success) {
                alert(resData.response_message);
                this.setState({ isAdded: true });
            } else {
                alert('An unexpected server error occured');
            }
        },
        function (error) {
            if (error.response.status === 401) {
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
                            <label>Name</label>
                            <input type="text" className="form-control" value={ this.state.pointData.name } name="name" onChange={ this.onChange } placeholder="Location name" />
                        </div>
                        <div className="form-group">
                            <label>Type</label>
                            <input type="text" className="form-control" value={ this.state.pointData.type} name="type" onChange={ this.onChange } placeholder="e.g. City, Historical Building, Restaurant" />
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <input type="text" className="form-control" value={ this.state.pointData.country } name="country" onChange={ this.onChange } placeholder="Country Name" />
                        </div>
                        <div className="form-group">
                            <label>Region</label>
                            <input type="text" className="form-control" value={ this.state.pointData.region } name="region" onChange={ this.onChange } placeholder="e.g. Hampshire, Normandy, Bavaria, etc." />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea type="text" className="form-control" value={ this.state.pointData.description } name="description" onChange={ this.onChange } placeholder="Describe the location"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddPoint
