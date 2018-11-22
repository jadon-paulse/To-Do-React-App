import * as React from 'react';
import './App.css';

import todoApi from "./Api"

import logo from './logo.svg';

class App extends React.Component {

  public state = { value: "", todoArr: [], isDone: false };

  constructor(props: any) {
    super(props)
  }

  onInputChange = (e: any) => {
    this.setState({ value: e.target.value })
  }

  buttonClick = (e: any) => {
    const todo = {
      task: this.state.value,
      done: this.state.isDone
    }
    todoApi.create(todo)
    todoApi.all().then(result => {
      this.setState({ todoArr: result }, () => {
        console.log(this.state);
      })
    });

    // this.setState({}, () => { console.log("test2") });
    // this.setState({}).then((a: any, b: any) => { console.log("test3") });
  }

  public render() {

    console.log(todoApi.create)
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the To Do List</h1>
        </header>
        <p className="App-intro">
          <code>Enter an activity you wish too complete</code>
        </p>
        <TodoInput value={this.state.value}
          onInputChange={this.onInputChange} buttonClick={this.buttonClick} />
        <div>
          This is a value: {this.state.value}
        </div>
        <TodoList todoArr={this.state.todoArr} isDone={this.state.isDone} />
      </div>
    );
  }
}

const TodoInput = (props: any) => {

  return (
    <div>
      <input type="text" placeholder="Enter New To Do" value={props.value}
        onChange={props.onInputChange} />
      <button onClick={props.buttonClick}>Add To Do</button>
    </div>
  )
}

export default App;

const TodoList = (props: any) => {
  const isDone = props.isDone;
   const listItems = props.todoArr.map((item: any) => 
       <li>{item.task}:{isDone ? "[Done]" : "[Must do!]"}</li>  
    );
  return(
    <ul>{listItems}</ul>
  )
}
