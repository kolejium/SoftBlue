import { Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import Upload from '../upload/upload.component';
import ICreateBookQuery from '../../../interfaces/queries/books/ICreateBookQuery';
import IWithFileQuery from '../../../interfaces/queries/books/IWithFileQuery';
import { nameof } from 'ts-simple-nameof';

export type CreateBookState = {
    data: IWithFileQuery<ICreateBookQuery>,
    valid: boolean
};

export type CreateBookProps = {
	state: CreateBookState,
	setState: React.Dispatch<React.SetStateAction<CreateBookState>>
}

function CreateBook (props: CreateBookProps) {
	const onLoadHandle = (file: File) => {
		if (props.state.data.value.name.trim() === '') {
			props.setState({ ...props.state, data: { ...props.state.data, value: { ...props.state.data.value, name: file.name } } });
		}

		props.setState({ ...props.state, data: { ...props.state.data, source: file } });
	}
	const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
		props.setState({ ...props.state, data: { ...props.state.data, value: { ...props.state.data.value, [e.target.name]: e.target.value } } });


	useEffect(() => {
		props.setState({ ...props.state, valid: props.state.data.value.name.trim() !== '' });
	}, [props.state]);

	return <Stack>
		<TextField name={nameof<CreateBookState>(s => s.data.value.name)} label="Name" helperText="Please enter name for book" value={props.state.data?.value.name} onChange={onChangeHandle} error={props.state.valid === false}/>
		<TextField name={nameof<CreateBookState>(s => s.data.value.author)} label="Author" helperText="Please enter author for book" value={props.state.data?.value.author} onChange={onChangeHandle}/>
		<Upload onLoad={onLoadHandle}/>
	</Stack>
}

export default CreateBook;

