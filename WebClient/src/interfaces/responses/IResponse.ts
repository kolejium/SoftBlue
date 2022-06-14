import IError from './IError';

interface IResponse<T> {
    result: T | null,
    error: IError | null
}

export default IResponse;
