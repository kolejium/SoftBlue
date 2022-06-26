import { createAsyncThunk } from '@reduxjs/toolkit';

import ISize from '../../interfaces/ui/ISize';
import { setSizeView } from '../slicers/view.slice';
import ReducerState from '../types/states/reducerState';
import { restructWalls } from './walls.thunk';

export const setSize = createAsyncThunk<void, ISize, { state: ReducerState }>(
	'view/set-size',
	async (size, { dispatch, getState }) => {
		const state = getState().view;

		if (size === state.size) {
			return;
		}

		dispatch(setSizeView(size));
		dispatch(restructWalls(4));
	}
);
