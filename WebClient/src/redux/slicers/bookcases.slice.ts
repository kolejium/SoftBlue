import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import EStatus from '../../enums/estatus';
import BookcaseType from '../../types/bookcase';
import { create, get, remove } from '../thunks/bookcase.thunk';

type state = {
    selectBookcase: BookcaseType | undefined,
    status: EStatus,
    bookcases: BookcaseType[]
}

const bookcasesSlice = createSlice({
	name: 'bookcases',
	initialState: { selectBookcase: undefined, status: EStatus.Default } as state,
	reducers: {
		set (state, action: PayloadAction<BookcaseType>) {
			state.selectBookcase = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addMatcher(isAnyOf(create.pending, get.pending, remove.pending), (state, action) => {
			state.status = EStatus.Loading;
			state.selectBookcase = undefined;
		});

		builder.addMatcher(isAnyOf(create.fulfilled, get.fulfilled, remove.fulfilled), (state, action) => {
			state.status = EStatus.Resolved;
			state.selectBookcase = action.payload;
		});

		builder.addMatcher(isAnyOf(create.rejected, get.rejected, remove.rejected), (state, action) => {
			state.status = EStatus.Rejected;
			state.selectBookcase = undefined;
		});
	}
});

export const { set } = bookcasesSlice.actions;

export default bookcasesSlice.reducer;
