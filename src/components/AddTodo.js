import React, { Component } from 'react'

export class AddTodo extends Component {
  // example of component state, only exists in the AddTodo component
  state = {
    title: ''
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: '' });
  }

  onChange = (e) => this.setState({ title: e.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
        <input 
          type='text' 
          name='title' 
          placeholder='Add Todo...' 
          style={{ flex: '10', padding: '5px' }}
          value={this.state.title}
          onChange={this.onChange}
        />
        <input 
        type='submit' 
        value='submit' 
        className='btn' 
        style={{flex: '1'}}
        />
      </form>
    )
  }
}

export default AddTodo
