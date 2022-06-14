interface IBookActions {
    onBookOpen: ((id: string) => void) | undefined;
    onBookEdit: ((id: string) => void) | undefined;
    onBookDelete: ((id: string) => void) | undefined;
}

export default IBookActions;
