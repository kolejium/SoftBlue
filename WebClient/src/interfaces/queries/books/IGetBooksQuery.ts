import EOrder from '../../../enums/eorder';

interface IGetBookQuery {
    order?: EOrder,
    q?: string,
    orderField?: string,
    author?: string,
    name?: string,
    createdAt?: Date
}

export default IGetBookQuery;
