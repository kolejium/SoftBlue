import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventHandler, SyntheticEvent } from 'react';
import EnumerableState from '../../types/enumerable-state';
import WallType from '../../types/wall';
import WallActionType from '../../types/wall-action';
import ERowDirection from '../../enums/erowDirection';
import { BehaviorSubject, Subject } from 'rxjs';


type state = {
    countBookcase: number,
    state: EnumerableState<WallType> | undefined,
}

const wallsSlice = createSlice({
	name: 'walls',
	initialState: { state: undefined, countBookcase: 0 } as state,
	reducers: {
		setWalls (state, action: PayloadAction<EnumerableState<WallType>>) {
			state.state = action.payload;
		},
		set (state, action: PayloadAction<state>) {
			return action.payload;
		}
	}
});

export const { setWalls, set } = wallsSlice.actions;

export default wallsSlice.reducer;
