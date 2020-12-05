import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { prioritizeTask } from "../controllers/tasks";
import {
  addErrors
} from "../redux/reducers/tasks/actions";

const PrioritizeTask = (props) => {
  const [priority, setPriority] = useState(null);
  const submit = async () => {
    props.addErrors({});
    await props.prioritizeTask(props.selectedIds, priority);
    setPriority(null);
  };
  const close = async () => {
    setPriority('');
    props.addErrors();
    props.onClose();
  }

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={close}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Set Task Priority</DialogTitle>
        <DialogContent>
          <TextField
            onInput={(e) => {
              setPriority(e.target.value);
            }}
            value={priority}
            variant="outlined"
            autoFocus
            margin="dense"
            id="name"
            label="Task Priority"
            type="number"
            required
            fullWidth
            color="primary"
            error={props.errors.hasOwnProperty('number')}
            helperText={props.errors.hasOwnProperty('number') ? props.errors.number[0]: null}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="secondary">
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
  return {selectedIds: state.taskReducer.selectedIds, errors: state.taskReducer.errors};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addErrors: (errors) => addErrors(errors),
    prioritizeTask: (ids, number) => prioritizeTask(dispatch, ids, number)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrioritizeTask);
