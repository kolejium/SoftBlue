import * as React from 'react';
import { useElementSize } from 'usehooks-ts';
import WallType from '../../types/wall';

import Bookcase from '../bookcase/bookcase.component';

import './wall.component.scss';

// eslint-disable-next-line no-redeclare
function Wall (props: WallType) {
	return <div className='wall'>
		<div className='bookcase-wrapper'>
			{props.bookcases.map(x => <Bookcase key={x.id} bookcase={x}/>)}
		</div>
	</div>;
}

export default Wall;
