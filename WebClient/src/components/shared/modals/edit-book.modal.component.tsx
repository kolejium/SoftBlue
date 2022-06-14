import { Upload } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import Book from '../../../types/book';
import IUpdateBookQuery from '../../../interfaces/queries/books/IUpdateBookQuery';
import EStatus from '../../../enums/estatus';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import useBooksSelector from '../../../hooks/use-selector/use-books-selector.hook';
import useModalSelector from '../../../hooks/use-selector/use-modal-selector.hook';
import { changeVisible } from '../../../redux/slicers/modal.slice';
import { editBook } from '../../../redux/thunks/modal.thunk';

function EditBookModal () {
	const [state, setState] = useState<Book | undefined>(undefined);
	const [validat, setValid] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const modal = useModalSelector();
	const books = useBooksSelector();

	const onCloseHandle = () => dispatch(changeVisible(false));
	const onSubmitHandle = () => dispatch(editBook(state as Book));
	const onLoadHandle = (file: File) => {
		if (state !== undefined && state.name.trim() === '') {
			setState({ ...state, name: file.name });
		}
	}

	useEffect(() => {
		if (books.book !== undefined) {
			setState(books.book as Book);
		}
	}, [books]);

	useEffect(() => {
		setValid(state !== undefined && state.name.trim() !== '');
	}, [state]);

	if (state === undefined) {
		return null;
	}

	return <Dialog open={modal.visible} onClose={onCloseHandle}>
		<DialogTitle>
			Edit book
		</DialogTitle>
		<DialogContent>
			<DialogContentText>
				Edit data
			</DialogContentText>
			<Stack>
				<TextField error={validat === false} label="Name" helperText="Please enter name for book" value={state?.name} onChange={(e) => setState({ ...state, name: e.target.value })}/>
				<TextField label="Author" helperText="Please enter author for book" value={state?.author} onChange={(e) => setState({ ...state, author: e.target.value })}/>
			</Stack>
		</DialogContent>
		<DialogActions>
			<Button onClick={onCloseHandle}>Cancel</Button>
			<Button disabled={validat === false} onClick={onSubmitHandle}>Create</Button>
		</DialogActions>
	</Dialog>
}

export default EditBookModal;
