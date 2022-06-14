import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type state = {
    visible: boolean,
    text: string | undefined
}

const notificationSlice = createSlice({
	name: 'notification',
	initialState: { visible: false, text: '' } as state,
	reducers: {
		set (state, action: PayloadAction<state>) {
			return { visible: action.payload.visible, text: action.payload.text };
		},
		show (state) {
			state.visible = true;
		},
		hide (state) {
			state.visible = false;
		}
	}
});

export const { show, hide, set } = notificationSlice.actions;

export default notificationSlice.reducer;
