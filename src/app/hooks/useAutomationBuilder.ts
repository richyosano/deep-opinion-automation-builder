import { useCallback, useEffect } from 'react';
import {
	addEdge,
	Node,
	OnConnect,
	useEdgesState,
	useNodesState,
	useReactFlow,
} from '@xyflow/react';
import { useDnD } from '../contexts/DnDContext';
import { useEditNode } from './useEditNode';
import { useValidateAutomationData } from './useValidateAutomationData';

let id = 0;
const getId = () => `dndnode_${id++}`;

export const useAutomationBuilder = () => {
	const { screenToFlowPosition } = useReactFlow();
	const { type } = useDnD();

	const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const { editingNodeId, editingNode, setEditingNodeId, handleEditNode } = useEditNode(
		nodes,
		setNodes
	);
	const { validate, errorMessage } = useValidateAutomationData({ nodes, edges });

	// we load the data from the server on mount
	useEffect(() => {
		const getData = async () => {
			const data = await fetch('/api/automation');
			const automation = await data.json();

			setNodes(automation.nodes);
			setEdges(automation.edges);
		};
		getData();
	}, []);

	// various callbacks
	const onConnect: OnConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[setEdges]
	);

	const onDragOver = useCallback((event: React.DragEvent) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);

	const onDrop = useCallback(
		(event: React.DragEvent) => {
			event.preventDefault();

			// check if the dropped element is valid
			if (!type) {
				return;
			}

			const position = screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});
			const newNode = {
				id: getId(),
				type,
				position,
				data: { label: `${type} node` },
			};

			setNodes((prevNodes) => [...prevNodes, newNode]);
			setEditingNodeId(newNode.id);
		},
		[screenToFlowPosition, type, setNodes]
	);

	const handleSaveProgress = useCallback(async () => {
		if (validate()) {
			console.log('Data is valid. Proceeding with submission...');
			try {
				const response = await fetch('/api/automation', {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ nodes, edges }),
				});

				if (!response.ok) {
					console.error(`Error: ${response.statusText}`);
				}

				const responseData = await response.json();
				console.log('Data successfully saved:', responseData);
			} catch (error) {
				console.error('Failed to save data:', error);
			}
		} else {
			console.log('Data validation failed.');
		}
	}, [validate]);

	return {
		nodes,
		edges,
		editingNodeId,
		editingNode,
		errorMessage,
		setEditingNodeId,
		handleEditNode,
		onNodesChange,
		onEdgesChange,
		onConnect,
		onDragOver,
		onDrop,
		handleSaveProgress,
	};
};
