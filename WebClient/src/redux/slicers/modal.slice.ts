import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const modalSlice = createSlice({
	name: 'modal',
	initialState: { name: '', visible: false },
	reducers: {
		changeVisible (state, action: PayloadAction<boolean>) {
			state.visible = action.payload;
		},
		createBook (state) {
			state.name = 'createBook';
			state.visible = true;
		},
		deleteBook (state) {
			state.name = 'deleteBook';
			state.visible = true;
		},
		editBook (state) {
			state.name = 'editBook';
			state.visible = true;
		},
		pdf (state) {
			state.name = 'pdf';
			state.visible = true;
		}
	}
});

export const { changeVisible, createBook, editBook, deleteBook, pdf } = modalSlice.actions;

export default modalSlice.reducer;
