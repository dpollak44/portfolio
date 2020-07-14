import React, { Component } from 'react';
import './add.css';
import { Link } from 'react-router-dom';

export default class Add extends Component {
    state = {
        itemName: " ",
        aisleName: " ",

    };

    handleNameInput = e => {
        this.setState({
            itemName: e.target.value
        });
        console.log('itemName', this.state.itemName)
    }

    handleAisleInput = e => {
        this.setState({
            aisleName: e.target.value
        });
    }

    handleAddItemButton = async e => {
        console.log(this.state.itemName, +this.props.match.params.aisle)
        e.preventDefault();
        try {
            const resp = await fetch('http://localhost:3000/food/items', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: this.state.itemName, aisle: +this.props.match.params.aisle })
            });

            if (!resp.ok) {
                return console.error(resp.statusText);
            }
            else {
                const data = await resp.json();
                console.log(data);
                this.props.onAddItem(data);
            }
        } catch (e) {
            console.error(e);

        }


    }

    handleAddAisleButton = async e => {
        e.preventDefault();
        try {
            const resp = await fetch('http://localhost:3000/food/aisles', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ aisle: this.state.aisleName })
            });

            if (!resp.ok) {
                return console.error(resp.statusText);
            }
            else {
                const data = await resp.json();
                console.log(data);
                this.props.onAddAisle(data);
            }
        } catch (e) {
            console.error(e);

        }
    }


    render() {
        console.log(this.props.aisles)
        console.log('matchAisle', this.props.match.params.aisle)

        const addItem = <div id="addItemDiv">
            Item Name:
<input type="text" value={this.state.itemName} name="ItemInput" onChange={e => this.handleNameInput(e)}></input>
            <br></br>

            <button onClick={e => this.handleAddItemButton(e)}> <Link to={`/items/${this.props.match.params.aisle}`}>add</Link></button>

        </div>;

        const addAisle = <div id="addAisleDiv">
            Aisle Name:
        <input type="text" value={this.state.aisleName} name="ItemInput" onChange={this.handleAisleInput}></input>
            <br></br>

            <button onClick={e => this.handleAddAisleButton(e)}><Link to="/">add</Link></button>

        </div>;

        console.log(this.props.match.params.type)

        const display = this.props.match.params.type === 'aisle' ? addAisle : addItem;
        return (
            <>
                {display}

            </>
        );
    }
}
