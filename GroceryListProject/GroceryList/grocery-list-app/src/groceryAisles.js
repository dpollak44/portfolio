import React, { Component } from 'react';
import './groceryAisles.css';
import { Link, NavLink } from 'react-router-dom';


export default class GroceryOptionList extends Component {

    state = {
        aisles: null,
        items: [],
    };

    render() {
        const { aisles,/* items*/ onAisleSelected, /*aislesColors*/ } = this.props;


        return (
            <>


                <div id="aisles">
                    <h2>Aisles</h2>
                    <NavLink to="/add/aisle">Add Aisle</NavLink> | <NavLink to="/deleteAisle">Delete Aisle</NavLink>
                    <div className="flex-container" id="aisleDisplay" >
                        {aisles /*, aislesColors*/ &&
                            aisles.map(aisle =>
                                <div className="aisleDiv" key={aisle.id} id={aisle.id} onClick={() => onAisleSelected(aisle)}><Link style={{/* cursor: 'pointer', color: aislesColors[aisle.id],*/ textDecoration: 'none' }} className="link" to={`/items/${aisle.id}`}>{aisle.name}</Link></div>)}

                    </div>
                </div>
            </>
        );
    }

}