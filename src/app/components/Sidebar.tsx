import Grid from '@mui/material/Grid2';
import DocumentIcon from '@mui/icons-material/Description';
import TranslateIcon from '@mui/icons-material/Translate';
import TextClassificationIcon from '@mui/icons-material/DocumentScannerOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import SentimentAnalysisIcon from '@mui/icons-material/SentimentSatisfiedAlt';
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
				<h4>Sources</h4>
			</div>
			<Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 6 }}>
				<Grid size={6}>
					<div
						className='dndnode document'
						onDragStart={(event) => onDragStart(event, 'document')}
						draggable
					>
						<DocumentIcon className='dndnode-icon' fontSize='small' />
						Document
					</div>
				</Grid>
				<Grid size={6}>
					<div
						className='dndnode email'
						onDragStart={(event) => onDragStart(event, 'email')}
						draggable
					>
						<EmailIcon className='dndnode-icon' fontSize='small' />
						Email
					</div>
				</Grid>
			</Grid>
			<div className='description'>
				<h4>Actions</h4>
			</div>
			<Grid container spacing={2} sx={{ marginTop: 3 }}>
				<Grid size={6}>
					<div
						className='dndnode text-classification'
						onDragStart={(event) => onDragStart(event, 'textClassification')}
						draggable
					>
						<TextClassificationIcon
							className='dndnode-icon'
							fontSize='small'
						/>
						Text Classification
					</div>
				</Grid>
				<Grid size={6}>
					<div
						className='dndnode text-translation'
						onDragStart={(event) => onDragStart(event, 'textTranslation')}
						draggable
					>
						<TranslateIcon className='dndnode-icon' fontSize='small' />
						Text Translation
					</div>
				</Grid>
				<Grid size={6}>
					<div
						className='dndnode language-detection'
						onDragStart={(event) => onDragStart(event, 'languageDetection')}
						draggable
					>
						<LanguageIcon className='dndnode-icon' fontSize='small' />
						Language Detection
					</div>
				</Grid>
				<Grid size={6}>
					<div
						className='dndnode sentiment-analysis'
						onDragStart={(event) => onDragStart(event, 'sentimentAnalysis')}
						draggable
					>
						<SentimentAnalysisIcon
							className='dndnode-icon'
							fontSize='small'
						/>
						Sentiment Analysis
					</div>
				</Grid>
			</Grid>
		</aside>
	);
};
export default Sidebar;
