import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Api from "./service/api.service";

class App extends Component {
  myApi = new Api({url : 'http://localhost:5000/api/v1'});
  
  constructor(){
    super();
    this.state = { 
      'mesas': []
    };
    //this.myApi;
  }

  componentDidMount(){
    // fetch('http://localhost:5000/api/v1/mesas')
    // .then(result =>{
    //   return result.json();
    // })
    // .then(result =>{
    //   this.setState({mesas : result});

    //   console.log(this.state.mesas);
    // })   
    this.myApi.createEntity({name: 'mesas'});
    this.myApi.endpoints.mesas.getAll()
      .then(({data}) => {
        this.setState({mesas: data});
      })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>

        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          
        </p>
        <div>
          {
            this.state.mesas.map((element, indice) => {
              return(
                <div key={indice} >
                <p> {element.descricao} </p>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
