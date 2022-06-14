import { Data } from './data';

type Book = Data & {
    name: string,
    author: string,
    bookcaseId: string,
    shelfNumber: number
}

export default Book;
