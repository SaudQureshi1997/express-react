import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Tasks from "./views/Tasks";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Snackbar } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { addMessage } from "./redux/reducers/tasks/actions";
import { connect } from "react-redux";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
      <Snackbar open={!!props.message} autoHideDuration={3000} onClose={props.addMessage} message={props.message}>
      </Snackbar>
    </ThemeProvider>
  );
}



const mapStateToProps = (state) => {
  return { message: state.taskReducer.message };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: () => dispatch(addMessage(null))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
