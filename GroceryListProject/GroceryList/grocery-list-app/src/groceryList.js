import React, { Component } from 'react';
import './groceryList.css';
import { NavLink } from 'react-router-dom';

export default class GroceryList extends Component {

    render() {

        const { items, aisle } = this.props;


        const theList = <h2>{aisle.name} List</h2>;

        let theItems = items.filter(item => item.aisle_num === aisle.id);

        const listItems = theItems ?
            theItems.map(item => {
                if (item.count > 1) {
                    return <li key={item.id} id={item.id}>{item.count} {item.name}  </li>
                }
                else {
                    return <li key={item.id} id={item.id}>{item.name} </li>
                }
            }
            ) : null;

        return (
            <div id="list">

                {theList}

                <NavLink to="/wholeList">Full List</NavLink>

                <ul>
                    {listItems}
                </ul>

            </div>

        )
    }
}