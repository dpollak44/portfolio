import React, { Component } from 'react';
import Select from 'react-select';
import './deleteItem.css';
import { Link } from 'react-router-dom';







export default class Delete extends Component {
    state = {
        itemId: null,
        selectedOption: null

    };

    componentDidMount() {
        fetch(`http://localhost:3000/food/items/${this.props.match.params.aisle}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load');
                }
                return response.json();
            })
            .then(items => {
                this.setState({
                    items: items,
                });
            })

            .catch(err => {
                console.error(err);
                this.setState({
                    error: err.message ? err.message : 'Failed to load'
                });
            });

    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };


    handleDeleteItemButton = async e => {
        e.preventDefault();
        try {
            const resp = await fetch(`http://localhost:3000/food/items/${this.state.selectedOption.value}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!resp.ok) {
                return console.error(resp.statusText);
            }
            else {

                this.props.onDeleteItem(this.state.selectedOption.value);
            }
        } catch (e) {
            console.error(e);

        }
    }


    render() {
        const { selectedOption, items } = this.state;
        const { aisles } = this.props;

        const options = items ? items.map(item => ({ value: item.id, label: item.name })) : null;

        const deleteItem = <div id="deleteItemDiv">
            Item Name:
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
            />
            <br></br>


            <button onClick={e => this.handleDeleteItemButton(e)}><Link to={`/items/${this.props.match.params.aisle}`}>delete </Link></button>


        </div >;



        return (
            <>
                {deleteItem}

            </>
        );
    }
}