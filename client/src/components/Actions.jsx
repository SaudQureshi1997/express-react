import React, { useState } from "react";
import {
  Add,
  DeleteOutline,
  ArchiveOutlined,
  CheckOutlined,
  ArrowUpwardOutlined,
} from "@material-ui/icons";
import {
  Grid,
  Fab,
  Paper,
  TextField,
  FormControl,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import { connect } from "react-redux";
import {
  removeTask,
  completeTask,
  archiveTask,
  prioritizeTask,
} from "../controllers/tasks";
import AddTask from "./AddTask";
import PrioritizeTask from "./PrioritizeTask";
import {
  search,
  showArchived,
  addMessage,
} from "../redux/reducers/tasks/actions";

const Actions = (props) => {
  const [dialog, setDialog] = useState(false);
  const toggleDialog = () => setDialog(!dialog);
  const [pDialog, setPDialog] = useState(false);
  const togglePDialog = () => {
    if (props.selectedIds.length === 0) {
      return props.addMessage("Please select tasks before proceeding");
    }
    setPDialog(!pDialog);
  };

  return (
    <React.Fragment>
      <AddTask open={dialog} onClose={toggleDialog} />
      <PrioritizeTask open={pDialog} onClose={togglePDialog} />
      <Grid
        container
        item
        xs={props.xs}
        md={props.md}
        spacing={props.spacing}
        direction="row"
        alignItems="stretch"
        className="h-90"
      >
        <Grid item xs={12}>
          <Paper className="mt-30 p-10">
            <FormControlLabel
              control={
                <Switch
                  onChange={(e) => props.showArchived(e.target.checked)}
                />
              }
              label="Archived"
              labelPlacement="start"
            ></FormControlLabel>
            <div className="mt-20"></div>
            <FormControl className="w-100">
              <TextField
                required
                variant="outlined"
                label="Search Task"
                size="small"
                onInput={(e) => props.searchTask(e.target.value)}
              ></TextField>
            </FormControl>
            <div className="mt-10"></div>
          </Paper>
        </Grid>
        <Grid
          item
          container
          direction="column"
          justify="space-evenly"
          alignItems="flex-start"
        >
          <Grid item>
            <Fab
              color="inherit"
              aria-label="add"
              size="medium"
              title="Add new"
              onClick={toggleDialog}
            >
              <Add color="primary" />
            </Fab>
          </Grid>
          <Grid item>
            <Fab
              color="inherit"
              aria-label="add"
              size="medium"
              title="Prioritize"
              onClick={togglePDialog}
            >
              <ArrowUpwardOutlined color="secondary" />
            </Fab>
          </Grid>
          <Grid item>
            <Fab
              color="secondary"
              aria-label="add"
              size="medium"
              title="Delete"
              onClick={() => props.removeTask(props.selectedIds)}
            >
              <DeleteOutline color="inherit" />
            </Fab>
          </Grid>
          <Grid item>
            <Fab
              color="primary"
              aria-label="add"
              size="medium"
              title="Archive"
              onClick={() => props.archiveTask(props.selectedIds)}
            >
              <ArchiveOutlined color="inherit" />
            </Fab>
          </Grid>
          <Grid item>
            <Fab
              color="default"
              aria-label="add"
              size="medium"
              title="Mark Completed"
              onClick={() => props.completeTask(props.selectedIds)}
            >
              <CheckOutlined color="secondary" />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { tasks: state.taskReducer.tasks, selectedIds: state.taskReducer.selectedIds };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeTask: (ids) => removeTask(dispatch, ids),
    completeTask: (ids) => completeTask(dispatch, ids),
    archiveTask: (ids) => archiveTask(dispatch, ids),
    prioritizeTask: (ids, number) => prioritizeTask(dispatch, ids, number),
    searchTask: (name) => dispatch(search(name)),
    showArchived: (value) => dispatch(showArchived(value)),
    addMessage: (value) => dispatch(addMessage(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
