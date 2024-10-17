import { useValidateAutomationData } from '@/app/hooks/useValidateAutomationData';
import { act, renderHook, waitFor } from '@testing-library/react';

describe('useValidateAutomationData', () => {
	it('should return true for valid automation data', async () => {
		const validAutomationData = {
			nodes: [
				{
					id: '1',
					position: { x: 0, y: 0 },
					data: { label: 'Node 1' },
					type: 'document',
				},
				{
					id: '2',
					position: { x: 100, y: 100 },
					data: { label: 'Node 2' },
					type: 'languageDetection',
				},
			],
			edges: [{ id: 'e1-2', source: '1', target: '2' }],
		};

		const { result } = renderHook(() =>
			useValidateAutomationData(validAutomationData)
		);
		let isValid: boolean | undefined;

		await act(async () => {
			isValid = await result.current.validate();
		});

		expect(isValid).toBe(true);
		expect(result.current.errorMessage).toBeNull();
	});

	it('should return false for duplicated node IDs', async () => {
		const invalidAutomationData = {
			nodes: [
				{
					id: '1',
					position: { x: 0, y: 0 },
					data: { label: 'Node 1' },
					type: 'document',
				},
				{
					id: '1',
					position: { x: 100, y: 100 },
					data: { label: 'Node 2' },
					type: 'languageDetection',
				},
			],
			edges: [{ id: 'e1-2', source: '1', target: '2' }],
		};

		const { result } = renderHook(() =>
			useValidateAutomationData(invalidAutomationData)
		);
		let isValid: boolean | undefined;

		await act(async () => {
			isValid = await result.current.validate();
		});

		await waitFor(() => {
			expect(isValid).toBe(false);
			expect(result.current.errorMessage).toBe(
				'Node ID "1" is missing or duplicated.'
			);
		});
	});

	it('should return false for edges with invalid sources or targets', async () => {
		const invalidAutomationData = {
			nodes: [
				{
					id: '1',
					position: { x: 0, y: 0 },
					data: { label: 'Node 1' },
					type: 'document',
				},
			],
			edges: [{ id: 'e1-2', source: '1', target: '2' }],
		};

		const { result } = renderHook(() =>
			useValidateAutomationData(invalidAutomationData)
		);
		let isValid: boolean | undefined;

		await act(async () => {
			isValid = await result.current.validate();
		});

		await waitFor(() => {
			expect(isValid).toBe(false);
			expect(result.current.errorMessage).toBe(
				'Edge "e1-2" has an invalid source or target node.'
			);
		});
	});
});
