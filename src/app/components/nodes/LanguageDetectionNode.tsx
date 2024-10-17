import { memo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { useEditNodeContext } from '@/app/contexts/EditNodeContext';

type LanguageDetectionNode = Node<{ id: string; label: string }, 'string'>;

const LanguageDetectionNode = ({
	id,
	data,
	selected,
}: NodeProps<LanguageDetectionNode>) => {
	const { setEditingNodeId } = useEditNodeContext();

	return (
		<div className={`custom-node language-detection${selected ? ' selected' : ''}`}>
			<Handle type='target' position={Position.Left} />
			<div className='custom-node-container'>
				<LanguageIcon className='custom-node-icon' />
				{data.label}
				{selected && (
					<IconButton
						size='small'
						color='inherit'
						onClick={() => setEditingNodeId(id)}
						className='edit-node-btn language-detection'
					>
						<EditIcon className='edit-node-icon' />
					</IconButton>
				)}
			</div>
			<Handle type='source' position={Position.Bottom} />
		</div>
	);
};

export default memo(LanguageDetectionNode);
