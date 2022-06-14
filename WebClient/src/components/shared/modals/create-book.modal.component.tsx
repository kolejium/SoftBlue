import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import useModalSelector from '../../../hooks/use-selector/use-modal-selector.hook';
import ICreateBookQuery from '../../../interfaces/queries/books/ICreateBookQuery';
import { changeVisible } from '../../../redux/slicers/modal.slice';
import { create, createWithFile } from '../../../redux/thunks/books.thunk';
import Upload from '../upload/upload.component';
import useBooksSelector from '../../../hooks/use-selector/use-books-selector.hook';
import EStatus from '../../../enums/estatus';

function CreateBookModal () {
	const [state, setState] = useState<ICreateBookQuery>({ name: '', author: '' });
	const [file, setFile] = useState<File | undefined>(undefined);
	const [validat, setValid] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const modal = useModalSelector();
	const books = useBooksSelector();

	const onCloseHandle = () => dispatch(changeVisible(false));
	const onSubmitHandle = () => {
		if (file === undefined) {
			dispatch(create(state));
		} else {
			dispatch(createWithFile({ value: state, source: file }));
		}
	}
	const onLoadHandle = (file: File) => {
		if (state.name.trim() === '') {
			setState({ ...state, name: file.name });
		}

		setFile(file);
	}

	useEffect(() => {
		setValid(state.name.trim() !== '');
	}, [state]);

	useEffect(() => {
		if (books.status === EStatus.Resolved) {
			setState({ name: '', author: '' });
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
			<Stack>
				<TextField error={validat === false} label="Name" helperText="Please enter name for book" value={state?.name} onChange={(e) => setState({ ...state, name: e.target.value })}/>
				<TextField label="Author" helperText="Please enter author for book" value={state?.author} onChange={(e) => setState({ ...state, author: e.target.value })}/>
				<Upload onLoad={onLoadHandle}/>
			</Stack>
		</DialogContent>
		<DialogActions>
			<Button onClick={onCloseHandle}>Cancel</Button>
			<Button disabled={validat === false} onClick={onSubmitHandle}>Create</Button>
		</DialogActions>
	</Dialog>
}

export default CreateBookModal;
