import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ViewMode from '../../types/viewMode';


const viewModeSlice = createSlice({
	name: 'view-mode',
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

export const { simple, smart, changeView, reversView } = viewModeSlice.actions;

export default viewModeSlice.reducer;
