import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import useModalSelector from '../../../hooks/use-selector/use-modal-selector.hook';
import { changeVisible } from '../../../redux/slicers/modal.slice';
import { create, createWithFile } from '../../../redux/thunks/books.thunk';
import useBooksSelector from '../../../hooks/use-selector/use-books-selector.hook';
import EStatus from '../../../enums/estatus';
import CreateBook, { CreateBookState } from '../book/create-book.component';

function CreateBookModal () {
	const [state, setState] = useState<CreateBookState>({ data: { value: { name: '', author: '' }, source: undefined }, valid: false });
	const dispatch = useAppDispatch();
	const modal = useModalSelector();
	const books = useBooksSelector();
	const onCloseHandle = () => dispatch(changeVisible(false));
	const onSubmitHandle = () => state.data.source === undefined ? dispatch(create(state.data.value)) : dispatch(createWithFile(state.data));

	useEffect(() => {
		if (books.status === EStatus.Resolved) {
			setState({ data: { value: { name: '', author: '' }, source: undefined }, valid: false });
		}
	}, [books.status]);

	return <Dialog open={modal.visible} onClose={onCloseHandle}>
		<DialogTitle>
			Create book
		</DialogTitle>
		<DialogContent>
			<DialogContentText>
				To create new book, please enter name of book and author.
			</DialogContentText>
			<CreateBook state={state} setState={setState}/>
		</DialogContent>
		<DialogActions>
			<Button onClick={onCloseHandle}>Cancel</Button>
			<Button disabled={state.valid === false} onClick={onSubmitHandle}>Create</Button>
		</DialogActions>
	</Dialog>
}

export default CreateBookModal;
