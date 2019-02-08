import * as React from "react";
import { IFormProps } from "../App";

export default (props: IFormProps) => {
  const { handleSubmit, currentTask, handleChange } = props;
  return (
    <form>
      <input
        type="text"
        placeholder="add a task"
        className="tdl-input"
        value={currentTask}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Add Task</button>
    </form>
  );
};
