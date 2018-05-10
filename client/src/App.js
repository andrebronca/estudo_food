import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = { 
      'mesas': []
    };
  }

  componentDidMount(){
    fetch('http://localhost:5000/api/v1/mesas')
    .then(result =>{
      return result.json();
    })
    .then(result =>{
      this.setState({mesas : result});

      console.log(this.state.mesas);
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
