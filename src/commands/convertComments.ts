import * as vscode from 'vscode';
import { getApiKey } from '../functions/APIKey';
import { convertCode } from '../functions/convertCode';
import { getGpt3Result } from '../functions/getGpt3Result';
import { getPrompts } from '../functions/getPrompt';
import { existsSync } from 'fs';

export function convertComments() {
	return vscode.commands.registerCommand('gpt3.convertComments', async () => {
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

		const prompts = getPrompts(document, 'line');
		if (!prompts) {
			vscode.window.showErrorMessage('No comments found');
			return;
		}

		const result = await getGpt3Result(prompts.join('\n'), apiKey);
		const code = convertCode(result, language);

		// Create or write to a new file with the generated code
		const fileName = `${document.fileName}.gpt3.code`;
		const fileUri = vscode.Uri.file(fileName);
		const fileExists = existsSync(fileUri.fsPath);
		if (fileExists) {
			await vscode.workspace.fs.writeFile(fileUri, Buffer.from(code, 'utf8'));
		} else {
			await vscode.workspace.fs.writeFile(fileUri, Buffer.from(code, 'utf8'));
		}
	});
}