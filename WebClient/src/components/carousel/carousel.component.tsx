import { Touch, TransitionEvent } from 'react';
import CarouselViewWrapper from './carousel-view-wrapper/carousel-view-wrapper.component';
import CarouselView, { ICarouselViewProps } from './carousel-view/carousel-view.component';

import './carousel.component.scss';

interface ICarouselProps {
	isRepeating: boolean;
	touchEnable: boolean;
	touchSensitivity: number;
	viewOptions: ICarouselViewProps;
	next: () => void;
	prev: () => void;
}

function Carousel (props: ICarouselProps & React.HTMLAttributes<HTMLDivElement>) {
	const handleTouchMove = (e: Touch) => {
		if (props.viewOptions.orientation === 'horizontal' && Math.abs(e.clientX) > props.touchSensitivity) {
			e.clientX > 0 ? props.next() : props.prev();
		}

		if (props.viewOptions.orientation === 'vertical' && Math.abs(e.clientY) > props.touchSensitivity) {
			e.clientY > 0 ? props.next() : props.prev();
		}
	};

	return <div className={'carousel-container ' + props.className}>
		<div className='carousel'>
			<CarouselViewWrapper onTouchMove={handleTouchMove}>
				<CarouselView {...props.viewOptions}/>
			</CarouselViewWrapper>
		</div>
	</div>;
}

export default Carousel;
