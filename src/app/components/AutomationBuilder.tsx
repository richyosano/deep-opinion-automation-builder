'use client';

import { useMemo, useRef } from 'react';
import { Background, Controls, MiniMap, NodeTypes, ReactFlow } from '@xyflow/react';
import Sidebar from './Sidebar';
import '@xyflow/react/dist/style.css';
import './styles.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';
import EmailNode from './nodes/EmailNode';
import { EditNodeProvider } from '../contexts/EditNodeContext';
import { useAutomationBuilder } from '../hooks/useAutomationBuilder';
import DocumentNode from './nodes/DocumentNode';
import TextTranslationNode from './nodes/TextTranslationNode';
import TextClassificationNode from './nodes/TextClassificationNode';
import EditNodeModal from './EditNodeModal';
import LanguageDetectionNode from './nodes/LanguageDetectionNode';
import SentimentAnalysisNode from './nodes/SentimentAnalysisNode';

// list of possible node types
const nodeTypes: NodeTypes = {
	email: EmailNode,
	document: DocumentNode,
	textTranslation: TextTranslationNode,
	textClassification: TextClassificationNode,
	languageDetection: LanguageDetectionNode,
	sentimentAnalysis: SentimentAnalysisNode,
};

const AutomationBuilder = () => {
	const reactFlowWrapper = useRef(null);
	const {
		nodes,
		edges,
		editingNodeId,
		editingNode,
		errorMessage,
		errorAlertOpen,
		successAlertOpen,
		setEditingNodeId,
		handleEditNode,
		onNodesChange,
		onEdgesChange,
		onConnect,
		onDragOver,
		onDrop,
		handleSaveProgress,
		setSuccessAlertOpen,
		setErrorAlertOpen,
	} = useAutomationBuilder();

	const editNodeValue = useMemo(() => {
		return {
			editingNodeId,
			editingNode,
			setEditingNodeId,
			handleEditNode,
		};
	}, [editingNodeId]);

	return (
		<EditNodeProvider value={editNodeValue}>
			<div className='automation-builder'>
				<div className='reactflow-wrapper' ref={reactFlowWrapper}>
					<ReactFlow
						colorMode='dark'
						nodes={nodes}
						edges={edges}
						onNodesChange={onNodesChange}
						onEdgesChange={onEdgesChange}
						onConnect={onConnect}
						fitView
						className='overview'
						onDrop={onDrop}
						onDragOver={onDragOver}
						nodeTypes={nodeTypes}
						connectionLineStyle={{ stroke: '#ddd', strokeWidth: 2 }}
					>
						<MiniMap zoomable pannable />
						<Controls />
						<Background />
					</ReactFlow>
					<Button
						disableElevation
						variant='outlined'
						color='inherit'
						className='save-progress-btn'
						size='small'
						onClick={handleSaveProgress}
						startIcon={<SaveIcon />}
					>
						Save Progress
					</Button>
				</div>
				<Sidebar />
				{editingNodeId && <EditNodeModal />}
				{successAlertOpen && (
					<Snackbar
						open={true}
						autoHideDuration={6000}
						onClose={() => setSuccessAlertOpen(false)}
					>
						<Alert
							onClose={() => setSuccessAlertOpen(false)}
							severity='success'
							variant='filled'
							sx={{ width: '100%' }}
						>
							Data is valid. Proceeding with submission...
						</Alert>
					</Snackbar>
				)}
				{errorAlertOpen && (
					<Snackbar
						open={true}
						autoHideDuration={6000}
						onClose={() => setErrorAlertOpen(false)}
					>
						<Alert
							onClose={() => setErrorAlertOpen(false)}
							severity='error'
							variant='filled'
							sx={{ width: '100%' }}
						>
							{errorMessage}
						</Alert>
					</Snackbar>
				)}
			</div>
		</EditNodeProvider>
	);
};

export default AutomationBuilder;
