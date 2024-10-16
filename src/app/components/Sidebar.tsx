import Grid from '@mui/material/Grid2';
import { useDnD } from '../contexts/DnDContext';
import './styles.css';

const Sidebar = () => {
	const { setType } = useDnD();

	const onDragStart = (event: React.DragEvent, nodeType: string) => {
		setType(nodeType);
		event.dataTransfer.effectAllowed = 'move';
	};

	return (
		<aside className='sidebar'>
			<div className='description'>
				<h3>Actions</h3>
			</div>
			<div className='nodes-container'>
				<Grid container spacing={2}>
					<Grid size={6}>
						<div
							className='dndnode document'
							onDragStart={(event) => onDragStart(event, 'document')}
							draggable
						>
							Document
						</div>
					</Grid>

					<Grid size={6}>
						<div
							className='dndnode text-translation'
							onDragStart={(event) => onDragStart(event, 'textTranslation')}
							draggable
						>
							Text Translation
						</div>
					</Grid>
					<Grid size={6}>
						<div
							className='dndnode text-classification'
							onDragStart={(event) =>
								onDragStart(event, 'textClassification')
							}
							draggable
						>
							Text Classification
						</div>
					</Grid>
					<Grid size={6}>
						<div
							className='dndnode email'
							onDragStart={(event) => onDragStart(event, 'email')}
							draggable
						>
							Email
						</div>
					</Grid>
					<Grid size={6}>
						<div
							className='dndnode language-detection'
							onDragStart={(event) =>
								onDragStart(event, 'languageDetection')
							}
							draggable
						>
							Language Detection
						</div>
					</Grid>
					<Grid size={6}>
						<div
							className='dndnode sentiment-analysis'
							onDragStart={(event) =>
								onDragStart(event, 'sentimentAnalysis')
							}
							draggable
						>
							Sentiment Analysis
						</div>
					</Grid>
				</Grid>
			</div>
		</aside>
	);
};
export default Sidebar;
