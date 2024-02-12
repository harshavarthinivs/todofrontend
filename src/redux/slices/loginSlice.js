import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import createTodoApi from "../../api/createTodoApi";
import {
  updateTodoApi,
  updateTodoStatusBulkApi,
} from "../../api/updateTodoApi";

import { enqueue } from "./snackbarSlice";
import { deleteTodoBulkApi } from "../../api/deleteTodoApi";
/**
 *
 * @param {state of the slice} state
 * @param {*} action
 *
 * This is  a reusable function meant to use in  reducers section of
 * the slice as well as  extrareducer section of the slice
 */
const addTodoReducer = (state, action) => {
  if (state.isLoggedIn) {
    if (state?.user?.todos === null) state.user.todos = [];
    state.user.todos.unshift(action?.payload);
  }
};

export const createTodoThunk = createAsyncThunk(
  "login/createTodoThunk",
  async ({ data, token }, { rejectWithValue, getState, dispatch }) => {
    if (
      getState().login?.user?.todos.find((todo) => todo.title === data.title)
    ) {
      dispatch(enqueue({ message: "Todo already exists", variant: "error" }));
      return rejectWithValue("Todo already exists");
    }

    const response = await createTodoApi(data, token);

    if (response.hasOwnProperty("title")) {
      dispatch(enqueue({ message: "Todo Added", variant: "success" }));
      return response;
    }
    dispatch(enqueue({ message: "Todo cannot be created", variant: "error" }));
    return rejectWithValue("error creating todo");
  }
);

/**
 *    Structure of data => 
 *    data : {
      title: "title",
      description: "description",
      priority: "priority",
    };
 */

export const updateTodoThunk = createAsyncThunk(
  "login/updateTodoThunk",
  async ({ id, data, token }, { rejectWithValue, dispatch }) => {
    const response = await updateTodoApi(id, data, token);
    console.log(response);
    if (response.hasOwnProperty("title")) {
      dispatch(enqueue({ message: "Todo Updated", variant: "success" }));
      return response;
    }
    dispatch(enqueue({ message: "Todo cannot be updated", variant: "error" }));
    return rejectWithValue("error updating todo");
  }
);

export const updateTodoStatusBulkThunk = createAsyncThunk(
  "login/updateTodoStatusBulkThunk",
  async ({ data, token }, { rejectWithValue, dispatch }) => {
    const response = await updateTodoStatusBulkApi(data, token);
    console.log(response);
    if (response.length !== 0) {
      dispatch(enqueue({ message: "Todos updated", variant: "success" }));
      return response;
    }
    dispatch(enqueue({ message: "Todos cannot be updated", variant: "error" }));
    return rejectWithValue("error Updating Todos statuses");
  }
);

export const deleteTodoBulkThunk = createAsyncThunk(
  "login/deleteTodoBulkThunk",
  async ({ data, token }) => {
    await deleteTodoBulkApi(data, token);
    return data;
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      if (state.user.todos !== null)
        state.user.todos.sort((a, b) => b.id - a.id);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    addTodo: addTodoReducer,

    updateTodoStatus: (state, action) => {
      state.user.todos.find((t) => t.id === action.payload.id).status =
        action.payload.status;
    },
    deleteTodo: (state, action) => {
      state.user.todos = state.user.todos.filter(
        (t) => t.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodoThunk.fulfilled, addTodoReducer)
      .addCase(updateTodoThunk.fulfilled, (state, action) => {
        if (state.isLoggedIn) {
          const todo = state.user.todos.find((t) => t.id === action.payload.id);
          todo.title = action.payload.title;
          todo.description = action.payload.description;
          todo.priority = action.payload.priority;
        }
      })
      .addCase(updateTodoStatusBulkThunk.fulfilled, (state, action) => {
        const updatedItems = action.payload;

        state.user.todos = state.user.todos
          .map((todo) => {
            const updatedItem = updatedItems.find(
              (item) => item.id === todo.id
            );

            if (updatedItem) return updatedItem;
            return todo;
          })

      }).addCase(deleteTodoBulkThunk.fulfilled, (state, action) => {
        state.user.todos = state.user.todos.filter(
          (todo) => !action.payload.includes(todo.id)
        );
      })
  },
});

export const selectTodoById = (state, id) =>
  state?.login?.user?.todos?.find((t) => t.id === id);

export const { login, logout, addTodo, updateTodoStatus, deleteTodo } =
  loginSlice.actions;

export default loginSlice.reducer;
