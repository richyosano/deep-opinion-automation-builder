import { memo } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DocumentIcon from '@mui/icons-material/Description';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { useEditNodeContext } from '@/app/contexts/EditNodeContext';

type DocumentNode = Node<{ id: string; label: string }, 'string'>;

const DocumentNode = ({ id, data, selected }: NodeProps<DocumentNode>) => {
	const { setEditingNodeId } = useEditNodeContext();

	return (
		<div className={`custom-node document${selected ? ' selected' : ''}`}>
			<div className='custom-node-container'>
				<DocumentIcon className='custom-node-icon' />
				{data.label}
				{selected && (
					<IconButton
						size='small'
						color='inherit'
						onClick={() => setEditingNodeId(id)}
						className='edit-node-btn document'
					>
						<EditIcon className='edit-node-icon' />
					</IconButton>
				)}
			</div>
			<Handle type='source' position={Position.Bottom} />
		</div>
	);
};

export default memo(DocumentNode);
