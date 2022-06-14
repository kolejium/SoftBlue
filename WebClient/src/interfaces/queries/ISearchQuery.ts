import IAbortQuery from './IAbortQuery';

interface ISearchQuery extends IAbortQuery {
    value: string
}

export default ISearchQuery;
