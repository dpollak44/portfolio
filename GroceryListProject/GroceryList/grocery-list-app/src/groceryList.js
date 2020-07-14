import React, { Component } from 'react';
import './groceryList.css';
import { NavLink } from 'react-router-dom';

export default class GroceryList extends Component {

    arrayUnique = arr => {
        return arr.filter(function (item, index) {
            return arr.indexOf(item) >= index;
        });
    };





    render() {



        const { items, aisle } = this.props;


        const theList =/*aisle ? <h2>{aisle.name} List</h2> : <h2>List</h2>; */<h2>{aisle.name} List</h2>;

        let theItems = items.filter(item => item.aisle_num === aisle);

        let uniqueItems = this.arrayUnique(theItems);

        const listItems = uniqueItems ?
            uniqueItems.map(item => {
                if (item.count > 1) {
                    return <li key={item.id} id={item.id}>{item.count} {item.name}  </li>
                }
                else {
                    return <li key={item.id} id={item.id}>{item.name} </li>
                }
            }
            ) : null;

        //cant update state inside this.render,causes loop
        // if (aisle) { this.props.onItemList(listItems, aisle.name) };

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