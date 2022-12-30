import * as vscode from 'vscode';
import { getApiKey } from '../functions/APIKey';
import { convertCode } from '../functions/convertCode';
import { getGpt3Result } from '../functions/getGpt3Result';
import { getComments } from '../functions/getComments';

export function executeLine() {
	return vscode.commands.registerCommand('gpt3.executeLine', async () => {
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

		// Extract the comment on the current line
		const selection = editor.selection;
		const line = document.lineAt(selection.start.line);
		const comment = line.text;
		if (!comment) {
			vscode.window.showErrorMessage('No comment found on current line');
			return;
		}

		// Fetch the result from the GPT-3 model
		const result = await getGpt3Result(comment, apiKey);
		const code = convertCode(result, language);

		// Insert the generated code on the current line
		const start = new vscode.Position(selection.start.line, 0);
		const end = new vscode.Position(selection.start.line, line.text.length);
		const range = new vscode.Range(start, end);
		editor.edit((builder) => {
			builder.replace(range, code);
		});

		vscode.window.showInformationMessage('Code generated on current line');
	});

}