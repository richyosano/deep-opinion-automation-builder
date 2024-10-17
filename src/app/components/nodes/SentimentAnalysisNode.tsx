import { memo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SentimentAnalysisIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import IconButton from '@mui/material/IconButton';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { useEditNodeContext } from '@/app/contexts/EditNodeContext';

type SentimentAnalysisNode = Node<{ id: string; label: string }, 'string'>;

const SentimentAnalysisNode = ({
	id,
	data,
	selected,
}: NodeProps<SentimentAnalysisNode>) => {
	const { setEditingNodeId } = useEditNodeContext();

	return (
		<div className={`custom-node sentiment-analysis${selected ? ' selected' : ''}`}>
			<Handle type='target' position={Position.Top} />
			<div className='custom-node-container'>
				<SentimentAnalysisIcon className='custom-node-icon' />
				{data.label}
				{selected && (
					<IconButton
						size='small'
						color='inherit'
						onClick={() => setEditingNodeId(id)}
						className='edit-node-btn sentiment-analysis'
					>
						<EditIcon className='edit-node-icon' />
					</IconButton>
				)}
			</div>
		</div>
	);
};

export default memo(SentimentAnalysisNode);
