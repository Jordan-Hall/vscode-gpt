import * as vscode from 'vscode';
import { getApiKey } from '../functions/APIKey';
import { getGpt3Result } from '../functions/getGpt3Result';
import { existsSync } from 'fs';
import { extname } from 'path';

export function generateDocumentation() {
	return vscode.commands.registerCommand('gpt3.generateDocumentation', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const document = editor.document;
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

		// Fetch the result from the GPT-3 model
		const result = await getGpt3Result(`Return the response in Markdown code, generate documentation for the following code:\n ${codeFileText} `, apiKey);

		const ext = extname(document.uri.fsPath);

		// Create or write to a new file with the generated code
		const fileName = `${document.fileName.replace(ext, '')}.md`;
		const fileUri = vscode.Uri.file(fileName);
		const fileExists = existsSync(fileUri.fsPath);
		if (fileExists) {
			await vscode.workspace.fs.writeFile(fileUri, Buffer.from(result));
		} else {
			await vscode.workspace.fs.writeFile(fileUri, Buffer.from(result));
		}

		vscode.window.showInformationMessage('Documentation generated in new file');
	});
}