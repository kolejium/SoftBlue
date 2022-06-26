import { Data } from './data';

type BookType = Data & {
    name: string,
    author: string,
    bookcaseId: string,
    shelfNumber: number
}

export default BookType;
