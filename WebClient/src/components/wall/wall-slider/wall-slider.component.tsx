import { useEffect, useState, TransitionEvent } from 'react';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import useWallSliderSelector from '../../../hooks/use-selector/use-wall-slide-selector.hook';
import { getNextWall, getPrevWall, nextWall, wallAction, prevWall } from '../../../redux/thunks/walls.thunk';
import EnumerableState from '../../../types/enumerable-state';
import WallType from '../../../types/wall';
import { ICarouselViewProps } from '../../carousel/carousel-view/carousel-view.component';
import Carousel from '../../carousel/carousel.component';
import Wall from '../wall.component';

import './wall-slider.component.scss';
import ERowDirection from '../../../enums/erowDirection';
import { Subscription } from 'rxjs';


function convertWallToJsx (state: EnumerableState<WallType>) : EnumerableState<JSX.Element> {
	return {
		prev: state?.prev ? Wall(state.prev) : null,
		current: state?.current ? Wall(state.current) : null,
		next: state?.next ? Wall(state.next) : null
	};
}

const options : ICarouselViewProps = {
	currentIndex: 0,
	displayCount: 1,
	state: { } as EnumerableState<JSX.Element>,
	orientation: 'horizontal',
	transitionEnabled: true
}

function WallSlider () {
	const dispatch = useAppDispatch();
	const wall = useWallSliderSelector();
	const [state, setState] = useState<ICarouselViewProps>(options);

	useEffect(() => {
		const subscription = wallAction.subscribe(value => setState(prevState => ({ ...prevState, currentIndex: value === ERowDirection.Next ? 2 : (value === ERowDirection.Prev ? 0 : 1), transitionEnabled: true })));

		return () => subscription.unsubscribe();
	}, []);

	useEffect(() => {
		setState({ ...state, state: wall.state === undefined ? undefined : convertWallToJsx(wall.state as EnumerableState<WallType>), currentIndex: 1, transitionEnabled: false });
	}, [wall.state]);

	const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement> | undefined) => {
		if (wallAction.value === ERowDirection.Next) {
			dispatch(getNextWall());
		}

		if (wallAction.value === ERowDirection.Prev) {
			dispatch(getPrevWall())
		}
	}

	return <Carousel className='wall-slider' touchEnable={true} touchSensitivity={5} viewOptions={{ ...state, handleTransitionEnd }} isRepeating={false} next={() => dispatch(nextWall())} prev={() => dispatch(prevWall())}/>
}

export default WallSlider;
