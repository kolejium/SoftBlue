import { createSlice } from '@reduxjs/toolkit';

const searchBarSlice = createSlice({
	name: 'search-bar',
	initialState: false,
	reducers: {
		show: (state) => state = true,
		hide: (state) => state = false
	}
});

export const { show, hide } = searchBarSlice.actions;

export default searchBarSlice.reducer;
