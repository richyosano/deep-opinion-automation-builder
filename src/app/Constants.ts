import { Edge, Node } from '@xyflow/react';

export const initialNodes: Node[] = [
	{
		id: '1',
		position: { x: 0, y: 0 },
		data: { label: 'Document' },
		type: 'document',
	},
	{
		id: '2',
		position: { x: 0, y: 100 },
		data: { label: 'Language Detection' },
		type: 'languageDetection',
	},
	{
		id: '3',
		position: { x: 200, y: 100 },
		data: { label: 'Text Translation' },
		type: 'textTranslation',
	},
];

export const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];
