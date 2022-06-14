import { Drawer } from '@mui/material';
import * as React from 'react';
import useSearchBarSelector from '../../hooks/use-selector/use-search-bar-selector.hook';
import NavBar from '../nav-bar/nav-bar.component';
import SearchBar from '../search-bar/search-bar.component';
import PdfViewer from '../shared/pdf-viewer/pdf-viewer.component';
import Wall from '../wall/wall.component';

import './view.component.scss';

function View () {
	const searchBarVisible = useSearchBarSelector();

	return <div className="full-size">
		<Drawer	anchor="left" open={searchBarVisible} variant="persistent">
			<SearchBar />
		</Drawer>
		<Wall/>
		<div className="view-wall"></div>
		<div className="view-floor"></div>
	</div>;
}

export default View;
