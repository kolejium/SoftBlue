import BookType from '../../../types/book';

interface ICreateBookcaseQuery {
    shelfCount: number;
    books: BookType[];
    order: number;
}

export default ICreateBookcaseQuery;
