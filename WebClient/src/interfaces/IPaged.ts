import EDirection from '../enums/edirection';
interface IPaged {
    page: number;
    size: number;
    direction?: EDirection;
}

export default IPaged;
