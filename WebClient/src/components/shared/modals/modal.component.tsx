import useModalSelector from '../../../hooks/use-selector/use-modal-selector.hook';
import CreateBookModal from './create-book.modal.component';
import DeleteBookModal from './delete-book.modal.component';
import EditBookModal from './edit-book.modal.component';
import PdfModal from './pdf.modal.component';

import './modal.component.scss';

const modals : { [name: string]: () => JSX.Element } = {
	createBook: () => <CreateBookModal />,
	deleteBook: () => <DeleteBookModal />,
	editBook: () => <EditBookModal />,
	pdf: () => <PdfModal />
}

function Modal () {
	const modal = useModalSelector();

	if (modal.name === '') {
		return null;
	}

	return modals[modal.name]();
}

export default Modal;
