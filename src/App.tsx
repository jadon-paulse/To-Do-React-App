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

  public state = { value: "", todoArr: [], diffLists: [] };

  constructor(props: any) {
    super(props)
    this.loadAllData();
  }

  loadAllData = () => {
    todoApi.all().then(result => {
      this.setState({ todoArr: result, diffLists: result }, () => {
        // console.log(this.state);
      })
    });
  }
   
  onInputChange = (e: any) => {
    this.setState({ value: e.target.value })
    // console.log(todoApi.todos[id])
  }

  onSearch = (e: any) => {
    this.setState({ value: e.target.value })
  }

  buttonClick = (e: any) =>{
    const todo = {
      task: this.state.value,
      done: false,
    }
    todoApi.create(todo)
    todoApi.all().then(result => {
      this.setState({ todoArr: result }, () => {
        console.log(this.state);
      })
    });
  }

  switchDone = (todoItem: any) => {
    const todo = { ...todoItem, done: !todoItem.done }
    todoApi.update(todo.id, todo).then(() => {this.loadAllData()})
  }

  editButtonClick = (id: any) => {
    const todo = {
      id: id,
      task: this.state.value,
    }
    todoApi.update(id, todo).then(() => {this.loadAllData()})
  }

  removeButtonClick = (id: any) => {
    const todo = {
      id: id,
    }
    todoApi.remove(todo.id).then(() => {this.loadAllData()})
  }

  displayAllButtonClick = () => {
    this.loadAllData()
  }

  displayDoneButtonClick = () => {
      todoApi.filterBy("done",true).then(results => 
        {console.log(results);
          this.setState({ todoArr: results }, () => {
        console.log(this.state);
      })
    })
    // console.log(todo)
  }

  displayNotDoneButtonClick = () => {
    todoApi.filterBy("done",false).then(results => 
      {console.log(results);
        this.setState({ todoArr: results }, () => {
      console.log(this.state);
    })
  })
}

  searchButtonClick = () => {
    console.log("searchButtonClick->");
    const todo = {
      task: this.state.value,
    }
    todoApi.searchBy("task",todo.task).then(result => 
      {console.log("searchButtonClick ->",result);
        this.setState({ todoArr: result }, () => {
          console.log("clicked search",this.state)
    })
  })
  }

  public render() {

    // console.log(todoApi.create)
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the To Do List</h1>
        </header>
        <p className="App-intro">
          <code>Enter an activity you wish too complete</code>
        </p>
        <SearchInput todoArr={this.state.todoArr}
          onSearch={this.onSearch}
          search={this.state.value}
          searchButtonClick={this.searchButtonClick} />
          
        <TodoInput value={this.state.value}
          todoArr={this.state.todoArr}
          onInputChange={this.onInputChange} 
          buttonClick={this.buttonClick}
          displayDoneButtonClick={this.displayDoneButtonClick}
          displayAllButtonClick={this.displayAllButtonClick}
          displayNotDoneButtonClick={this.displayNotDoneButtonClick}
          diffLists={this.state.diffLists}/>
        <div>
          This is a value: {this.state.value}
        </div>
        <TodoList 
          todoArr={this.state.todoArr}  
          switchDone={this.switchDone}
          editButtonClick={this.editButtonClick}
          removeButtonClick={this.removeButtonClick}
        />
          
      </div>
    );
  }
}

export default App;

const TodoInput = (props: any) => {
    return (
      <div>
        <input type="text" placeholder="Enter New To Do" 
          value={props.value}
          onChange={props.onInputChange} />
        <button onClick={props.buttonClick}>Add To Do</button>

        <button onClick={props.displayAllButtonClick}>
            All
          </button>

          <button onClick={props.displayNotDoneButtonClick}>          
            To-Do
          </button>

          <button onClick={props.displayDoneButtonClick}>          
            Done
          </button>     
      </div>
    )
}

const SearchInput = (props: any) => {
    return(
      <div>
        <input type="text" placeholder="Enter Search Item" 
            value={props.value}
            onChange={props.onSearch} />
        <button onClick={props.searchButtonClick}>
          search
        </button> 
      </div>  
    )
}

const TodoList = (props: any) => {
  // console.log("props.todoArr->", props.todoArr);
  return props.todoArr.map((item: any) => {
    return (
      <li>
        {item.task}:{item.done ? "[Done]" : "[Must do!]"}

        <button onClick={task => props.switchDone(item)}>
          {item.done ? "NOT DONE" : "DONE" }
        </button>
        
        <button onClick={(e) => {props.editButtonClick(item.id)}}>
          Edit
        </button>

        <button onClick={(task) => {props.removeButtonClick(item.id)}}>
          X
        </button>
      </li>
    )
  })
}





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

// const myObj = {age: 10, name: "dead"};
// const Run = printLabel(myObj);

  // doneClick = (id: any) => {
  //   // this.setState({isDone: true}); 
  //   const todo = {
  //     id: id,
  //     done: true,
  //   }
  //   todoApi.update(id, todo).then(() => {this.loadAllData()})
  //   todoApi.update(todo.id, todo).then(() => {this.loadAllData()})
  // }

  // notDoneClick = (id: any) => {
  //   // this.setState({isDone: false});
  //   const todo = {
  //     id: id,
  //     done: false,
  //   }
  //   todoApi.update(id, todo).then(() => {this.loadAllData()})    
  // }