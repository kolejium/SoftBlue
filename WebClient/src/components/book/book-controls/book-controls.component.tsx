import { MenuListProps } from '@mui/material/MenuList/MenuList';
import IBookActions from '../../../interfaces/book/IBookActions';
import BookMenu from './book-menu.component';
import BookRow from './book-row.component';

type BookControlsType = {
    type: string;
}

type MenuControlsType = MenuListProps & BookControlsType & {
    type: 'Menu'
}

type RowControlsType = BookControlsType & {
    type: 'Row'
}

type BookControlsProps = {
    id: string;
    bookActions: IBookActions;
    type: MenuControlsType | RowControlsType;
}

const BookControls = (props: BookControlsProps) => {
	const onClickHandle = (action: ((id: string) => void) | undefined) => {
		if (action) {
			action(props.id);
		}
	};

	switch (props.type.type) {
		case 'Menu':
			return <BookMenu bookActions={props.bookActions} menuItemClick={onClickHandle} {...props.type}/>;
		case 'Row':
			return <BookRow bookActions={props.bookActions} menuItemClick={onClickHandle}/>
	}
};

export default BookControls;
