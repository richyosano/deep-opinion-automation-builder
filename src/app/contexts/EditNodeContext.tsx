'use client';

import { Node } from '@xyflow/react';
import { createContext, PropsWithChildren, useContext } from 'react';

type EditNodeContextType = {
	editingNodeId: string | null;
	editingNode: Node | undefined;
	setEditingNodeId: (type: string | null) => void;
	handleEditNode: (nodeName: string) => void;
};

const EditNodeContext = createContext<EditNodeContextType>({} as EditNodeContextType);

interface EditNodeProviderProps extends PropsWithChildren {
	value: EditNodeContextType;
}

export const EditNodeProvider = ({ value, children }: EditNodeProviderProps) => {
	return <EditNodeContext.Provider value={value}>{children}</EditNodeContext.Provider>;
};

export default EditNodeContext;

export const useEditNodeContext = () => {
	const context = useContext(EditNodeContext);
	if (!context) {
		throw new Error('useEditNodeContext must be used within a EditNodeProvider');
	}
	return context;
};
