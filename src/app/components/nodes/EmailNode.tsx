import { useEditNodeContext } from '@/app/contexts/EditNodeContext';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { memo } from 'react';

type EmailNode = Node<{ id: string; label: string }, 'string'>;

const EmailNode = ({ id, data, selected }: NodeProps<EmailNode>) => {
	const { setEditingNodeId } = useEditNodeContext();

	return (
		<div className={`custom-node email${selected ? ' selected' : ''}`}>
			<Handle type='target' position={Position.Left} />
			<div>
				{data.label}
				{selected && (
					<button
						className='edit-node-btn'
						onClick={() => setEditingNodeId(id)}
					>
						Edit
					</button>
				)}
			</div>
			<Handle type='source' position={Position.Right} />
		</div>
	);
};

export default memo(EmailNode);
