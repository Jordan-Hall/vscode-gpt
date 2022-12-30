import * as vscode from 'vscode';
import { getApiKey } from '../functions/APIKey';
import { convertCode } from '../functions/convertCode';
import { getComments } from '../functions/getComments';
import { getGpt3Result } from '../functions/getGpt3Result';

export function convertSame() {
	return vscode.commands.registerCommand('gpt3.convertSame', async () => {
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

		const lastLine = editor.document.lineCount - 1;
		const start = new vscode.Position(lastLine, editor.document.lineAt(lastLine).text.length);
		const end = start;
		const range = new vscode.Range(start, end);
		editor.edit((editBuilder) => {
			editBuilder.insert(start, code);
		});

		vscode.window.showInformationMessage('Code generated in current file');
	});

}