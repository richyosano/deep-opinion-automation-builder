import { Edge, Node } from '@xyflow/react';
import { useCallback, useState } from 'react';

type AutomationData = {
	nodes: Node[];
	edges: Edge[];
};

export const useValidateAutomationData = (automationData: AutomationData) => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const validate = useCallback((): Promise<boolean> => {
		return new Promise((resolve) => {
			const { nodes, edges } = automationData;

			// Validate nodes
			const nodeIds = new Set<string>();
			for (const node of nodes) {
				if (!node.id || nodeIds.has(node.id)) {
					setErrorMessage(`Node ID "${node.id}" is missing or duplicated.`);
					resolve(false);
					return;
				}
				nodeIds.add(node.id);

				if (
					typeof node.position?.x !== 'number' ||
					typeof node.position?.y !== 'number'
				) {
					setErrorMessage(`Node "${node.id}" has an invalid position.`);
					resolve(false);
					return;
				}

				if (!node.data?.label || typeof node.data.label !== 'string') {
					setErrorMessage(`Node "${node.id}" has an invalid label.`);
					resolve(false);
					return;
				}

				if (!node.type || typeof node.type !== 'string') {
					setErrorMessage(`Node "${node.id}" has an invalid type.`);
					resolve(false);
					return;
				}
			}

			// Validate edges
			const edgeIds = new Set<string>();
			for (const edge of edges) {
				if (!edge.id || edgeIds.has(edge.id)) {
					setErrorMessage(`Edge ID "${edge.id}" is missing or duplicated.`);
					resolve(false);
					return;
				}
				edgeIds.add(edge.id);

				if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) {
					setErrorMessage(
						`Edge "${edge.id}" has an invalid source or target node.`
					);
					resolve(false);
					return;
				}
			}

			// Clear error message if everything is valid
			setErrorMessage(null);
			resolve(true);
		});
	}, [automationData]);

	return { validate, errorMessage };
};
