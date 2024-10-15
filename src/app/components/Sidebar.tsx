import { useDnD } from '../contexts/DnDContext';
import './styles.css';
import EditNodeModal from './EditNodeModal';
import { useEditNodeContext } from '../contexts/EditNodeContext';

const Sidebar = () => {
	const { setType } = useDnD();
	const { editingNode } = useEditNodeContext();

	const onDragStart = (event: React.DragEvent, nodeType: string) => {
		setType(nodeType);
		event.dataTransfer.effectAllowed = 'move';
	};

	return (
		<aside className='sidebar'>
			<div className='description'>
				<h3>Nodes</h3>
			</div>
			<div className='nodes-container'>
				<div
					className='dndnode input'
					onDragStart={(event) => onDragStart(event, 'input')}
					draggable
				>
					Input
				</div>
				<div
					className='dndnode'
					onDragStart={(event) => onDragStart(event, 'default')}
					draggable
				>
					Default
				</div>
				<div
					className='dndnode output'
					onDragStart={(event) => onDragStart(event, 'output')}
					draggable
				>
					Output
				</div>
				<div
					className='dndnode email'
					onDragStart={(event) => onDragStart(event, 'email')}
					draggable
				>
					Email
				</div>
			</div>
			{editingNode && <EditNodeModal />}
		</aside>
	);
};
export default Sidebar;
