import * as vscode from 'vscode';
import { getApiKey } from '../functions/APIKey';
import { convertCode } from '../functions/convertCode';
import { getComments } from '../functions/getComments';
import { getGpt3Result } from '../functions/getGpt3Result';
import { existsSync } from 'fs';


export function executeFile() {
	return vscode.commands.registerCommand('gpt3.executeFile', async () => {
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

		// Extract the comments from the code
		const comments = getComments(document);
		if (!comments) {
			vscode.window.showErrorMessage('No comments found');
			return;
		}

		// Fetch the result from the GPT-3 model
		const result = await getGpt3Result(comments.join('\n'), apiKey);
		const code = convertCode(result, language);

		// Create or write to a new file with the generated code
		const fileName = `${document.fileName}.gpt3.code`;
		const fileUri = vscode.Uri.file(fileName);
		const fileExists = existsSync(fileUri.fsPath);
		if (fileExists) {
			await vscode.workspace.fs.writeFile(fileUri, Buffer.from(code));
		} else {
			await vscode.workspace.fs.writeFile(fileUri, Buffer.from(code));
		}

		vscode.window.showInformationMessage('Code generated in new file');
	});
}