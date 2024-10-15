'use client';

import { useMemo, useRef } from 'react';
import { Background, Controls, MiniMap, NodeTypes, ReactFlow } from '@xyflow/react';
import Sidebar from './Sidebar';
import '@xyflow/react/dist/style.css';
import './styles.css';
import EmailNode from './nodes/EmailNode';
import { EditNodeProvider } from '../contexts/EditNodeContext';
import { useSetupAutomationBuilder } from '../hooks/useSetupAutomationBuilder';
import DocumentNode from './nodes/DocumentNode';

// list of possible node types
const nodeTypes: NodeTypes = {
	email: EmailNode,
	document: DocumentNode,
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
	} = useSetupAutomationBuilder();

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
					<button className='save-nodes-btn'>Save nodes</button>
				</div>
				<Sidebar />
			</div>
		</EditNodeProvider>
	);
};

export default AutomationBuilder;
