import * as React from 'react';

import { Button, IconButton, Stack, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useEffect } from 'react';

function Upload (props: { onLoad: (file: File) => void }) {
	const [state, setState] = React.useState<File | undefined>();
	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0 || e.target.files[0].size === 0) {
			return;
		}

		props.onLoad(e.target.files[0]);
		setState(e.target.files[0]);
	};

	return <Stack direction={'row'} justifyContent={'space-between'}>
		<Button component="label" startIcon={<UploadFileIcon/>}>
                Upload PDF
			<input onChange={handleFileUpload} type="file" accept=".pdf" hidden={true} />
		</Button>
		<IconButton onClick={() => setState(undefined)}>
			<CancelIcon />
		</IconButton>
		<TextField disabled={true} value={state !== undefined ? state.name : ''} size="small"/>
	</Stack>;
}

export default Upload;
