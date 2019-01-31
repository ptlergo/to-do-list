import * as React from "react";
import DisplayTask from "./DisplayTask";

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

  // methods are public if they are rendered in html

  public handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
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
  }

  public deleteTask(id: number): void {
      // filter the task by checking every single one and check if id is not the same 
      // then keep going until it is the same and filter it
    const filteredTasks: Array<ITask> = this.state.tasks.filter(
      (task: ITask) => task.id !== id
    );

    this.setState({tasks: filteredTasks})
  }

  // delete a task. we need to know which task, which means we need a key

  public renderTasks(): JSX.Element[] {
    return this.state.tasks.map((task: ITask) => {
      return (
        <div key={task.id}>
          <span>{task.value}</span>
          <button onClick={() => this.deleteTask(task.id)}>Delete</button>
        </div>
      );
    });
  }

  public renderHtml(): JSX.Element {
    return (
      <div>
        {/* use the context of the class, not the render
          by adding the fat arrow function */}
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            placeholder="add a task"
            value={this.state.currentTask}
            onChange={e => this.setState({ currentTask: e.target.value })}
          />
          <button type="submit">Add Task</button>
        </form>
        <section>{this.renderTasks()}</section>
      </div>
    );
  }

  public render(): JSX.Element {
    return (
      <div>
        {this.renderHtml()}
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

interface IState {
  currentTask: string;
  tasks: Array<ITask>;
}

interface ITask {
  id: number;
  value: string;
  completed: boolean;
}
