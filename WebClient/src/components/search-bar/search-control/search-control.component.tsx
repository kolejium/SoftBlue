import React, { useEffect, useState } from 'react';

import { MenuItem, Stack, TextField, Chip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { nameof } from 'ts-simple-nameof';

import useDebounce from '../../../hooks/use-debounce.hook';
import { updateQueryFilters } from '../../../redux/slicers/search-books.slice';
import IGetBookQuery from '../../../interfaces/queries/books/IGetBooksQuery';
import EOrder from '../../../enums/eorder';

import './search-control.component.scss';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';

function SearchControl () {
	const orderFieldSelect = [
		nameof<IGetBookQuery>(s => s.name),
		nameof<IGetBookQuery>(s => s.author),
		nameof<IGetBookQuery>(s => s.createdAt)
	];
	const orderFieldDefault = nameof<IGetBookQuery>(s => s.createdAt);
	const [expanded, setExpanded] = useState(false);
	const [state, setState] = useState<IGetBookQuery>({ name: '', author: '', q: '', order: EOrder.Asc, orderField: orderFieldDefault });
	const [visibleState, setVisibleState] = useState<Map<string, string>>(new Map<string, string>());
	const debounce = useDebounce(state);
	const dispatch = useAppDispatch();

	useEffect(() => {
		console.log('search control');
		setVisibleState(createVisibleMap);
		dispatch(updateQueryFilters(debounce));
	}, [debounce]);

	const createVisibleMap = () => {
		const map = new Map<string, string>();

		Object.getOwnPropertyNames(state).map(property => {
			const value = state[property as keyof IGetBookQuery] as string;

			if (property === nameof<IGetBookQuery>(s => s.orderField) && (value !== nameof<IGetBookQuery>(s => s.createdAt) || state.order !== EOrder.Asc)) {
				map.set(nameof<IGetBookQuery>(s => s.order), `${EOrder[state.order as unknown as number]} by ${value}`);
			}

			if (property !== nameof<IGetBookQuery>(s => s.orderField) && property !== nameof<IGetBookQuery>(s => s.order) && value !== undefined && value !== '') {
				map.set(property, value);
			}
		});

		return map;
	}

	const onChangeOrder = (event : React.ChangeEvent<HTMLInputElement>) => setState({ ...state, order: event.target.value as unknown as EOrder });

	const onChangeString = (key: string, event : React.ChangeEvent<HTMLInputElement>) => setState({ ...state, [key]: event.target.value });

	const onDeleteChip = (key: string) => {
		if (key === 'order') {
			setState({ ...state, order: EOrder.Asc, orderField: orderFieldDefault });
		} else {
			setState({ ...state, [key]: '' });
		}
	}

	return <Accordion expanded={expanded} onChange={(event, value) => setExpanded(value)}>
		<AccordionSummary expandIcon={<ExpandMoreIcon />}>
			<Stack>
				<TextField id="standard-basic" label="Search" variant="standard" value={state.q} onChange={(e) => onChangeString(nameof<IGetBookQuery>(s => s.q), e as React.ChangeEvent<HTMLInputElement>)}/>
				<Stack direction="row" spacing={1}>
					{Array.from(visibleState).map(([key, value]) => <Chip key={key} label={key + '=' + value} onDelete={() => onDeleteChip(key)}/>)}
				</Stack>
			</Stack>
		</AccordionSummary>
		<AccordionDetails>
			<Stack>
				<TextField label="Name" helperText="Please enter name for filter" value={state?.name} onChange={(e) => onChangeString(nameof<IGetBookQuery>(s => s.name), e as React.ChangeEvent<HTMLInputElement>)}/>
				<TextField label="Author" helperText="Please enter author for filter" value={state?.author} onChange={(e) => onChangeString(nameof<IGetBookQuery>(s => s.author), e as React.ChangeEvent<HTMLInputElement>)}/>
				<Stack direction="row" spacing={1} justifyContent={'space-between'}>
					<TextField select
						label="Order"
						value={state?.order}
						onChange={onChangeOrder}
						helperText="Please select your order type"
					>
						<MenuItem key={EOrder.Asc} value={EOrder.Asc}>
							{EOrder[EOrder.Asc]}
						</MenuItem>
						<MenuItem key={EOrder.Desc} value={EOrder.Desc}>
							{EOrder[EOrder.Desc]}
						</MenuItem>
					</TextField>
					<TextField select
						label="Order field"
						value={state?.orderField}
						onChange={(e) => onChangeString(nameof<IGetBookQuery>(s => s.orderField), e as React.ChangeEvent<HTMLInputElement>)}
						helperText="Please select your order field">
						{orderFieldSelect.map(property =>
							<MenuItem key={property} value={property}>
								{property}
							</MenuItem>
						)}
					</TextField>
				</Stack>
			</Stack>
		</AccordionDetails>
	</Accordion>;
}

export default SearchControl;

/*

*/
