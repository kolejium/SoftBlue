import useTypedSelector from './use-typed-selector.hook';

const useModalSelector = () => useTypedSelector(state => state.modal);

export default useModalSelector;
