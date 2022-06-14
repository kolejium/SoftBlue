import * as React from 'react';
import * as reactPdf from 'react-pdf/dist/esm/entry.webpack5';
import PaginatedList from '../paginated-list/paginated-list.component';

const { Document, Page } = reactPdf;

function PdfViewer (props: { data: Uint8Array | string }) {
	const [numPages, setNumPages] = React.useState<number | undefined>(undefined);
	const [pageNumber, setPageNumber] = React.useState(1);

	function onDocumentLoadSuccess (numPages: number) {
		setNumPages(numPages);
	}

	return <Document file={props.data} onLoadSuccess={e => onDocumentLoadSuccess(e.numPages)}>
		<PaginatedList size={1} countPages={numPages as number} onPageChanged={page => setPageNumber(page)}>
			<Page pageNumber={pageNumber} />
		</PaginatedList>
	</Document>;
}

export default PdfViewer;
