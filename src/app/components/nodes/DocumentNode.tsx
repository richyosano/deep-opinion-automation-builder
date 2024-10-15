import { useEditNodeContext } from '@/app/contexts/EditNodeContext';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { memo } from 'react';

type DocumentNode = Node<{ id: string; label: string }, 'string'>;

const DocumentNode = ({ id, data, selected }: NodeProps<DocumentNode>) => {
	const { setEditingNodeId } = useEditNodeContext();

	return (
		<div className={`custom-node document${selected ? ' selected' : ''}`}>
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

export default memo(DocumentNode);
