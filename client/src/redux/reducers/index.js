import { combineReducers } from "redux";

import taskReducer from "./tasks/reducer";

const rootReducer = combineReducers({
  taskReducer,
});

export default rootReducer;
