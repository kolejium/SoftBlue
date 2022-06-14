import { ReactNode } from 'react';
import Pagination from '@mui/material/Pagination';


interface IPaginatedListProps {
    children?: ReactNode;
    size: number;
    countPages: number;
    onPageChanged: (page: number) => void;
}

const PaginatedList = (props : IPaginatedListProps) =>
	<div>
		{props.children}
		<Pagination count={props.countPages} shape="rounded" onChange={(e, p) => props.onPageChanged(p)} />
	</div>;

export default PaginatedList;
