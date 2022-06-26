import { PropsWithChildren, Touch, TouchEvent, useState } from 'react';

interface ICarouselViewWrapperProps {
    onTouchMove: (e: Touch) => void;
}

function CarouselViewWrapper (props: PropsWithChildren<ICarouselViewWrapperProps>) {
	const [touchPosition, setTouchPosition] = useState<Touch | undefined>(undefined);
	const handleTouchStart = (e: TouchEvent<HTMLDivElement> | undefined) => setTouchPosition(e?.touches[0]);

	const handleTouchMove = (e: TouchEvent<HTMLDivElement> | undefined) => {
		if (touchPosition !== undefined && e !== undefined) {
			props.onTouchMove({ clientX: touchPosition?.clientX - e.touches[0].clientX, clientY: touchPosition?.clientY - e.touches[0].clientY } as Touch);
			setTouchPosition(undefined);
		}
	};

	return <div className='carousel-view-wrapper'
		onTouchStart={handleTouchStart}
		onTouchMove={handleTouchMove}>
		{props.children}
	</div>
}

export default CarouselViewWrapper;
