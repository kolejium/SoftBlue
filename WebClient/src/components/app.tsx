import View from './view/view.component';
import Notification from './notifications/notification.component';
import Modal from './shared/modals/modal.component';
import SimpleView from './simple-view/simple-view.component';
import useViewSelector from '../hooks/use-selector/use-view-selector.hook';
import NavBar from './nav-bar/nav-bar.component';

import './app.scss';

function App () {
	const view = useViewSelector();

	return <div className='w-100 h-100'>
		<NavBar />
		<Modal />
		<Notification />
		{view === 'smart' ? <View /> : <SimpleView/>}
	</div>;
}

export default App;
