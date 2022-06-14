import * as React from 'react';

import Book from '../book/book.component';

import './bookcase.component.scss';

function Bookcase () {
	return <div className='bookcase'>
		<div className='shelf'>
			<Book/>
			<Book/>
			<Book/>
		</div>
		<div className='shelf'>
			<Book/>
			<Book/>
			<Book/>
		</div>
		<div className='shelf'>
			<Book/>
			<Book/>
			<Book/>
		</div>
	</div>;
}

export default Bookcase;
