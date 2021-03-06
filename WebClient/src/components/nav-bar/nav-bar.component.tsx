import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import BookIcon from '@mui/icons-material/Book';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Switch, Tooltip } from '@mui/material';

// import useWallSliderSelector from '../../hooks/use-wall-slide-selector.hook';
// import { next, prev } from '../../redux/action-creators/wall-slider';
import { useAppDispatch } from '../../hooks/use-app-dispatch.hook';

import './nav-bar.component.scss';
import { show } from '../../redux/slicers/search-bar.slice';
import { createBook } from '../../redux/slicers/modal.slice';
import useViewSelector from '../../hooks/use-selector/use-view-selector.hook';
import { changeView, reversView } from '../../redux/slicers/view.slice';

function NavBar () {
	const dispatch = useAppDispatch();
	const viewMode = useViewSelector();
	// const { nextWall, prevWall } = useWallSliderSelector();

	const onCreateBookHandle = () => dispatch(createBook());

	return <div className="full-size nav-bar p-4 z-1000">
		<div className='d-flex flex-row justify-content-between'>
			<Tooltip className={viewMode === 'smart' ? '' : 'opacity-0'} title="Search" placement="bottom">
				<IconButton size="large" onClick={() => {
					dispatch(show());
					console.log('search-bar show');
				}}>
					<SearchIcon fontSize="large"/>
				</IconButton>
			</Tooltip>
			<Tooltip title='Swith mode' placement='bottom'>
				<div className='d-flex flex-row align-items-center'>
					<span className='mx-1'>{viewMode}</span>
					<Switch onChange={(e, c) => { dispatch(reversView()) }} />
				</div>
			</Tooltip>
		</div>
		<div className='d-flex flex-column'>
			<SpeedDial className='align-self-end' icon={<SpeedDialIcon />} ariaLabel='SpeedDial'>
				<SpeedDialAction icon={<BookIcon/>} tooltipTitle='Create book' onClick={onCreateBookHandle}/>
				<SpeedDialAction className={viewMode === 'smart' ? '' : 'd-none'} icon={<CorporateFareIcon/>} tooltipTitle='Create book binder'/>
			</SpeedDial>
			<div className={viewMode === 'smart' ? 'd-flex flex-row justify-content-between' : 'd-none'}>
				<Tooltip title="Left" placement="top" className={'d-none'}>
					<IconButton size="large">
						<ChevronLeftIcon fontSize="large"/>
					</IconButton>
				</Tooltip>
				<Tooltip title="Right" placement="top" className={'d-none'}>
					<IconButton size="large">
						<ChevronRightIcon fontSize="large" />
					</IconButton>
				</Tooltip>
			</div>
		</div>
	</div>;
}

export default NavBar;
