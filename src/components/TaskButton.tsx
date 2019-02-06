import * as React from "react";

export default (props: any) => {
  const { action, type, taskStatus } = props.config;

  const renderToggleButton = (): any => (
    <button onClick={action}>{taskStatus ? "undo" : "done"}</button>
  );
  const renderDefaultButton = (): any => (
    <button onClick={action}>Delete</button>
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
