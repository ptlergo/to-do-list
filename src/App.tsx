import * as React from "react";
import { Form, DisplayTask } from "./components";

/**
 * [note] the component with the state will have the actions as well that alter the state
 * pass these actions to child components
 */
export class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    // using super allows us to use 'this' for the state
    this.state = {
      currentTask: null,
      tasks: [
        {
          id: this._timeInMilliSeconds(),
          value: "",
          completed: false
        }
      ]
    };
  }

  /**
   * [note] not sure if splice is good to use here because of mutation.
   * splice changes the content of the array by replace/remove existing elements and/or adding new ones
   */
  public toggleDone = (index: number): void => {
    // remove the given index from array using splice
    let task: ITask[] = this.state.tasks.splice(index, 1);
    // first array element in task its 'completed' prop. value is toggled
    task[0].completed = !task[0].completed;
    // array of currentTasks is updated
    const tasks: ITask[] = [...this.state.tasks, ...task];
    this.setState({ tasks });
  };

  public deleteTask = (id: number): void => {
    // filter the task by checking every single one and check if id is not the same
    // then keep going until it is the same and filter it
    const tasks: Array<ITask> = this.state.tasks.filter(
      (task: ITask) => task.id !== id
    );

    this.setState({ tasks });
  };

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    if (value) {
      this.setState({ currentTask: value });
    }
  };

  public handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (this.state.currentTask) {
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
  };

  public render(): JSX.Element {
    return (
      <div>
        <Form
          currentTask={this.state.currentTask}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <DisplayTask
          tasks={this.state.tasks}
          toggleDone={this.toggleDone}
          deleteTask={this.deleteTask}
        />
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

export interface ITask {
  id: number;
  value: string;
  completed: boolean;
}

export interface IFormProps {
  currentTask: string;
  handleChange(e: any): void;
  handleSubmit(e: any): void;
}


export interface IDisplayTaskProps {
  tasks: any;
  toggleDone(index: number): void;
  deleteTask(id: number): void;
}