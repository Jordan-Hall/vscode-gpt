import * as vscode from 'vscode';

import { getApiKey } from "../functions/APIKey";
import { getSignature } from "../functions/getSignature";
import { getTest } from "../functions/getTests";
import { convertCode } from '../functions/convertCode';
import { existsSync } from 'fs';
import { getGpt3Result } from '../functions/getGpt3Result';

export const convertTests = () => {
	return vscode.commands.registerCommand('gpt3.convertTests', async () => {
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

		// Extract the unit tests and their signatures from the code
		const tests = getTest(document.getText(), language);
		if (!tests) {
			vscode.window.showErrorMessage('No unit tests found');
			return;
		}

		const testPrompts = tests.map((test) => {
			const signature = getSignature(test, language);
			return `${signature}\n${test}`;
		});

		// Fetch the result from the GPT-3 model
		const result = await getGpt3Result(testPrompts.join('\n'), apiKey);
		const code = convertCode(result, language);

		// Create or write to a new file with the generated code
		const fileName = `${document.fileName}.gpt3.code`;
		const fileUri = vscode.Uri.file(fileName);
		const fileExists = existsSync(fileUri.fsPath);
		if (fileExists) {
			await vscode.window.showInformationMessage(
				'The generated code will be appended to the existing file.'
			);
			await vscode.workspace.fs.readFile(fileUri).then((buffer) => {
				const existingCode = buffer.toString();
				const newCode = existingCode + '\n' + code;
				vscode.workspace.fs.writeFile(fileUri, Buffer.from(newCode, 'utf8'));
			});
		} else {
			await vscode.workspace.fs.writeFile(fileUri, Buffer.from(code, 'utf8'));
		}

		// Open the generated code in a new editor
		vscode.window.showTextDocument(await vscode.workspace.openTextDocument(fileUri));
	});

};
