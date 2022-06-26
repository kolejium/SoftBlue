import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import BookType from '../../types/book';
import EStatus from '../../enums/estatus';
import IPagedResponse from '../../interfaces/responses/IPagedResponse';
import { search } from '../thunks/books.thunk';
import IGetPagedBookQuery from '../../interfaces/queries/books/IGetPagedBooksQuery';
import IGetBookQuery from '../../interfaces/queries/books/IGetBooksQuery';
import IPaged from '../../interfaces/IPaged';
import EDirection from '../../enums/edirection';

type state = {
    query: IGetPagedBookQuery;
    result: IPagedResponse<BookType> | null;
    status: EStatus;
}

const initState : state = {
	query: { page: 1, size: 10, direction: EDirection.Begin },
	result: null,
	status: EStatus.Default
};

const searchBooksSlice = createSlice({
	name: 'search-books',
	initialState: initState,
	reducers: {
		updateQuery (state, action : PayloadAction<IGetPagedBookQuery>) {
			state.query = action.payload;
		},
		updateQueryFilters (state, action : PayloadAction<IGetBookQuery>) {
			console.log('update query filters');
			state.query = { ...action.payload, page: state.query?.page, size: state.query?.size } as IGetPagedBookQuery;
		},
		updateQueryPagination (state, action : PayloadAction<IPaged>) {
			state.query = { ...state.query, page: action.payload.page, size: action.payload.size } as IGetPagedBookQuery;
		},
		setBooks (state, action : PayloadAction<IPagedResponse<BookType> | null>) {
			state.result = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(search.pending, (state) => {
			return { ...state, status: EStatus.Loading, result: null };
		});
		builder.addCase(search.fulfilled, (state, action) => {
			return { ...state, status: EStatus.Resolved, result: action.payload };
		});
		builder.addCase(search.rejected, (state) => {
			return { ...state, status: EStatus.Rejected, result: null };
		});
	}
});

export const { setBooks, updateQuery, updateQueryFilters, updateQueryPagination } = searchBooksSlice.actions;

export default searchBooksSlice.reducer;
