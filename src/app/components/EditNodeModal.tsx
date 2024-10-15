import { useState } from 'react';
import './styles.css';
import { useEditNodeContext } from '../contexts/EditNodeContext';

const EditNodeModal = () => {
	const [nodeName, setNodeName] = useState<string>('');
	const { setEditingNodeId, handleEditNode } = useEditNodeContext();

	return (
		<>
			<h3 style={{ color: '#000' }} onClick={() => setEditingNodeId(null)}>
				Edit Node
			</h3>
			<div className='edit-node-name'>
				<label htmlFor='node-name'>Name:</label>
				<input
					type='text'
					id='node-name'
					value={nodeName}
					onChange={(e) => setNodeName(e.target.value)}
				/>
			</div>
			<button
				className='edit-node-save-btn'
				onClick={() => handleEditNode(nodeName)}
			>
				Save
			</button>
		</>
	);
};

export default EditNodeModal;
