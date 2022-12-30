// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Gpt3TreeDataProvider } from './classes/Gpt3TreeDataProvider';
import { convertComments } from './commands/convertComments';
import { convertNew } from './commands/convertNew';
import { convertSame } from './commands/convertSame';
import { convertTests } from './commands/convertTests';
import { executeFile } from './commands/executeFile';
import { executeLine } from './commands/executeLine';
import { removeApiKey, setApiKey } from './functions/APIKey';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	vscode.window.showInformationMessage('Thank you for using the GPT-3 plugin!');
	const treeDataProvider = new Gpt3TreeDataProvider();
	vscode.window.registerTreeDataProvider('gpt3', treeDataProvider);

	// Request the user to input their GPT-3 API key
	vscode.commands.registerCommand('gpt3.activate', async () => {
		const apiKey = await vscode.window.showInputBox({
			prompt: 'Enter your GPT-3 API key',
			password: true,
		});
		if (apiKey) {
			setApiKey(apiKey);
			vscode.window.showInformationMessage('GPT-3 API key set successfully');
		}
	});

	context.subscriptions.push(convertTests());
	context.subscriptions.push(convertComments());
	context.subscriptions.push(convertNew());
	context.subscriptions.push(convertSame());
	context.subscriptions.push(executeFile());
	context.subscriptions.push(executeLine());
}

// This method is called when your extension is deactivated
export function deactivate() {
	// Remove the GPT-3 API key from the extension's configuration
	removeApiKey();

	// Show a message thanking the user for using the plugin
	vscode.window.showInformationMessage('Thank you for using the GPT-3 plugin!');
}