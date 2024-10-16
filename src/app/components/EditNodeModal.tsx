import { useState } from 'react';
import './styles.css';
import { useEditNodeContext } from '../contexts/EditNodeContext';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const EditNodeModal = () => {
	const { editingNode, setEditingNodeId, handleEditNode } = useEditNodeContext();
	const nodeName =
		typeof editingNode?.data.label === 'string' ? editingNode.data.label : '';
	const [name, setName] = useState<string>(nodeName);

	return (
		<Dialog
			open={true}
			onClose={() => setEditingNodeId(null)}
			aria-labelledby='form-dialog-title'
		>
			<DialogTitle sx={{ fontWeight: 600 }}>Edit Node</DialogTitle>
			<DialogContent sx={{ width: 400 }}>
				<TextField
					autoFocus
					required
					margin='normal'
					id='name'
					name='node-name'
					label='Name'
					type='text'
					fullWidth
					variant='filled'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</DialogContent>
			<DialogActions sx={{ padding: 2 }}>
				<Button
					onClick={() => setEditingNodeId(null)}
					size='small'
					color='inherit'
				>
					Cancel
				</Button>
				<Button
					variant='contained'
					disableElevation
					onClick={() => handleEditNode(name)}
					size='small'
				>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditNodeModal;
