import { IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import IBookActions from '../../../interfaces/book/IBookActions';

type BookRowProps = {
    bookActions: IBookActions,
    menuItemClick: (action: ((id: string) => void) | undefined) => void;
}

const BookRow = (props: BookRowProps) => <div className="d-flex">
	<IconButton className={props.bookActions.onBookOpen ? '' : 'd-none'} onClick={() => props.menuItemClick(props.bookActions.onBookOpen)}>
		<OpenInNewIcon />
	</IconButton>
	<IconButton className={props.bookActions.onBookEdit ? '' : 'd-none'} onClick={() => props.menuItemClick(props.bookActions.onBookEdit)}>
		<DriveFileRenameOutlineIcon />
	</IconButton>
	<IconButton className={props.bookActions.onBookDelete ? '' : 'd-none'} onClick={() => props.menuItemClick(props.bookActions.onBookDelete)}>
		<DeleteIcon />
	</IconButton>
</div>

export default BookRow;
