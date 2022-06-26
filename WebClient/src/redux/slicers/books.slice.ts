import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import EStatus from '../../enums/estatus';
import BookType from '../../types/book';

import { create, get, remove, edit, pdf } from '../thunks/books.thunk';

type state = {
	selectedBook: BookType | undefined,
	pdf: string | undefined,
	status: EStatus
}

const booksSlice = createSlice({
	name: 'books',
	initialState: { selectedBook: undefined, status: EStatus.Default } as state,
	reducers: {
		set (state, action : PayloadAction<BookType>) {
			state.selectedBook = action.payload;
		},
		setPdf (state, action: PayloadAction<string>) {
			state.pdf = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(pdf.pending, (state) => {
			state.status = EStatus.Loading;
			state.pdf = undefined;
		});

		builder.addCase(pdf.fulfilled, (state, action) => {
			state.status = EStatus.Resolved;
			state.pdf = action.payload;
		});

		builder.addCase(pdf.rejected, (state) => {
			state.status = EStatus.Rejected;
			state.pdf = undefined;
		});

		builder.addMatcher(isAnyOf(create.pending, edit.pending, get.pending, remove.pending), (state, action) => {
			state.status = EStatus.Loading;
			state.selectedBook = undefined;
		});

		builder.addMatcher(isAnyOf(create.fulfilled, edit.fulfilled, get.fulfilled, remove.fulfilled), (state, action) => {
			state.status = EStatus.Resolved;
			state.selectedBook = action.payload;
		});

		builder.addMatcher(isAnyOf(create.rejected, edit.rejected, get.rejected, remove.rejected), (state, action) => {
			state.status = EStatus.Rejected;
			state.selectedBook = undefined;
		});
	}
});

export const { set } = booksSlice.actions;

export default booksSlice.reducer;
