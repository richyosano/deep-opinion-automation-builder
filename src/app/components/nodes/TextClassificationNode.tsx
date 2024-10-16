import { memo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { useEditNodeContext } from '@/app/contexts/EditNodeContext';

type TextClassificationNode = Node<{ id: string; label: string }, 'string'>;

const TextClassificationNode = ({
	id,
	data,
	selected,
}: NodeProps<TextClassificationNode>) => {
	const { setEditingNodeId } = useEditNodeContext();

	return (
		<div className={`custom-node text-classification${selected ? ' selected' : ''}`}>
			<Handle type='target' position={Position.Left} />
			<Handle type='target' position={Position.Top} />
			<div>
				{data.label}
				{selected && (
					<IconButton
						size='small'
						color='inherit'
						onClick={() => setEditingNodeId(id)}
						className='edit-node-btn text-classification'
					>
						<EditIcon className='edit-node-icon' />
					</IconButton>
				)}
			</div>
			<Handle type='source' position={Position.Right} />
		</div>
	);
};

export default memo(TextClassificationNode);
