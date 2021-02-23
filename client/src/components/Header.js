import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div className="nav-wrapper">
                <a className= "left brand-log">
                    Full-Stack-React
                </a>
                <a className= "right brand-log">
                    Signin With Google
                </a>
            </div>
        );
    }
}

export default Header;