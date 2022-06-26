import { useEffect } from 'react';
import { Drawer } from '@mui/material';
import { useElementSize } from 'usehooks-ts';

import SearchBar from '../search-bar/search-bar.component';
import WallSlider from '../wall/wall-slider/wall-slider.component';
import ISize from '../../interfaces/ui/ISize';

import { setSize } from '../../redux/thunks/view.thunk';

import useSearchBarSelector from '../../hooks/use-selector/use-search-bar-selector.hook';
import { useAppDispatch } from '../../hooks/use-app-dispatch.hook';

import './view.component.scss';

function View () {
	const dispatch = useAppDispatch();
	const searchBarVisible = useSearchBarSelector();
	const [viewRef, { width, height }] = useElementSize();
	useEffect(() => { dispatch(setSize({ width, height } as ISize)) }, [width, height]);

	return <div className="full-size" ref={viewRef}>
		<Drawer	anchor="left" className='left-menu' open={searchBarVisible} variant="persistent">
			<SearchBar />
		</Drawer>
		<WallSlider />

		<div className="view-wall"></div>
		<div className="view-floor"></div>
	</div>;
}

export default View;

//		<Wall/>
