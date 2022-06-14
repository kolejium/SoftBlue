import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import EStatus from '../../enums/estatus';
import Book from '../../types/book';

import { create, get, remove, edit, pdf } from '../thunks/books.thunk';

type state = {
	book: Book | undefined,
	pdf: string | undefined,
	status: EStatus
}

const booksSlice = createSlice({
	name: 'books',
	initialState: { book: undefined, status: EStatus.Default } as state,
	reducers: {
		set (state, action : PayloadAction<Book>) {
			state.book = action.payload;
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
			state.book = undefined;
		});

		builder.addMatcher(isAnyOf(create.fulfilled, edit.fulfilled, get.fulfilled, remove.fulfilled), (state, action) => {
			state.status = EStatus.Resolved;
			state.book = action.payload;
		});

		builder.addMatcher(isAnyOf(create.rejected, edit.rejected, get.rejected, remove.rejected), (state, action) => {
			state.status = EStatus.Rejected;
			state.book = undefined;
		});
	}
});

export const { set } = booksSlice.actions;

export default booksSlice.reducer;
