import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

    renderConstent(){
        switch (this.props.auth){
            case null:
                return;
            case false:
                return 
                <li>
                    <a href="/auth/google">Signin Using Google</a>
                </li>;
            default:
                return 
                <li>
                    <a href="/api/logout">Signout</a>
                </li>;
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                    to={ this.props.auth ? '/surveys': '/' } 
                    className= "left brand-log">
                        Full-Stack-React
                    </Link>
                    <ul className= "right">
                        { this.renderConstent() }
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(auth) {
    return { auth };
}

export default connect(mapStateToProps) (Header);