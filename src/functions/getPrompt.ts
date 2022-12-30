import * as vscode from 'vscode';
import { getComments } from './getComments';

export function getPrompts(document: vscode.TextDocument, type: 'line' | 'file') {
	const editor = vscode.window.activeTextEditor;

	if (type === 'line') {
		if (editor) {
			// Extract the comment from the current line
			const line = document.lineAt(editor.selection.start.line);
			const commentRange = document.getWordRangeAtPosition(
				new vscode.Position(editor.selection.start.line, line.text.indexOf('//')),
				/\/\/.*/
			);
			if (commentRange) {
				return [document.getText(commentRange)];
			}
		}
	} else {
		// Extract all the comments from the file
		return getComments(document);
	}
	return [];
}