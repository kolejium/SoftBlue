import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Button } from 'react-bootstrap';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import useBooksSelector from '../../../hooks/use-selector/use-books-selector.hook';
import useModalSelector from '../../../hooks/use-selector/use-modal-selector.hook';
import { changeVisible } from '../../../redux/slicers/modal.slice';
import PdfViewer from '../pdf-viewer/pdf-viewer.component';
import { Buffer } from 'buffer';

import './pdf.modal.component.scss';

const PdfModal = () => {
	const dispatch = useAppDispatch();
	const modal = useModalSelector();
	const books = useBooksSelector();
	const onCloseHandle = () => dispatch(changeVisible(false));

	return <Dialog open={modal.visible && books.pdf !== undefined} className='pdf-modal'>
		<DialogTitle>Pdf Viewer</DialogTitle>
		<DialogContent>
			<PdfViewer data={'data:application/pdf;base64,' + (books.pdf as string)}/>
		</DialogContent>
		<DialogActions>
			<Button onClick={onCloseHandle}>Close</Button>
		</DialogActions>
	</Dialog>
}

export default PdfModal;
