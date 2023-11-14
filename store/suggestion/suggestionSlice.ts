import { createSlice } from '@reduxjs/toolkit';
interface SuggestionSliceProps {
  loading: any;
  user: any;
}

const initialState = {
  loading: false,
  user: [],
} as SuggestionSliceProps;

const suggestionSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    getSuggestionRedux: (state, action) => {
      state.user = action.payload.users;
    },
  },
});
export const { getSuggestionRedux } = suggestionSlice.actions;
export default suggestionSlice.reducer;
