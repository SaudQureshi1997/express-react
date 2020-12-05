import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import {addTask} from '../controllers/tasks';
import {
  addErrors,
} from "../redux/reducers/tasks/actions";

const AddTask = (props) => {
  const [name, setName] = useState('');
  const submit = async () => {
    props.addErrors({});
    await props.addTask(name);
    setName('');
  };
  const close = async () => {
    setName('');
    props.addErrors();
    props.onClose();
  }

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
        <DialogContent>
          <TextField
            onInput={(e) => {
              setName(e.target.value);
            }}
            value={name}
            variant="outlined"
            autoFocus
            margin="dense"
            id="name"
            label="Task Name"
            type="text"
            required
            fullWidth
            color="primary"
            error={props.errors.hasOwnProperty('name')}
            helperText={props.errors.hasOwnProperty('name') ? props.errors.name[0]: null}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="secondary">
            Cancel
          </Button>
          <Button onClick={submit} color="default">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {errors: state.taskReducer.errors};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (name) => addTask(dispatch, name),
    addErrors: () => dispatch(addErrors({})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
