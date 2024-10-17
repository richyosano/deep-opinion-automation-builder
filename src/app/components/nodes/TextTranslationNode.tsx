import { memo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import TranslateIcon from '@mui/icons-material/Translate';
import IconButton from '@mui/material/IconButton';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { useEditNodeContext } from '@/app/contexts/EditNodeContext';

type TextTranslationNode = Node<{ id: string; label: string }, 'string'>;

const TextTranslationNode = ({ id, data, selected }: NodeProps<TextTranslationNode>) => {
	const { setEditingNodeId } = useEditNodeContext();

	return (
		<div className={`custom-node text-translation${selected ? ' selected' : ''}`}>
			<Handle type='target' position={Position.Left} />
			<div className='custom-node-container'>
				<TranslateIcon className='custom-node-icon' />
				{data.label}
				{selected && (
					<IconButton
						size='small'
						color='inherit'
						onClick={() => setEditingNodeId(id)}
						className='edit-node-btn text-translation'
					>
						<EditIcon className='edit-node-icon' />
					</IconButton>
				)}
			</div>
			<Handle type='source' position={Position.Bottom} />
		</div>
	);
};

export default memo(TextTranslationNode);
