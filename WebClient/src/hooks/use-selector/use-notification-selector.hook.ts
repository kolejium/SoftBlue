import useTypedSelector from './use-typed-selector.hook';

const useNotificationSelector = () => useTypedSelector(state => state.notification);

export default useNotificationSelector;
