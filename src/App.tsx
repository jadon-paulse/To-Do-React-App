import * as React from 'react';
import './App.css';

import todoApi from "./Api"

import logo from './logo.svg';

// interface TaggedValue {
//   name: string;
//   age: number
// }

// function printLabel (taggedObj: TaggedValue) {
//   console.log(taggedObj);
// }



class App extends React.Component {

  public state = { value: "", todoArr: [], isDone: false};

  constructor(props: any) {
    super(props)
    this.loadAllData();
  }

  loadAllData = () => {
    todoApi.all().then(result => {
      this.setState({ todoArr: result }, () => {
        console.log(this.state);
      })
    });
  }
   
  onInputChange = (e: any) => {
    this.setState({ value: e.target.value })
    // console.log(todoApi.todos[id])
  }

  buttonClick = (e: any) =>{
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
  }


  doneClick = (task: any, id: any) => {
    this.setState({isDone: true}), () => {
        
    }   
  }

  notDoneClick = (e: any) => {
    this.setState({isDone: false});
  }

  editButtonClick = (id: any) => {
    const todo = {
      id: id,
      task: this.state.value,
    }
    todoApi.update(id, todo).then(() => {this.loadAllData()})
    // return (
    //   <div>
    //     <input type="text" 
    //       value={props.id}
    //       onChange={props.onInputChange} />
    //   </div>
    // )
        // console.log(id)

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
          onInputChange={this.onInputChange} 
          buttonClick={this.buttonClick}/>
        <div>
          This is a value: {this.state.value}
        </div>
        <TodoList 
          todoArr={this.state.todoArr} 
          isDone={this.state.isDone} 
          doneClick={this.doneClick}
          notDoneClick={this.notDoneClick}
          editButtonClick={this.editButtonClick}
        />
          
      </div>
    );
  }
}

const TodoInput = (props: any) => {

  return (
    <div>
      <input type="text" placeholder="Enter New To Do" 
        value={props.value}
        onChange={props.onInputChange} />
      <button onClick={props.buttonClick}>Add To Do</button>
    </div>
  )
}

export default App;

const TodoList = (props: any) => {
  // console.log("props.todoArr->", props.todoArr);
  return props.todoArr.map((item: any) => {
    return (
      <li>
        {item.task}:{item.isDone ? "[Done]" : "[Must do!]"}

        <button onClick={task => props.doneClick(task,item.id)}>
        Done</button>

        <button onClick={(e) => {props.notDoneClick(item.id)}}>
        Not Done</button>

        <button onClick={() => { props.editButtonClick(item.id)}}>
        Edit</button>
      </li>
    )
  })
  // const isDone = props.isDone;
  // const listItems = props.todoArr.map((item: any) => 
  //      <li>{item.id} - {item.task}:{isDone ? "[Done]" : "[Must do!]"}

  //      <button onClick={task => props.doneClick(task,item.id)}>
  //      Done</button>

  //      <button onClick={(e) => {props.notDoneClick(item.id)}}>
  //      Not Done</button>

  //      <button onClick={(e) => {props.editButtonClick(item.id)}}>
  //      Edit</button></li>
  //   );
  // return(
  //   <ul>{listItems}</ul>
  // )
}

// const myObj = {age: 10, name: "dead"};
// const Run = printLabel(myObj);