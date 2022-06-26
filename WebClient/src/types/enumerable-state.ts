type EnumerableState<T> = {
    prev: T | null,
    current: T | null,
    next: T | null
}

export default EnumerableState;
