import React, { Component } from 'react';
import './aisle.css';
import { NavLink } from 'react-router-dom';
import GroceryList from './groceryList';

export default class Aisle extends Component {

    state = {
        selectedItems: []
    }

    // componentDidMount() {
    //     fetch(`http://localhost:3000/food/aisles/${this.props.match.params.aisle}`)
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Failed to load');
    //             }
    //             return response.json();
    //         })
    //         .then(aisle => {
    //             this.setState({
    //                 aisleId: aisle[0].id,
    //                 aisleName: aisle[0].name
    //             });
    //         })
    //         .catch(err => {
    //             console.error(err);
    //             this.setState({
    //                 error: err.message ? err.message : 'Failed to load'
    //             });
    //         });
    // }

    render() {
        const { items, aisle } = this.props;

        let theItems;


        theItems = aisle && items ? items.filter(item => item.aisle_num === aisle.id) : null;


        const deleteLink = aisle ? <NavLink to={`/deleteItem/${aisle.id}`}>Delete Item</NavLink> : null;

        return (
            <>

                <div id="itemDisplay" >
                    {aisle &&
                        <>
                            <h2>{aisle.name} Items</h2>

                            <NavLink to="/">Back to Aisles</NavLink> | <NavLink to={`/add/item/${aisle.id}`}>Add Item</NavLink> | {deleteLink}
                        </>
                    }

                    <div className="flex-container" >

                        {theItems &&
                            theItems.map(item =>
                                <div className="item" key={item.id} id={item.id} onClick={() =>
                                    this.props.onItemSelected(item)}>{item.name}</div>)}

                    </div>
                </div>
                {aisle && <GroceryList aisle={aisle.id} items={this.props.selectedItems} />}
            </>
        );
    }
}