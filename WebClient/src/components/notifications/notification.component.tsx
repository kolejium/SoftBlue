import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import useNotificationSelector from '../../hooks/use-selector/use-notification-selector.hook';
import { hide } from '../../redux/slicers/notification.slice';

function Notification () {
	const dispatch = useDispatch();
	const selector = useNotificationSelector();

	const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		dispatch(hide());
	};

	const action = <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
		<CloseIcon fontSize="small" />
	</IconButton>;

	return <Snackbar open={selector.visible} autoHideDuration={6000} onClose={handleClose} message={selector.text} action={action}/>
}

export default Notification;
