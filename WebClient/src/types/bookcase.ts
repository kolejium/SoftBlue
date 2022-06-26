import BookType from './book';
import { Data } from './data';

type BookcaseType = Data & {
    order: number,
    shelfCount: number,
    books: BookType[]
}

export default BookcaseType;
