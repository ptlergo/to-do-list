import * as React from "react";
import { IFormProps } from "../App";
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";

export default (props: IFormProps) => {
  const { handleSubmit, currentTask, handleChange } = props;
  return (
    <Form className="form">
      <InputGroup>
        <Input
          type="text"
          placeholder="add a task"
          className="tdl-input"
          value={currentTask}
          onChange={handleChange}
        />
       
        <Button color="primary" className="btn" onClick={handleSubmit}>
          Add Task
        </Button>
      </InputGroup>
    </Form>
  );
};
