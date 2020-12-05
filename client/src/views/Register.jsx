import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  FormControl,
  Button,
  TextField,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addErrors, addMessage } from "../redux/reducers/tasks/actions";

const Register = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (window.Cookie.get("token")) {
      history.push("/tasks");
    }
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const clearError = (field) => {
    const errors = Object.assign({}, props.errors);
    delete errors[field];
    props.addErrors(errors);
  };

  const submit = async () => {
    setLoading(true);
    try {
      const response = await window.axios.post("/register", { email, password, name });
      const token = response.data.token;
      window.Cookie.set("token", token, { expires: 1 / 8 });
      window.axios.defaults.headers["Authorization"] = `Bearer ${token}`;
      history.replace("/tasks");
    } catch (error) {
      let message = "Whoops something went wrong.";
      if (error.hasOwnProperty("response")) {
        message = error.response.data.message;
        if (error.response.status === 422) {
          props.addErrors(error.response.data.errors);
        }
      }
      props.addMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Grid
        container
        spacing={3}
        justify="center"
        alignItems="center"
        className="h-100"
      >
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <span className="big-text">Register</span>
              <div className="divider"></div>
              <Grid container spacing={10}>
                <Grid item xs={12}>
                  <div className="mt-10"></div>
                  <FormControl className="w-100">
                    <TextField
                      error={props.errors.hasOwnProperty("name")}
                      helperText={
                        props.errors.hasOwnProperty("name")
                          ? props.errors.name[0]
                          : ""
                      }
                      id="name"
                      value={name}
                      onInput={(e) => {
                        clearError("name");
                        setName(e.target.value);
                      }}
                      label="Name"
                      variant="outlined"
                      size="small"
                    />
                  </FormControl>
                  <div className="mt-20"></div>
                  <FormControl className="w-100">
                    <TextField
                      error={props.errors.hasOwnProperty("email")}
                      helperText={
                        props.errors.hasOwnProperty("email")
                          ? props.errors.email[0]
                          : ""
                      }
                      id="email"
                      value={email}
                      onInput={(e) => {
                        clearError("email");
                        setEmail(e.target.value);
                      }}
                      label="Email Address"
                      variant="outlined"
                      size="small"
                    />
                  </FormControl>
                  <div className="mt-20"></div>
                  <FormControl className="w-100">
                    <TextField
                      error={props.errors.hasOwnProperty("password")}
                      helperText={
                        props.errors.hasOwnProperty("password")
                          ? props.errors.password[0]
                          : ""
                      }
                      id="password"
                      value={password}
                      onInput={(e) => {
                        clearError("password");
                        setPassword(e.target.value);
                      }}
                      label="Password"
                      variant="outlined"
                      type="password"
                      size="small"
                    />
                  </FormControl>
                  <FormControl className="w-100">
                    <Grid
                      container
                      justify="space-between"
                      alignItems="center"
                      className="mt-10"
                    >
                      <Button color="default" onClick={() => history.push('/')}>or Sign In</Button>
                      <Button
                        disabled={loading}
                        onClick={submit}
                        variant="outlined"
                      >
                        Register
                      </Button>
                    </Grid>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { errors: state.taskReducer.errors };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addErrors: (errors) => dispatch(addErrors(errors)),
    addMessage: (message) => dispatch(addMessage(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
