import React, { Component } from 'react';

export default class Test extends Component {

    render() {
        console.log(this.props.location.state)
        return (

            <h1>PCS Blog
            </h1>

        );
    }

}