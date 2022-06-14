import * as React from 'react';
// import useWallSliderSelector from '../../../hooks/use-wall-slide-selector.hook';
import Wall from '../wall.component';

function WallSlider () {
	const [state, setState] = React.useState(false);
	// const { prevWall, currentWall, nextWall } = useWallSliderSelector();
	const walls = [];

	const moveLeft = () => {

	};

	const moveRight = () => {

	};

	return <div>
		<Wall/>
		<Wall/>
		<Wall/>
	</div>;
}

export default WallSlider;
