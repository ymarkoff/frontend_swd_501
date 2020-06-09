import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export class Header extends Component {
    state = {
        userData: this.props.userData
    }

    constructor (props) {
        super(props);

        this.subroute = props.subroute;
    }

    logoutUser = (e) => {
        e.preventDefault();
        this.props.logout();
    }

    render () {
        const userData = this.props.userData;
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">PointsOfInterest</div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <button className="btn btn-link text-secondary"><Link to={ `${this.subroute}/` } style={ linkStyle }>Home</Link></button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link text-secondary"><Link to={ `${this.subroute}/points/add-point` } style={ linkStyle }>Add a Point</Link></button>
                        </li>
                        {userData.isadmin
                            ?<li className="nav-item dropdown">
                                <button className="btn btn-link dropdown-toggle text-secondary" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Admin Panel
                                </button>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <button className="btn btn-link text-secondary dropdown-item"><Link to={ `${this.subroute}/reviews/unaproved` } style={ linkStyle }>Aprove Reviews</Link></button>
                                </div>
                            </li>
                            :''
                        }
                    </ul>
                    <form className="form-inline my-2 my-lg-0" >
                        <h5>Welcome, { this.props.userData.username }!</h5>&nbsp;&nbsp;
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                            {this.props.isLogged
                                ?<span onClick={ this.logoutUser }>Logout</span>
                                :<Link to={ `${this.subroute}/login` } style={linkStyle}>Login</Link>
                            }
                            </button>
                    </form>
                </div>
                </nav>
            </header>
        )
    }
}

// const headerStyle = {
//     background: '#333',
//     color: '#fff',
//     textAlign: 'center',
//     padding: '10px'
// }

const linkStyle = {
    textDecoration: 'none',
    height: '100%',
    width: '100%',
    display: 'inline-block'
}

export default Header;