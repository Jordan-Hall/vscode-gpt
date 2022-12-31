import * as vscode from 'vscode';

export function getApiKey(): string | undefined {
	// Retrieve the GPT-3 API key from the extension's configuration
	const config = vscode.workspace.getConfiguration('gpt3');
	return config.get<string>('apiKey');
}

export function setApiKey(apiKey: string): void {
	// Store the GPT-3 API key in the extension's configuration
	const config = vscode.workspace.getConfiguration('gpt3');
	config.update('apiKey', apiKey, vscode.ConfigurationTarget.Global);
}

export function removeApiKey(): void {
	// Remove the GPT-3 API key from the extension's configuration
	const config = vscode.workspace.getConfiguration('gpt3');
	config.update('apiKey', undefined, vscode.ConfigurationTarget.Global);
}