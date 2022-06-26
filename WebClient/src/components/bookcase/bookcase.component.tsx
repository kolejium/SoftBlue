import { useElementSize } from 'usehooks-ts';

import Book from '../book/book.component';
import BookcaseType from '../../types/bookcase';

import './bookcase.component.scss';
import bookcase from '../../assets/img/bookcase.png';
import { maxBooksOnShelf } from '../../consts/bookcase';


interface IBookcaseProps {
	maxHeight?: number;
	bookcase: BookcaseType;
}

function Bookcase (props: IBookcaseProps) {
	const [shelfContainerRef, { width, height }] = useElementSize();

	return <div className='bookcase-container' style={{ maxHeight: props.maxHeight ? props.maxHeight : '100%' }}>
		<img src={bookcase}/>
		<div className='bookcase'>
			<div className='shelf-wrapper' ref={shelfContainerRef}>
				{[...Array(props.bookcase.shelfCount)].map((_, i) =>
					<div key={i} className='shelf-container'>
						<div className='shelf'>
							{props.bookcase?.books.filter(x => x.shelfNumber === i).map(x => <Book key={x.id} maxSize={{ height: height / 3, width: width / maxBooksOnShelf }} {...x}/>)}
						</div>
					</div>
				)}
			</div>
		</div>
	</div>;
}

export default Bookcase;
