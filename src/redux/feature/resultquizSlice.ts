  import { createSlice } from "@reduxjs/toolkit";

  const initialState = null;
  const resultquizSlice = createSlice({
    name: "resultquiz",
    initialState,
    reducers: {
      saveResultQuizId: (state, action) =>  action.payload // lưu resultQuizId
    
    },
  });
  export const { saveResultQuizId } = resultquizSlice.actions;
  export default resultquizSlice.reducer;
