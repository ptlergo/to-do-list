import * as React from "react";
import { TaskButton } from "./";
import { IDisplayTaskProps, ITask } from "../App";

export default (props: IDisplayTaskProps): JSX.Element => {
  const { tasks, toggleDone, deleteTask } = props;

  const renderTaskHtml = (task: ITask): JSX.Element => {
    return (
      <p className={task.completed ? "is-completed" : ""}>{task.value}</p>
    );
  };

  /**
   * [note] no need to handling state here like initially thought as im handling the action here but using the event in
   * parent component.
   * @param task
   * @param index
   */
  const renderTaskButtonsHtml = (task: ITask, index: number): JSX.Element => {
    const configToggleDoneBtn: ITaskButtonProps = {
      action: () => toggleDone(index),
      type: "toggle",
      taskStatus: task.completed
    };
    const configDelBtn: ITaskButtonProps = {
      action: () => deleteTask(task.id),
      type: "delete"
    };

    return (
      <span className="btn-box">
        <TaskButton {...configDelBtn} />
        <TaskButton {...configToggleDoneBtn} />
      </span>
    );
  };

  /**
   * [why] because im using map() i prefer to have something more flexible when it comes to handling the markup, hence renderTaskButtonsHtml()
   */
  const renderHtml = (): JSX.Element => {
    const mappedTaskElements = tasks.map((task: ITask, index: number) => {
      if (task.value !== "") {
        return (
          <div className="tasks">
                <h2>Tasks:</h2>

          <article key={task.id} className="tdl-task">
            {renderTaskHtml(task)}
            {renderTaskButtonsHtml(task, index)}
          </article>
          </div>
        );
      }
    });

    return <section className="container">
    {mappedTaskElements}</section>;
  };

  return renderHtml();
};

export interface ITaskButtonProps {
  action(): void;
  type: string;
  taskStatus?: boolean;
}
