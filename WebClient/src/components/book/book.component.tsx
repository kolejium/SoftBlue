import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';

import './book.component.scss';

function Book () {
	return <div className="book">
		<span className='author-title'>author</span>
		<div className='name-container'>
			<span>name</span>
		</div>

		<SettingsIcon className='settings'/>
	</div>;
}

export default Book;
