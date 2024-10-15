'use client';

import { Node } from '@xyflow/react';
import { createContext, useContext } from 'react';

type EditNodeContextType = {
	editingNodeId: string | null;
	editingNode: Node | undefined;
	setEditingNodeId: React.Dispatch<React.SetStateAction<string | null>>;
	handleEditNode: (nodeName: string) => void;
};

const EditNodeContext = createContext<EditNodeContextType>({} as EditNodeContextType);

type EditNodeProviderProps = {
	value: EditNodeContextType;
	children: React.ReactNode;
};

export const EditNodeProvider = ({ value, children }: EditNodeProviderProps) => {
	return <EditNodeContext.Provider value={value}>{children}</EditNodeContext.Provider>;
};

export default EditNodeContext;

export const useEditNodeContext = () => {
	return useContext(EditNodeContext);
};
