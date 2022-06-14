interface IHandleQuery<T, U> {
    onSuccess : ((value : T) => void);
    onError : ((value : U) => void)
}

export default IHandleQuery;
