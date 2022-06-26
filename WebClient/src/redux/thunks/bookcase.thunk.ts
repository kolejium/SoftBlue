import { createAsyncThunk } from '@reduxjs/toolkit';
import BookcaseType from '../../types/bookcase';
import ICreateBookcaseQuery from '../../interfaces/queries/bookcases/ICreateBookcaseQuery';
import IError from '../../interfaces/responses/IError';
import { set } from '../slicers/notification.slice';
import { createBookcase, deleteBookcase, getBookcase } from '../../services/bookcase.service';

export const create = createAsyncThunk<BookcaseType, ICreateBookcaseQuery, { rejectValue: IError }>(
	'bookcases/create',
	async (query, { rejectWithValue, dispatch }) => {
		const result = await createBookcase(query);

		if (result.error !== null) {
			rejectWithValue(result.error);
		}

		dispatch(set({ text: `Created bookcase ${(result.result as BookcaseType).id}`, visible: true }))

		return result.result as BookcaseType;
	}
)

export const remove = createAsyncThunk<BookcaseType, string, { rejectValue: IError }>(
	'bookcases/delete',
	async (id, { rejectWithValue, dispatch }) => {
		const result = await deleteBookcase(id);

		if (result.error !== null) {
			rejectWithValue(result.error);
		}

		dispatch(set({ text: `Deleted bookcase (${(result.result as BookcaseType).id})`, visible: true }))

		return result.result as BookcaseType;
	}
);

export const get = createAsyncThunk<BookcaseType, string, { rejectValue: IError }>(
	'bookcases/get',
	async (query, { rejectWithValue }) => {
		const result = await getBookcase(query);

		if (result.error !== null) {
			rejectWithValue(result.error);
		}

		return result.result as BookcaseType;
	}
);
