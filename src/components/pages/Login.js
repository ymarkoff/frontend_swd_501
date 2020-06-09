import React, { Component } from 'react'

export class Login extends Component {
    state = {
        username : '',
        password : ''
    }

    constructor(props) {
        super(props);
        this.state = {hidden : true};
    }

    handleInputChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        var userData = {
            username : this.state.username,
            password : this.state.password
        };

        this.props.login(userData);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({hidden: false});
        }, this.props.waitBeforeShow);
    }

    render() {
        return (
            this.props.isLoading
            ? 'Loading...'
            :<div style={{width: '100%'}}>
                <div className="d-inline-flex justify-content-center">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" name="username" value={this.state.username} onChange={ this.handleInputChange } />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" value={this.state.password} onChange={ this.handleInputChange } />
                        </div>
                        <input type="submit" className="btn btn-primary"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login
