import { MenuItem, MenuList, MenuListProps } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import IBookActions from '../../../interfaces/book/IBookActions';

export type BookMenuProps = MenuListProps & {
    bookActions: IBookActions,
    menuItemClick: (action: ((id: string) => void) | undefined) => void;
}

const BookMenu = (props: BookMenuProps) =>
	<MenuList aria-labelledby="composition-button" {...props}>
		<MenuItem onClick={() => props.menuItemClick(props.bookActions.onBookOpen)}>
			<OpenInNewIcon />
            Open
		</MenuItem>
		<MenuItem onClick={() => props.menuItemClick(props.bookActions.onBookEdit)}>
			<DriveFileRenameOutlineIcon />
            Edit
		</MenuItem>
		<MenuItem onClick={() => props.menuItemClick(props.bookActions.onBookDelete)}>
			<DeleteIcon />
            Delete
		</MenuItem>
	</MenuList>;

export default BookMenu;
