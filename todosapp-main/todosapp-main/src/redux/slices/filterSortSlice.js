import { createSlice } from "@reduxjs/toolkit";


export const defaultFilterSortState = {
    status: {
      low: false,
      medium: false,
      high: false,
      progress: true,
      completed: false,
      priority: false,
      all: false,
      sort: "recent",
      priorityOrder: "asc",
      alphabeticalOrder: "asc",
      recentOrder: "desc",
    },
    searchTerms: {
      todo:''
    }
  }

const filterSortSlice = createSlice({
  name: "filterSort",
  initialState: defaultFilterSortState,
  reducers: {
    updateStatus: (state,action) => {
        state.status = action.payload;
    },
    /**
     * 
     * @param {*} state 
     * @param {*} action
     * 
     * updates the  serachTerm used in  serach bar for  todos 
     */
    updateTodoSearchTerm: (state,action) => {
      state.searchTerms.todo = action.payload;
    }
  }
});

/**
 * export const selectTodoById = (state, id) =>
  state?.login?.user?.todos?.find((t) => t.id === id);
 */

export const selectTodoSearchTerm = (state) => state?.filterSort?.searchTerms?.todo;

export default filterSortSlice.reducer;

export const {updateStatus,updateTodoSearchTerm} = filterSortSlice.actions;