import React, { Component } from 'react';
import GroceryAisles from './groceryAisles.js';
import './App.css';
import Aisle from './aisle.js';


import Add from './add';
import DeleteAisle from './deleteAisle';
import DeleteItem from './deleteItem';
import { NavLink, Route, Switch } from 'react-router-dom';
import WholeList from './wholeList.js';
import PersonalLists from './personalLists';





export default class App extends Component {
  state = {
    items: null,
    aisles: [],
    selectedItems: [],
    aislesColors: [],


  };

  componentDidMount() {
    fetch('http://localhost:3000/food/aisles')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load');
        }
        return response.json();
      })
      .then(aisles => {
        this.setState({
          aisles: aisles,
        });
      })

      .catch(err => {
        console.error(err);
        this.setState({
          error: err.message ? err.message : 'Failed to load'
        });
      });



    fetch(`http://localhost:3000/food/items`)
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





  handleAisleSelected = aisle => {
    this.setState({
      selectedAisle: aisle,
    });

  }

  handleItemSelected = item => {

    console.log('item.count', item.count);

    if (item.count) {
      item.count++
    }
    else {
      item.count = 1;
    }


    this.setState({
      selectedItems: [...this.state.selectedItems, item]
    });
    console.log('grocerylist', this.state.selectedItems);

  };


  handleAddAisle = aisle => {
    this.setState({
      aisles: [...this.state.aisles, aisle]
    })
  }

  handleAddItem = item => {
    this.setState({
      items: [...this.state.items, item]
    })
  }

  handleDeleteAisle = id => {
    console.log('id', id)
    this.setState({
      aisles: this.state.aisles.filter(aisle => aisle.id !== +id)
    })


  }

  handleDeleteItem = id => {
    this.setState({
      items: this.state.items.filter(item => item.id !== +id)
    })
  }


  render() {

    const { items, aisles, selectedItems, selectedAisle } = this.state;

    return (
      <>
        <div className="container">
          <div id="logo">
            <h1>Grocery List App</h1>
          </div>
          <div id="nav">
            <ul>
              <li>
                <NavLink exact to="/"
                  style={{
                    color: "green"
                  }}
                  activeStyle={{
                    color: "red"
                  }}>Aisles</NavLink>
              </li>
              <li>
                <NavLink to="/wholeList"
                  style={{
                    color: "green"
                  }}
                  activeStyle={{
                    color: "red"
                  }}>Whole List</NavLink>
              </li>
              <li>
                <NavLink exact to="/personalLists"
                  style={{
                    color: "green"
                  }}
                  activeStyle={{
                    color: "red"
                  }}>Personal Lists</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="flex-container">


          <Switch>
            <Route path="/" exact render={(routeProps) => (<GroceryAisles {...routeProps} aisles={aisles} onAisleSelected={this.handleAisleSelected} /*aislesColors={aislesColors}*/ />)} />
            <Route path="/items/:aisle" render={(routeProps) => (<Aisle {...routeProps} aisle={selectedAisle} items={items} selectedItems={selectedItems} onItemSelected={this.handleItemSelected} />)} />
            <Route path="/add/:type/:aisle?" render={(routeProps) => (<Add aisles={aisles} {...routeProps} onAddAisle={this.handleAddAisle} onAddItem={this.handleAddItem} />)} />
            <Route path="/deleteAisle" render={(routeProps) => (<DeleteAisle aisles={aisles} onDeleteAisle={this.handleDeleteAisle} {...routeProps} />)} />
            <Route path="/wholeList" render={(routeProps) => (<WholeList {...routeProps} selectedItems={this.state.selectedItems} aisles={this.state.aisles} />)} />
            <Route path="/deleteItem/:aisle" render={(routeProps) => (<DeleteItem aisles={aisles} items={items} onDeleteItem={this.handleDeleteItem} {...routeProps} />)} />
            <Route path="/personalLists" component={PersonalLists} />
          </Switch>
        </div>
      </>
    );
  }
}

