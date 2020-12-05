import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import moment from "moment";
import Actions from "../components/Actions";
import { fetchTasks } from "../controllers/tasks";
import { selectIds } from "../redux/reducers/tasks/actions";
import { useHistory } from 'react-router-dom';

const Tasks = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (!window.Cookie.get("token")) {
      return history.push("/");
    }
    if (props.tasks === null) {
      props.fetchTasks();
    }
  });
  const columns = [
    { field: "name", headerName: "Name", width: 270 },
    { field: "priority", headerName: "Priority" },
    { field: "completed", headerName: "Completed", width: 120 },
    {
      field: "created_at",
      headerName: "Created At",
      width: 160,
      valueGetter: (params) => `${moment(params).format("hh:mm DD-MMM-YY")}`,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 160,
      valueGetter: (params) => `${moment(params).format("hh:mm DD-MMM-YY")}`,
    },
  ];
  let rows = props.tasks || [];
  rows = props.searchQuery
    ? rows.filter((task) =>
        task.name.toLowerCase().includes(props.searchQuery.toLowerCase())
      )
    : rows;

  rows = rows.filter((task) => task.archived === props.showArchived);

  return (
    <React.Fragment>
      <Grid container justify="center" direction="row" spacing={2}>
        <Grid xs={12} md={8} item>
          <div className="h-90 p-10">
            <DataGrid
              onSelectionChange={(e) => props.selectIds(e.rowIds)}
              rows={rows}
              columns={columns}
              loading={props.loading}
              pageSize={10}
              checkboxSelection
            />
          </div>
        </Grid>
        <Actions xs={12} md={3} spacing={2} />
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    tasks: state.taskReducer.tasks,
    searchQuery: state.taskReducer.searchQuery,
    showArchived: state.taskReducer.showArchived,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTasks: () => fetchTasks(dispatch),
    selectIds: (ids) => dispatch(selectIds(ids)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
