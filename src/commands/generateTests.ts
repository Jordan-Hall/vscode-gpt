import * as vscode from 'vscode';
import { getApiKey } from '../functions/APIKey';
import { getGpt3Result } from '../functions/getGpt3Result';
import { existsSync } from 'fs';
import { extname } from 'path';


export function generateTests() {
	return vscode.commands.registerCommand('gpt3.generateTests', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const document = editor.document;
		const language = document.languageId;
		const apiKey = getApiKey();
		if (!apiKey) {
			vscode.window.showErrorMessage('GPT-3 API key is not set');
			return;
		}
		const codeFileText = vscode.window.activeTextEditor.document.getText();
		if (codeFileText.length < 50) {
			vscode.window.showErrorMessage('Code file is too short');
			return;
		}

		const ext = extname(document.uri.fsPath);

		// Fetch the result from the GPT-3 model
		const result = await getGpt3Result(`Generate unit tests for the following code:\n ${codeFileText} `, apiKey);

		// Create or write to a new file with the generated code
		const fileName = `${document.fileName.replace(ext, '')}.test${extname(document.uri.fsPath)}`;
		const fileUri = vscode.Uri.file(fileName);
		const fileExists = existsSync(fileUri.fsPath);
		if (fileExists) {
			await vscode.workspace.fs.writeFile(fileUri, Buffer.from(result));
		} else {
			await vscode.workspace.fs.writeFile(fileUri, Buffer.from(result));
		}

		vscode.window.showInformationMessage('Tests generated in new file');
	});
}