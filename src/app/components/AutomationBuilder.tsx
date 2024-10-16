'use client';

import { useMemo, useRef } from 'react';
import { Background, Controls, MiniMap, NodeTypes, ReactFlow } from '@xyflow/react';
import Sidebar from './Sidebar';
import '@xyflow/react/dist/style.css';
import './styles.css';
import Button from '@mui/material/Button';
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
		setEditingNodeId,
		handleEditNode,
		onNodesChange,
		onEdgesChange,
		onConnect,
		onDragOver,
		onDrop,
		handleSaveProgress,
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
					>
						Save Progress
					</Button>
				</div>
				<Sidebar />
				{editingNode && <EditNodeModal />}
			</div>
		</EditNodeProvider>
	);
};

export default AutomationBuilder;
