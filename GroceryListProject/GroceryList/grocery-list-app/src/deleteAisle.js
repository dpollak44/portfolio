import React, { Component } from 'react';
import Select from 'react-select';
import './deleteAisle.css';
import { Link } from 'react-router-dom';

export default class Delete extends Component {
    state = {

        selectedOption: null,

    };


    handleDeleteAisleButton = async e => {
        e.preventDefault();
        try {
            const resp = await fetch(`http://localhost:3000/food/aisles`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ aisle: this.state.selectedOption.value })
            });

            if (!resp.ok) {
                return console.error(resp.statusText);
            }
            else {

                this.props.onDeleteAisle(this.state.selectedOption.value);
            }

        } catch (e) {
            console.error(e);

        }
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };


    render() {
        const { selectedOption } = this.state;
        const { aisles } = this.props;

        const options = aisles ? aisles.map(aisle => ({ value: aisle.id, label: aisle.name })) : null;

        const deleteAisle = <div id="deleteAisleDiv">
            Aisle Name:
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
            />
            <br></br>

            <button onClick={e => this.handleDeleteAisleButton(e)}><Link to="/">delete</Link></button>

        </div>;


        return (
            <>
                {deleteAisle}

            </>
        );
    }
}