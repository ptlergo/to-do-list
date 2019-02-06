import * as React from "react";

export default (props: any) => {
  const { tasks, toggleDone, deleteTask } = props;

  const renderTaskHtml = (task: any) => {
    return (
      <span className={task.completed ? "is-completed" : ""}>{task.value}</span>
    );
  };

  // this should be in parent container as it alter state
  /**
   * @todo how to handle state changes in child component: react hooks will work well 
   */
  const renderTaskButtonsHtml = (task: any, index: number) => {
    return (
      <span>
        <button onClick={() => props.deleteTask(task.id)}>Delete</button>
        <button onClick={() => props.toggleDone(index)}>
          {task.completed ? "undo" : "done"}
        </button>
      </span>
    );
  };

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
