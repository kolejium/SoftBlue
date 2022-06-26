import { DialogTitle, DialogContent, DialogContentText, DialogActions, Stack, Dialog, TextField, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ICreateBookcaseQuery from '../../../../interfaces/queries/bookcases/ICreateBookcaseQuery';
import { useAppDispatch } from '../../../../hooks/use-app-dispatch.hook';
import { changeVisible } from '../../../../redux/slicers/modal.slice';
import useModalSelector from '../../../../hooks/use-selector/use-modal-selector.hook';
import { maxShelfs } from '../../../../consts/bookcase';
import { create } from '../../../../redux/thunks/bookcase.thunk';
import useBookcasesSelector from '../../../../hooks/use-selector/use-bookcases-selector.hook';
import EStatus from '../../../../enums/estatus';

function CreateBookcaseModal () {
	const [state, setState] = useState<ICreateBookcaseQuery>({ books: [], shelfCount: 1, order: 0 });
	const dispatch = useAppDispatch();
	const modal = useModalSelector();
	const bookcases = useBookcasesSelector();
	const onCloseHandle = () => dispatch(changeVisible(false));
	const onSubmitHandle = () => { dispatch(create(state));	}

	useEffect(() => {
		if (bookcases.status === EStatus.Resolved) {
			setState({ books: [], shelfCount: 1, order: 0 });
		}
	}, [bookcases.status]);

	return <Dialog open={modal.visible} onClose={onCloseHandle}>
		<DialogTitle>
            Create bookcase
		</DialogTitle>
		<DialogContent>
			<DialogContentText>
                To create new bookcase
			</DialogContentText>
			<Stack>
				<TextField label='Count shelfs' helperText='Please choose count of shelfs' defaultValue='1' select onChange={e => setState({ ...state, shelfCount: Number(e.target.value) })}>
					{[...Array(maxShelfs)].map((_, x) => <MenuItem key={x} value={x + 1} >{x + 1}</MenuItem>)}
				</TextField>
			</Stack>
		</DialogContent>
		<DialogActions>
			<Button onClick={onCloseHandle}>Cancel</Button>
			<Button onClick={onSubmitHandle}>Create</Button>
		</DialogActions>
	</Dialog>
}

export default CreateBookcaseModal;
