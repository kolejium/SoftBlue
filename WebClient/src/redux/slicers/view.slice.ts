import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ISize from '../../interfaces/ui/ISize';

type state = {
    size: ISize | undefined
}

const viewSlice = createSlice({
	name: 'view',
	initialState: { size: undefined } as state,
	reducers: {
		setSizeView (state, action: PayloadAction<ISize>) {
			state.size = action.payload;
		}
	}
});

export const { setSizeView } = viewSlice.actions;

export default viewSlice.reducer;
