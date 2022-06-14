import Book from '../../../types/book';
import IBookActions from '../../../interfaces/book/IBookActions';
import BookItem from '../book-item/book-item.component';

interface IBookListProps extends IBookActions {
    books: Book[]
}

const BookList = (props: IBookListProps) =>
	<ul className='p-0'>
		{props.books.map((book) => <li key={book.id}>
			<BookItem {...book} id={book.id as string} createdAt={book.createdAt as Date} onBookOpen={props.onBookOpen} onBookEdit={props.onBookEdit} onBookDelete={props.onBookDelete} />
		</li>)}
	</ul>

export default BookList;
