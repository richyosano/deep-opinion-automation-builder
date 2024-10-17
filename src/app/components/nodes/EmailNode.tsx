import { memo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { useEditNodeContext } from '@/app/contexts/EditNodeContext';

type EmailNode = Node<{ id: string; label: string }, 'string'>;

const EmailNode = ({ id, data, selected }: NodeProps<EmailNode>) => {
	const { setEditingNodeId } = useEditNodeContext();

	return (
		<div className={`custom-node email${selected ? ' selected' : ''}`}>
			<div className='custom-node-container'>
				<EmailIcon className='custom-node-icon' />
				{data.label}
				{selected && (
					<IconButton
						size='small'
						color='inherit'
						onClick={() => setEditingNodeId(id)}
						className='edit-node-btn email'
					>
						<EditIcon className='edit-node-icon' />
					</IconButton>
				)}
			</div>
			<Handle type='source' position={Position.Right} />
		</div>
	);
};

export default memo(EmailNode);
