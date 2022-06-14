import { IconButton, TextField } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import IBookActions from '../../../interfaces/book/IBookActions';

interface IBookItemProps extends IBookActions {
    id: string,
    name: string,
    author: string,
    createdAt: Date
}

const BookItem = (props: IBookItemProps) => {
	const onClickHandle = (action: ((id: string) => void) | undefined) => {
		if (action) {
			action(props.id);
		}
	}

	return <div className="d-flex justify-content-between align-items-center">
		<span>{props.name}</span>
		<span>{props.author}</span>
		<span>{new Date(props.createdAt).toLocaleDateString()}</span>
		<div className="d-flex">
			<IconButton className={props.onBookOpen ? '' : 'd-none'} onClick={() => onClickHandle(props.onBookOpen)}>
				<OpenInNewIcon />
			</IconButton>
			<IconButton className={props.onBookEdit ? '' : 'd-none'} onClick={() => onClickHandle(props.onBookEdit)}>
				<DriveFileRenameOutlineIcon />
			</IconButton>
			<IconButton className={props.onBookDelete ? '' : 'd-none'} onClick={() => onClickHandle(props.onBookDelete)}>
				<DeleteIcon />
			</IconButton>
		</div>
	</div>;
};

export default BookItem;
