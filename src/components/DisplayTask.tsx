import * as React from "react";
import { TaskButton } from "./";

export default (props: any) => {
  const { tasks, toggleDone, deleteTask } = props;

  const renderTaskHtml = (task: any) => {
    return (
      <span className={task.completed ? "is-completed" : ""}>{task.value}</span>
    );
  };

  /**
   * @todo how to handle state changes in child component: react hooks will work well.
   *  [important] no need, as im handling the action in the parent container. the click event is triggering
   * [why] this helps me see how many buttons i want for the task. each button has its own needs so hence configs.
   * more control on where i want the buttons to go and how many.
   */
  const renderTaskButtonsHtml = (task: any, index: number) => {
    const configToggleDoneBtn = {
      action: () => toggleDone(index),
      type: "toggle",
      taskStatus: task.completed
    };
    const configDelBtn = {
      action: () => deleteTask(task.id),
      type: "delete"
    };

    return (
      <span>
        <TaskButton config={configDelBtn} />
        <TaskButton config={configToggleDoneBtn} />
      </span>
    );
  };

  /**
   * [why] because im using map() i prefer to have something more flexible when it comes to handling the markup, hence renderTaskButtonsHtml()
   */
  const renderHtml = (): JSX.Element[] => {
    return tasks.map((task: ITask, index: number) => {
      return (
        <article key={task.id} className="tdl-task">
          {renderTaskHtml(task)}
          {renderTaskButtonsHtml(task, index)}
        </article>
      );
    });
  };

  return <section>{renderHtml()}</section>;
};

interface ITask {
  id: number;
  value: string;
  completed: boolean;
}
