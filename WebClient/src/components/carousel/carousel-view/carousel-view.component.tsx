import { TransitionEvent } from 'react';
import EnumerableState from '../../../types/enumerable-state';

import './carousel-view.component.scss';

export interface ICarouselViewProps {
    displayCount: number;
    currentIndex: number;
    handleTransitionEnd?: (event: TransitionEvent<HTMLDivElement> | undefined) => void;
	state: EnumerableState<JSX.Element | null> | undefined;
	transitionEnabled: boolean;
	orientation: 'horizontal' | 'vertical';
}

function CarouselView (props: ICarouselViewProps) {
	return <div className="carousel-view"
		style={{
			transform: `translateX(-${props.currentIndex * (100 / props.displayCount)}%)`,
			transition: !props.transitionEnabled ? 'none' : undefined,
			flexDirection: props.orientation === 'horizontal' ? 'row' : 'column'
		}}
		onTransitionEnd={props.handleTransitionEnd}>
		{props.state?.prev}
		{props.state?.current}
		{props.state?.next}
	</div>
}

export default CarouselView;
