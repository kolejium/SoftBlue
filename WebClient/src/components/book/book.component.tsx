import { ClickAwayListener, IconButton, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';

import './book.component.scss';

import book from '../../assets/img/book.png';
import ISize from '../../interfaces/ui/ISize';
import { useState } from 'react';
import BookControls from './book-controls/book-controls.component';
import BookType from '../../types/book';
import IBookActions from '../../interfaces/book/IBookActions';
import { useAppDispatch } from '../../hooks/use-app-dispatch.hook';
import { prepareForRemoveBook, prepareForEditBook, pdfBook } from '../../redux/thunks/modal.thunk';

type BookProps = BookType & {
	maxSize?: ISize;
}

function Book (props: BookProps) {
	const dispatch = useAppDispatch();
	const [stateSettingMenu, setStateSettingMenu] = useState(false);
	const settingIcon : HTMLElement | null = null;
	const showSettingMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setStateSettingMenu(true);
	const handleClose = (e: MouseEvent | TouchEvent) => setStateSettingMenu(false);
	const handleListKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Tab') {
			event.preventDefault();
			setStateSettingMenu(false);
		} else if (event.key === 'Escape') {
			setStateSettingMenu(false);
		}
	}

	const bookActions : IBookActions = {
		onBookDelete: id => dispatch(prepareForRemoveBook(id)),
		onBookEdit: id => dispatch(prepareForEditBook(id)),
		onBookOpen: id => dispatch(pdfBook(id))
	}


	return <div className="book-container" style={{
		maxHeight: props.maxSize?.height ? props.maxSize?.height : '100%',
		maxWidth: props.maxSize?.width ? props.maxSize?.width : '100%'
	}}>
		<img src={book}/>
		<div className='book' onClick={() => dispatch(pdfBook(props.id))}>
			<div className='author-container'>
				<span className='author-title'>{props.author}</span>
			</div>
			<div className='name-container'>
				<div className='name-title'>{props.name}</div>
			</div>
			<div className='settings'>
				<IconButton onClick={showSettingMenu} ref={settingIcon}>
					<SettingsIcon />
				</IconButton>

				<Popper open={stateSettingMenu}
					placement="bottom"
					anchorEl={settingIcon}
					disablePortal={true}
					modifiers={[{
						name: 'flip',
						enabled: true,
						options: {
							altBoundary: true,
							rootBoundary: 'viewport',
							padding: 8
						}
					},
					{
						name: 'arrow',
						enabled: true,
						options: {
							element: settingIcon
						}
					}]}>
					<Paper>
						<ClickAwayListener onClickAway={handleClose}>
							<BookControls bookActions={bookActions} id={props.id} type={{ type: 'Menu', onKeyDown: handleListKeyDown, autoFocusItem: stateSettingMenu }}/>
						</ClickAwayListener>
					</Paper>
				</Popper>
			</div>
		</div>
	</div>;
}

export default Book;
