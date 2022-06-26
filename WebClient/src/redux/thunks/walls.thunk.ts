import { createAsyncThunk, current } from '@reduxjs/toolkit';
import IError from '../../interfaces/responses/IError';
import ISize from '../../interfaces/ui/ISize';
import WallType from '../../types/wall';
import ReducerState from '../types/states/reducerState';
import bookcasesSlice from '../slicers/bookcases.slice';
import { getBookcase, getBookcases } from '../../services/bookcase.service';
import EDirection from '../../enums/edirection';
import BookcaseType from '../../types/bookcase';
import { set, setWalls } from '../slicers/walls.slice';
import EnumerableState from '../../types/enumerable-state';
import IPagedResponse from '../../interfaces/responses/IPagedResponse';
import IResponse from '../../interfaces/responses/IResponse';
import { BehaviorSubject, Subject } from 'rxjs';
import WallActionType from '../../types/wall-action';
import ERowDirection from '../../enums/erowDirection';

function MaxOrder (array: BookcaseType[]) : number {
	let order = -1;

	for (let i = 1; i < array.length; i++) {
		if (array[i].order > array[i - 1].order) {
			order = array[i].order;
		}
	}

	return order;
}

function MinOrder (array: BookcaseType[]) : number {
	let order = -1;

	for (let i = 1; i < array.length; i++) {
		if (array[i].order < array[i - 1].order) {
			order = array[i].order;
		}
	}

	return order;
}

export const wallAction : BehaviorSubject<WallActionType> = new BehaviorSubject<WallActionType>(undefined);

export const nextWall = createAsyncThunk<void>(
	'wall/next',
	async () => {
		wallAction.next(ERowDirection.Next);
	}
);

export const prevWall = createAsyncThunk<void>(
	'wall/prev',
	async () => {
		wallAction.next(ERowDirection.Prev);
	}
);

export const getNextWall = createAsyncThunk<void, undefined, { state: ReducerState, rejectValue: IError }>(
	'wall/get-next',
	async (_, { dispatch, getState, rejectWithValue }) => {
		const wallState = getState().walls;

		if (wallState.state?.next !== null && wallState.state?.next !== undefined && wallState.state?.next?.bookcases !== undefined) {
			const result = await getBookcases({ page: 1, size: wallState.countBookcase, startOrder: MaxOrder(wallState.state.next.bookcases) + 1, direction: EDirection.Begin });

			if (result.error !== null) {
				rejectWithValue(result.error);
			}

			const state = {
				prev: wallState.state.current,
				current: wallState.state.next,
				next: result.result?.items === null || result.result?.items.length === 0 ? null : { bookcases: result.result?.items } as WallType
			}

			dispatch(setWalls(state));
		}
	}
);

export const getPrevWall = createAsyncThunk<void, undefined, { state: ReducerState, rejectValue: IError }>(
	'wall/get-prev',
	async (_, { dispatch, getState, rejectWithValue }) => {
		const wallState = getState().walls;

		if (wallState.state?.prev !== null && wallState.state?.prev !== undefined && wallState.state?.prev?.bookcases !== undefined) {
			const order = MinOrder(wallState.state.prev.bookcases) - 1;

			const state : EnumerableState<WallType> = {
				prev: null,
				current: wallState.state.prev,
				next: wallState.state.next
			}

			if (order > 0) {
				const result = await getBookcases({ page: 1, size: wallState.countBookcase, endOrder: order, direction: EDirection.End });

				if (result.error !== null) {
					rejectWithValue(result.error);
				}

				state.prev = result.result?.items === null || result.result?.items.length === 0 ? null : { bookcases: result.result?.items } as WallType
			}

			dispatch(setWalls(state));
		}
	}
)

export const restructWalls = createAsyncThunk<void, number, { state: ReducerState, rejectValue: IError }>(
	'wall/resturct',
	async (maxCount, { dispatch, getState, rejectWithValue }) => {
		const state = getState().walls;

		if (maxCount === state.countBookcase) {
			return;
		}

		const currentOrder = state.state?.current ? MinOrder(state.state?.current?.bookcases) : 0;
		const promises : Promise<IResponse<IPagedResponse<BookcaseType>>>[] = [];

		if (currentOrder <= maxCount) {
			promises.push(getBookcases({ page: 1, size: maxCount, startOrder: currentOrder, direction: EDirection.Begin }));
			promises.push(getBookcases({ page: 2, size: maxCount, startOrder: currentOrder, direction: EDirection.Begin }));
			// not process prev;
		} else {
			promises.push(getBookcases({ page: 1, size: maxCount, endOrder: currentOrder - 1, direction: EDirection.End }));
			promises.push(getBookcases({ page: 1, size: maxCount, startOrder: currentOrder, direction: EDirection.Begin }));
			promises.push(getBookcases({ page: 2, size: maxCount, startOrder: currentOrder, direction: EDirection.Begin }));
		}

		const results = await Promise.all(promises);
		const error = results.find(x => x.error !== null);

		if (error) {
			rejectWithValue(error.error as IError);
		}

		const newState : EnumerableState<WallType> = { prev: null, current: null, next: null };

		if (results.length === 3) {
			newState.prev = { bookcases: results[0].result?.items } as WallType;
			newState.current = { bookcases: results[1].result?.items } as WallType;
			newState.next = { bookcases: results[2].result?.items } as WallType;
		} else {
			newState.current = { bookcases: results[0].result?.items } as WallType;
			newState.next = { bookcases: results[1].result?.items } as WallType;
		}

		dispatch(set({ state: newState, countBookcase: maxCount }));
	}
);
