import {
  STORE,
  ADD,
  REMOVE,
  ARCHIVE,
  COMPLETE,
  PRIORITY,
  SELECT_IDS,
  SEARCH,
  INCLUDE_ARCHIVED,
  ADD_ERRORS,
  ADD_MESSAGE,
} from "./types";

export const storeTasks = (tasks) => ({
  type: STORE,
  tasks,
});

export const addTask = (task) => ({
  type: ADD,
  task,
});

export const removeTask = (ids) => ({
  type: REMOVE,
  ids,
});

export const archiveTask = (ids) => ({
  type: ARCHIVE,
  ids,
});

export const completeTask = (ids) => ({
  type: COMPLETE,
  ids,
});

export const prioritizeTask = (ids, number) => ({
  type: PRIORITY,
  number,
  ids,
});

export const selectIds = (ids) => ({
  type: SELECT_IDS,
  ids,
});

export const search = (name) => ({
  type: SEARCH,
  name,
});

export const showArchived = (showArchived) => ({
  type: INCLUDE_ARCHIVED,
  showArchived,
});

export const addErrors = (errors) => ({
  type: ADD_ERRORS,
  errors,
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message,
});
