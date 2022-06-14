import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/types/AppDispatch';

export const useAppDispatch = () => useDispatch<AppDispatch>();
