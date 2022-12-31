import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { activate } from '../../extension';
import { getApiKey } from '../../functions/APIKey';
import { getGpt3Result } from '../../functions/getGpt3Result';

suite('Extension Test Suite', () => {
	test('Activate test', () => {
		// Create a mock ExtensionContext object
		const mockContext: any = {
			subscriptions: [],
		};

		// Call the activate function
		activate(mockContext);

		// Make assertions about the behavior of the activate function
		assert.ok(mockContext.subscriptions.length > 0, 'Subscriptions should be added to the context');
	});

	test('getGpt3Result', async () => {
		// Set the API key as a workspace configuration value
		await vscode.workspace.getConfiguration().update('gpt3.apiKey', 'my-api-key', vscode.ConfigurationTarget.Global);

		const apiKey = getApiKey();

		// Invoke the getGpt3Result function with a prompt
		const result = await getGpt3Result('What is the meaning of life?', apiKey);

		// Verify that the returned result is as expected
		assert.strictEqual(result.length > 5, true);
	});
});