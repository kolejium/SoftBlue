import IPaged from '../../IPaged';
import IGetBooksQuery from './IGetBooksQuery';

interface IGetPagedBookQuery extends IPaged, IGetBooksQuery { }

export default IGetPagedBookQuery;
