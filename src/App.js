import React, { Component } from "react";
import { HashRouter, Route} from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from "./components/Todos";
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
// import { v4 as uuid } from 'uuid';
import Axios from 'axios';

import "./App.css";

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
  }

  // Toggle Complete
  markComplete = (id) => {
    console.log(id)
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  }

  // Delete Todo
  delTodo = (id) => {
    console.log(`removed todo ${id}`);
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]}));
  }

  // Add Todo
  addTodo = (title) => {
    console.log(title);
    Axios.post('https://jsonplaceholder.typicode.com/todos', {title: title, completed: false})
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  }

  render() {
    return (
      <HashRouter basename='/'>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path='/' render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path='/about' component={About} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
