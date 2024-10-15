import { Node } from '@xyflow/react';
import { useCallback, useMemo, useState } from 'react';

export const useEditNode = (
	nodes: Node[],
	setNodes: React.Dispatch<React.SetStateAction<Node[]>>
) => {
	const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
	const editingNode = useMemo(() => {
		return nodes.find((node) => node.id === editingNodeId);
	}, [editingNodeId, nodes]);

	const handleEditNode = useCallback(
		(nodeName: string) => {
			if (editingNode) {
				const newNode = { ...editingNode };
				newNode.data.label = nodeName;

				setNodes((prevNodes) => {
					const nodesArr = prevNodes.filter(
						(node) => node.id !== editingNodeId
					);
					return [...nodesArr, newNode];
				});
			}

			setEditingNodeId(null);
		},
		[editingNodeId]
	);

	return {
		editingNodeId,
		editingNode,
		setEditingNodeId,
		handleEditNode,
	};
};
