interface IPagedResponse<T> {
    items: T[],
    total: number
}

export default IPagedResponse;
