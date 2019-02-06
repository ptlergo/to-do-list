import * as React from "react";

export default (props: any) => {
  const { onSubmit, state, onChange } = props;
  return (
    <form>
      <input
        type="text"
        placeholder="add a task"
        className="tdl-input"
        value={state.currentTask}
        onChange={onChange}
      />
      <button onClick={onSubmit}>Add Task</button>
    </form>
  );
};
