
import React, { Component } from 'react';
import './wholeList.css';
import { NavLink } from 'react-router-dom';

export default class WholeList extends Component {

    render() {

        const { selectedItems, aisles } = this.props;

        let listArray = [];
        let count = 0;
        aisles.forEach(aisle => {
            listArray[count++] = { aisle: aisle.name, items: selectedItems.filter(item => item.aisle_num === aisle.id) };
        });

        const uniqueLists = listArray.map(list => { return { aisle: list.aisle, items: list.items } });

        const theList = uniqueLists.map((list, i) => (<div className="listDiv" key={i}><h1>{list.aisle}</h1><ul>{list.items.map((item, j) => <li key={j}>{item.count} {item.name}</li>)}</ul></div>));

        return (
            <>
                <div id="wholeListDiv">
                    <NavLink to="/">Back to Aisles</NavLink>

                    <div className="flex-container">

                        {theList}
                    </div>
                </div>
            </>
        )
    }
}