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

let id = 0;
const getId = () => `dndnode_${id++}`;

export const useSetupAutomationBuilder = () => {
	const { screenToFlowPosition } = useReactFlow();
	const { type } = useDnD();

	const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const { editingNodeId, editingNode, setEditingNodeId, handleEditNode } = useEditNode(
		nodes,
		setNodes
	);

	// we load the data from the server on mount
	useEffect(() => {
		const getData = async () => {
			const data = await fetch('/api/automation');
			const automation = await data.json();
			setNodes(automation.nodes);
			setEdges(automation.edges);
		};
		getData();
	}, [setNodes, setEdges]);

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

	return {
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
	};
};
