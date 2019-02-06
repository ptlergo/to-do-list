import * as React from "react";

export default (props: any) => {
    const {tasks} = props;
    const tot = tasks != 0;
  return <h1>
      {tasks}
  </h1>;
};
