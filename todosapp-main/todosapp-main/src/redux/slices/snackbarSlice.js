import { createSlice } from "@reduxjs/toolkit";


const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        open: false,
        message: '',
        variant: 'success'
    },
    reducers : {
        enqueue: (state , action) => {
            state.open = true
            state.message = action.payload.message
            state.variant = action.payload.variant
        },
        dequeue: (state) => {
            state.open = false
            state.message = ''
        }
    }
})


export default snackbarSlice.reducer;

export const {enqueue, dequeue} = snackbarSlice.actions;