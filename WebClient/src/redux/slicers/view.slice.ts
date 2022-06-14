import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ViewMode from '../../types/viewMode';


const viewSlice = createSlice({
	name: 'view',
	initialState: 'simple' as ViewMode,
	reducers: {
		changeView (state, action: PayloadAction<ViewMode>) {
			state = action.payload;
		},
		reversView (state) {
			return state === 'smart' ? 'simple' : 'smart';
		},
		simple (state) {
			state = 'simple';
		},
		smart (state) {
			state = 'smart';
		}
	}
});

export const { simple, smart, changeView, reversView } = viewSlice.actions;

export default viewSlice.reducer;
