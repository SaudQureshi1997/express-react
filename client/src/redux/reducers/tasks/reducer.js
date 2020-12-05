import {
  ADD,
  STORE,
  COMPLETE,
  REMOVE,
  ARCHIVE,
  PRIORITY,
  ADD_ERRORS,
  SELECT_IDS,
  SEARCH,
  INCLUDE_ARCHIVED,
  ADD_MESSAGE
} from "./types";

let INITIAL_STATE = {
  message: null,
  loading: true,
  tasks: null,
  selectedIds: [],
  errors: {},
  searchQuery: "",
  showArchived: false,
};

export default function taskReducer(state = INITIAL_STATE, action) {
  if (action.type === STORE) {
    const tasks = action.tasks;
    return {
      ...state,
      tasks,
      loading: false,
    };
  }

  if (action.type === ADD) {
    const _tasks = state.tasks || [];
    let tasks = [..._tasks];
    const task = action.task;
    task.id = task._id;
    tasks.push(task);
    return {
      ...state,
      tasks,
    };
  }

  if (action.type === REMOVE) {
    let tasks = state.tasks;
    tasks = tasks.filter((task) => action.ids.indexOf(task._id) === -1);
    return { ...state, tasks };
  }

  if (action.type === COMPLETE) {
    let tasks = state.tasks;
    tasks = tasks.map((task) => {
      if (action.ids.indexOf(task._id) >= 0) {
        task.completed = true;
      }

      return task;
    });
    return { ...state, tasks };
  }

  if (action.type === ARCHIVE) {
    let tasks = state.tasks;
    tasks = tasks.map((task) => {
      if (action.ids.indexOf(task._id) >= 0) {
        task.archived = true;
      }

      return task;
    });
    return { ...state, tasks };
  }

  if (action.type === PRIORITY) {
    let tasks = state.tasks;
    tasks = tasks.map((task) => {
      if (action.ids.indexOf(task._id) >= 0) {
        task.priority = action.number;
      }
      return task;
    });
    return { ...state, tasks };
  }

  if (action.type === SELECT_IDS) {
    return { ...state, selectedIds: action.ids };
  }

  if (action.type === ADD_ERRORS) {
    return { ...state, errors: action.errors };
  }

  if (action.type === SEARCH) {
    return { ...state, searchQuery: action.name };
  }

  if (action.type === INCLUDE_ARCHIVED) {
    return {...state, showArchived: action.showArchived}
  }

  if (action.type === ADD_MESSAGE) {
    return {...state, message: action.message};
  }

  return state;
}
