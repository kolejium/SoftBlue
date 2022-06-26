import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import useModalSelector from '../../../hooks/use-selector/use-modal-selector.hook';
import { changeVisible } from '../../../redux/slicers/modal.slice';
import useBooksSelector from '../../../hooks/use-selector/use-books-selector.hook';
import BookItem from '../../book/book-item/book-item.component';
import { removeBook } from '../../../redux/thunks/modal.thunk';

const DeleteBookModal = () => {
	const dispatch = useAppDispatch();
	const books = useBooksSelector();
	const modal = useModalSelector();

	const onCloseHandle = () => dispatch(changeVisible(false));
	const onSubmitHandle = () => dispatch(removeBook(books.selectedBook?.id as string));

	return <Dialog open={modal.visible && books.selectedBook !== undefined} onClose={onCloseHandle}>
		<DialogTitle>
			Delete book
		</DialogTitle>
		<DialogContent>
			<DialogContentText>
				Are you sure want to delete book:
			</DialogContentText>
			<BookItem id={books.selectedBook?.id as string} name={books.selectedBook?.name as string} onBookOpen={undefined} onBookEdit={undefined} onBookDelete={undefined} author={books.selectedBook?.author as string} createdAt={books.selectedBook?.createdAt as Date}/>
		</DialogContent>
		<DialogActions>
			<Button onClick={onCloseHandle}>Cancel</Button>
			<Button onClick={onSubmitHandle}>Delete</Button>
		</DialogActions>
	</Dialog>
}

export default DeleteBookModal;
