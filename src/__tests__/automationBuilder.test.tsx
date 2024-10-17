import React, { act } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AutomationBuilder from '@/app/components/AutomationBuilder';
import { useAutomationBuilder } from '@/app/hooks/useAutomationBuilder';
import userEvent from '@testing-library/user-event';
import { Edge, Node, ReactFlowProvider } from '@xyflow/react';
import { DnDProvider } from '@/app/contexts/DnDContext';

jest.mock('../app/hooks/useAutomationBuilder');

const mockUseAutomationBuilder = useAutomationBuilder as jest.MockedFunction<
	typeof useAutomationBuilder
>;

const renderWithProviders = (ui: React.ReactElement) => {
	return render(
		<ReactFlowProvider>
			<DnDProvider>{ui}</DnDProvider>
		</ReactFlowProvider>
	);
};

// Mock data
const mockNodes: Node[] = [
	{ id: '1', position: { x: 0, y: 0 }, data: { label: 'Document' }, type: 'document' },
	{
		id: '2',
		position: { x: 0, y: 100 },
		data: { label: 'Language Detection' },
		type: 'languageDetection',
	},
];
const mockEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

global.ResizeObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}));

describe('Automation Builder', () => {
	beforeEach(() => {
		// Mock the useAutomationBuilder hook.
		mockUseAutomationBuilder.mockReturnValue({
			nodes: mockNodes,
			edges: mockEdges,
			editingNodeId: null,
			editingNode: undefined,
			errorMessage: null,
			errorAlertOpen: false,
			successAlertOpen: false,
			setEditingNodeId: jest.fn(),
			handleEditNode: jest.fn(),
			onNodesChange: jest.fn(),
			onEdgesChange: jest.fn(),
			onConnect: jest.fn(),
			onDragOver: jest.fn(),
			onDrop: jest.fn(),
			handleSaveProgress: jest.fn(),
			setSuccessAlertOpen: jest.fn(),
			setErrorAlertOpen: jest.fn(),
		});
	});

	it('should call handleSaveProgress when Save Progress button is clicked', async () => {
		const handleSaveProgressMock = mockUseAutomationBuilder().handleSaveProgress;

		renderWithProviders(<AutomationBuilder />);

		const saveButton = screen.getByRole('button', { name: /save progress/i });

		// Click the Save Progress button.
		userEvent.click(saveButton);

		// Validate that the handleSaveProgress function was called.
		await waitFor(() => {
			expect(handleSaveProgressMock).toHaveBeenCalledTimes(1);
		});
	});

	it('should display a success message when data is valid', async () => {
		mockUseAutomationBuilder.mockReturnValue({
			...mockUseAutomationBuilder(),
			successAlertOpen: true,
		});

		renderWithProviders(<AutomationBuilder />);
		const successAlert = await screen.findByText(
			'Data is valid. Proceeding with submission...'
		);

		expect(successAlert).toBeInTheDocument();
	});

	it('should display an error message when validation fails', async () => {
		mockUseAutomationBuilder.mockReturnValue({
			...mockUseAutomationBuilder(),
			errorAlertOpen: true,
			errorMessage: 'Node ID "1" is missing or duplicated.',
		});

		renderWithProviders(<AutomationBuilder />);
		const errorAlert = await screen.findByText(
			'Node ID "1" is missing or duplicated.'
		);

		expect(errorAlert).toBeInTheDocument();
	});

	it('should open the edit node modal when an editing node is present', async () => {
		mockUseAutomationBuilder.mockReturnValue({
			...mockUseAutomationBuilder(),
			editingNodeId: '1',
			editingNode: {
				id: '1',
				position: { x: 0, y: 0 },
				data: { label: 'Document' },
				type: 'document',
			},
		});

		renderWithProviders(<AutomationBuilder />);
		const editNodeModal = await screen.findByRole('dialog');

		expect(editNodeModal).toBeInTheDocument();
	});
});
