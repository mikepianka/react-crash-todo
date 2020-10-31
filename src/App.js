import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";
import { v4 as uuid } from "uuid";
import Axios from "axios";

import "./App.css";

class App extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    let lsTodos = JSON.parse(localStorage.getItem("todoList"));

    if (lsTodos) {
      this.setState({ todos: lsTodos });
      console.log("rehydrated from localStorage");
    } else {
      console.log("localStorage empty; fetching examples");
      Axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=3"
      ).then((res) => this.setState({ todos: res.data }));
    }
  }

  // Update LocalStorage
  updateLS = (todoList) => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };

  // Toggle Complete
  markComplete = (id) => {
    console.log(`todo ${id} toggled`);

    let newTodoList = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    this.setState({ todos: newTodoList });

    this.updateLS(newTodoList);
  };

  // Delete Todo
  delTodo = (id) => {
    console.log(`removed todo ${id}`);

    let newTodoList = [...this.state.todos.filter((todo) => todo.id !== id)];

    this.setState({ todos: newTodoList });

    this.updateLS(newTodoList);
  };

  // Add Todo
  addTodo = (title) => {
    console.log(`added ${title}`);

    let newTodo = { title: title, completed: false, id: uuid() };

    let newTodoList = [...this.state.todos, newTodo];

    this.setState({ todos: newTodoList });

    this.updateLS(newTodoList);
  };

  render() {
    return (
      <Router basename="/">
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
