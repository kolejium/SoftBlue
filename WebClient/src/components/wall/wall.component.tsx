import * as React from 'react';

import Bookcase from '../bookcase/bookcase.component';

import './wall.component.scss';

function Wall () {
	const [data, setData] = React.useState(null);
	const wall = React.createRef<HTMLDivElement>();

	React.useEffect(() => {
		console.log(wall.current?.clientWidth);
	}, [wall.current, wall.current?.clientWidth])

	return <div className="wall" ref={wall}>
		<Bookcase />
		<Bookcase />
		<Bookcase />
		<Bookcase />
	</div>;
}

export default Wall;
