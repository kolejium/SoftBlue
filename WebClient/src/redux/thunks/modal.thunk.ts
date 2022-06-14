import { createAsyncThunk } from '@reduxjs/toolkit';
import IError from '../../interfaces/responses/IError';
import Book from '../../types/book';
import * as ModalActions from '../slicers/modal.slice';
import { get, edit, pdf, remove } from './books.thunk';

export const prepareForRemoveBook = createAsyncThunk<void, string, { rejectValue: IError }>(
	'modal/prepare-for-remove-book',
	async (id, { dispatch }) => {
		dispatch(get(id));
		dispatch(ModalActions.deleteBook());
	}
);

export const prepareForEditBook = createAsyncThunk<void, string, { rejectValue: IError }>(
	'modal/prepare-for-edit-book',
	async (id, { dispatch }) => {
		dispatch(get(id));
		dispatch(ModalActions.editBook());
	}
);

export const pdfBook = createAsyncThunk<void, string, { rejectValue: IError }>(
	'modal/pdfBook',
	async (id, { dispatch }) => {
		dispatch(pdf(id));
		dispatch(ModalActions.pdf());
	}
);

export const removeBook = createAsyncThunk<void, string, { rejectValue: IError }>(
	'modal/deleteBook',
	async (id, { dispatch }) => {
		dispatch(remove(id));
		dispatch(ModalActions.changeVisible(false));
	}
);

export const editBook = createAsyncThunk<void, Book, { rejectValue: IError }>(
	'modal/editBook',
	async (book, { dispatch }) => {
		dispatch(edit(book));
		dispatch(ModalActions.changeVisible(false));
	}
);
