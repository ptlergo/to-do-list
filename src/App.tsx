import * as React from "react";
import { Form, DisplayTask } from "./components";

export class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    // using super allows us to use 'this' for the state
    this.state = {
      currentTask: "",
      tasks: [
        {
          id: this._timeInMilliSeconds(),
          value: "",
          completed: false
        }
      ]
    };
  }

  public deleteTask(id: number): void {
    // filter the task by checking every single one and check if id is not the same
    // then keep going until it is the same and filter it
    const tasks: Array<ITask> = this.state.tasks.filter(
      (task: ITask) => task.id !== id
    );

    this.setState({ tasks });
  }

  // public method because its affecting html
  // * i dont think its good to use splice as its mutating the original array
  // splice changes the contents of an array by replace/remove existing elements and/or adding new ones
  public toggleDone(index: number): void {
    // remove the given index from array using splice
    let task: ITask[] = this.state.tasks.splice(index, 1);
    // first array element in task its 'completed' prop. value is toggled
    task[0].completed = !task[0].completed;
    // array of currentTasks is updated
    const tasks: ITask[] = [...this.state.tasks, ...task];

    this.setState({ tasks });
  }
  // delete a task. we need to know which task, which means we need a key

  public renderTasks(): JSX.Element[] {
    return this.state.tasks.map((task: ITask, index: number) => {
      return (
        <div key={task.id} className="tdl-task">
          <span className={task.completed ? "is-completed" : ""}>
            {task.value}
          </span>
          <button onClick={() => this.deleteTask(task.id)}>Delete</button>
          <button onClick={() => this.toggleDone(index)}>
            {task.completed ? "undo" : "done"}
          </button>
        </div>
      );
    });
  }

  public handleChange = (e: any): void => {
    const { value } = e.target;
    this.setState({ currentTask: value });
  };

  public handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({
      currentTask: "",
      tasks: [
        ...this.state.tasks,
        {
          id: this._timeInMilliSeconds(),
          value: this.state.currentTask,
          completed: false
        }
      ]
    });
  };

  public render(): JSX.Element {
    return (
      <div>
        <Form
          state={this.state}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        {this.renderTasks()}
        {/* <DisplayTask tasks={this.state.tasks} /> */}
      </div>
    );
  }
  // makes a unique id
  private _timeInMilliSeconds(): number {
    const date: Date = new Date();
    return date.getTime();
  }
}

// nesting interfaces
interface IState {
  currentTask: string;
  tasks: Array<ITask>;
}

interface ITask {
  id: number;
  value: string;
  completed: boolean;
}
