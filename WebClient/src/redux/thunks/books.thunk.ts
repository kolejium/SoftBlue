import { createAsyncThunk } from '@reduxjs/toolkit';
import ICreateBookQuery from '../../interfaces/queries/books/ICreateBookQuery';
import IGetPagedBookQuery from '../../interfaces/queries/books/IGetPagedBooksQuery';
import IError from '../../interfaces/responses/IError';
import IPagedResponse from '../../interfaces/responses/IPagedResponse';
import { createBook, createBookWithFile, deleteBook, getBook, getBooks, getPdf, updateBook } from '../../services/books.service';
import BookType from '../../types/book';
import { set } from '../slicers/notification.slice';
import IUpdateBookQuery from '../../interfaces/queries/books/IUpdateBookQuery';
import IWithFileQuery from '../../interfaces/queries/books/IWithFileQuery';

export const search = createAsyncThunk<IPagedResponse<BookType>, IGetPagedBookQuery, { rejectValue: IError }>(
	'books/search',
	async (query, { rejectWithValue }) => {
		console.log('books/search');
		const result = await getBooks(query);

		if (result.error !== null) {
			rejectWithValue(result.error);
		}

		return result.result as IPagedResponse<BookType>;
	}
);

export const remove = createAsyncThunk<BookType, string, { rejectValue: IError }>(
	'books/delete',
	async (id, { rejectWithValue, dispatch }) => {
		const result = await deleteBook(id);

		if (result.error !== null) {
			rejectWithValue(result.error);
		}

		dispatch(set({ text: `Deleted book ${(result.result as BookType).name}(${(result.result as BookType).id})`, visible: true }))

		return result.result as BookType;
	}
);

export const pdf = createAsyncThunk<string, string, { rejectValue: IError }>(
	'books/pdf',
	async (id, { rejectWithValue }) => {
		const result = await getPdf(id);

		if (result.error !== null) {
			rejectWithValue(result.error);
		}

		return result.result as string;
	}
);


export const create = createAsyncThunk<BookType, ICreateBookQuery, { rejectValue: IError }>(
	'books/create',
	async (query, { rejectWithValue, dispatch }) => {
		const result = await createBook(query);

		if (result.error !== null) {
			rejectWithValue(result.error);
		}

		dispatch(set({ text: `Created book ${(result.result as BookType).name}`, visible: true }))

		return result.result as BookType;
	}
);

export const createWithFile = createAsyncThunk<BookType, IWithFileQuery<ICreateBookQuery>, { rejectValue: IError}>(
	'books/create-with-file',
	async (query, { rejectWithValue, dispatch }) => {
		const result = await createBookWithFile(query);

		if (result.error !== null) {
			rejectWithValue(result.error);
		}

		dispatch(set({ text: `Created book ${(result.result as BookType).name}`, visible: true }))

		return result.result as BookType;
	}
);

export const get = createAsyncThunk<BookType, string, { rejectValue: IError }>(
	'books/get',
	async (query, { rejectWithValue }) => {
		const result = await getBook(query);

		if (result.error !== null) {
			rejectWithValue(result.error);
		}

		return result.result as BookType;
	}
);

export const edit = createAsyncThunk<BookType, IUpdateBookQuery, { rejectValue: IError }>(
	'books/edit',
	async (query, { rejectWithValue }) => {
		const result = await updateBook(query);

		if (result.error !== null) {
			rejectWithValue(result.error);
		}

		return result.result as BookType;
	}
);
