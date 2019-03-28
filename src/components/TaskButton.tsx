import * as React from "react";
import { ITaskButtonProps } from "./DisplayTask";

export default (props: ITaskButtonProps) => {
  const { action, type, taskStatus } = props;

  const renderToggleButton = (): any => (
    <button className="btn btn-primary" onClick={action}>{taskStatus ? "undo" : "done"}</button>
  );
  const renderDefaultButton = (): any => (
    <button className="btn btn-outline-danger" onClick={action}>Delete</button>
  );


  /**
   * [why] determine which button type for specific markup
   */
  const renderSwitch = () => {
    switch (type) {
      case "toggle":
        return renderToggleButton();
      default:
        return renderDefaultButton();
    }
  };

  return renderSwitch();
};
