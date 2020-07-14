
import React, { Component } from 'react';
import './wholeList.css';
import { NavLink } from 'react-router-dom';

export default class WholeList extends Component {

    arrayUnique = arr => {
        return arr.filter(function (item, index) {
            return arr.indexOf(item) >= index;
        });
    };

    render() {

        const { selectedItems, aisles } = this.props;

        let listArray = [];
        let count = 0;
        aisles.forEach(aisle => {
            listArray[count++] = { aisle: aisle.name, items: selectedItems.filter(item => item.aisle_num === aisle.id) };
        });
        console.log('listArray', listArray);

        const uniqueLists = listArray.map(list => { return { aisle: list.aisle, items: this.arrayUnique(list.items) } });
        console.log(uniqueLists);

        const theList = uniqueLists.map((list, i) => (<div className="listDiv" key={i}><h1>{list.aisle}</h1><ul>{list.items.map((item, j) => <li key={j}>{item.count} {item.name}</li>)}</ul></div>));
        console.log('thelist', theList);

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